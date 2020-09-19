package handler

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/ayushsherpa111/loginService/utils"
	"github.com/gorilla/sessions"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type UDB interface {
	insert(keyPairs []string, user User)
	Connection()
}

const (
	hshCost = 12
)

var (
	MyCon *gorm.DB
	dberr error
	store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))
)

type User struct {
	UID       string    `gorm:"primaryKey;default:uuid_generate_v4()"`
	Email     string    `json:"email"`
	Username  string    `json:"username"`
	Password  string    `json:"password"`
	CreatedAt time.Time `gorm:"default:now()"`
	UpdatedAt time.Time `gorm:"default:now()"`
	DeletedAt time.Time
}

type UserInteraction interface {
	hash()
}

func (u *User) Hash() {
	hash, _ := bcrypt.GenerateFromPassword([]byte(u.Password), hshCost)
	u.Password = string(hash)
}

func Connection() {
	MyCon, dberr = gorm.Open(postgres.Open(os.Getenv("DB_URI")), &gorm.Config{})
	if dberr != nil {
		log.Fatalf("Connection Error - %s", dberr.Error())
		return
	}
	log.Printf("Connection Created - %s", os.Getenv("DB_URI"))
	MyCon.AutoMigrate(&User{})
}

func AuthHandler(hndlr http.HandlerFunc) http.HandlerFunc {
	// assume that the user is already logged in
	return func(writer http.ResponseWriter, req *http.Request) {
		session, err := store.Get(req, "_sess_id")
		log.Println("[/secret] - session", session)
		if err != nil || session.IsNew {
			UnAuthHandler(writer, req)
		} else {
			hndlr(writer, req)
		}
	}
}

func UnAuthHandler(writer http.ResponseWriter, req *http.Request) {
	// an un authenticated user is tryign to access a route that requires a valid session
	writer.WriteHeader(http.StatusUnauthorized)
	writer.Write([]byte(fmt.Sprintf(`{"err":%s}`, req.Header.Get("error"))))
}

func RegisterHandler(writer http.ResponseWriter, r *http.Request) {
	//  Let the reciever know the that the data being sent is a JSON
	session, _ := store.Get(r, "_sess_id")
	writer.Header().Set("Content-Type", "application/json; charset=utf-8")
	// Get the body length so we can read the number of "bytes" being sent
	length, _ := strconv.ParseInt(r.Header.Get("Content-length"), 10, 32)
	content := utils.ParseBody(length, r.Body)

	// Store the parsed user in this variable
	var newUser User

	// Parse the JSON string sent from the front end and match the struct USER
	if err := json.Unmarshal(content, &newUser); err != nil {
		// Invalid JSON
		writer.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(writer, `{"err": %s}`, err.Error())
		return
	}
	(&newUser).Hash()
	log.Printf("[/register] - New User Ready %v", newUser)
	MyCon.Model(&newUser).Create(&newUser)
	session.Values["authenticated"] = true
	session.Values["userid"] = newUser.UID
	session.Options = &sessions.Options{
		Path:     "/",
		Domain:   "localhost",
		MaxAge:   60 * 60 * 24 * 2,
		HttpOnly: true,
		Secure:   false,
	}
	session.Save(r, writer)
	usrStr, _ := json.Marshal(newUser)
	fmt.Fprintf(writer, `{"msg": %s}`, string(usrStr))
}

func SecretRoute(writer http.ResponseWriter, req *http.Request) {
	currSesson, _ := store.Get(req, "_sess_id")
	log.Printf("[/secret] - SESSION : %v", currSesson.Values)
	strSess, _ := json.Marshal(currSesson.Values)
	writer.Write([]byte(fmt.Sprintf(`{"data":%s}`, strSess)))
}

func LoginHandler(writer http.ResponseWriter, r *http.Request) {
	log.Printf("[/user] - POST")
	fmt.Printf("Got header %v\n", r.Header)
	length, _ := strconv.ParseInt(r.Header.Get("Content-length"), 10, 32)
	body := utils.ParseBody(length, r.Body)
	fmt.Println("BODY", body)
	writer.Header().Set("Content-Type", "application/json; charset=utf-8")
	writer.Header().Set("Access-Control-Allow-Origin", "*")
	writer.Header().Set("Set-Cookie", "foo=bar; HttpOnly")
	writer.Write([]byte(fmt.Sprintf(`{"Data": %s}`, body)))
}
