package handler

import (
	"context"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/ayushsherpa111/loginService/utils"
	"github.com/gorilla/securecookie"
	"github.com/gorilla/sessions"
	"golang.org/x/crypto/bcrypt"
	redistore "gopkg.in/boj/redistore.v1"
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
	MyCon      *gorm.DB
	dberr      error
	authKey, _ = hex.DecodeString(os.Getenv("AUTH_KEY"))
	redisPORT  = os.Getenv("REDIS_PORT")
	redisHOST  = os.Getenv("REDIS_HOST")
	// encKey, _  = hex.DecodeString(os.Getenv("ENC_KEY"))
	store, _ = redistore.NewRediStore(10, "tcp", fmt.Sprintf("%s:%s", redisHOST, redisPORT), "", authKey)
	sessName = os.Getenv("SESS_NAME")
	cookie   = securecookie.SecureCookie{}
)

func init() {
	store.SetSerializer(redistore.JSONSerializer{})
}

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

func CheckLogin(currUser *User) (bool, User) {
	var found User
	res := MyCon.Find(&found, "email = ?", currUser.Email)
	log.Printf("[/signup] - ROWS %d", res.RowsAffected)
	log.Printf("[/signup] - USER %v", found)

	if res.RowsAffected < 0 {
		return false, User{}
	}

	if bcrypt.CompareHashAndPassword([]byte(found.Password), []byte(currUser.Password)) != nil {
		return false, User{}
	}
	return true, found
}

func Connection() {
	MyCon, dberr = gorm.Open(postgres.Open(os.Getenv("DB_URI")), &gorm.Config{})
	if dberr != nil {
		log.Fatalf("Connection Error - %s", dberr.Error())
		return
	}
	log.Printf("Connection Created - %s", os.Getenv("DB_URI"))
	MyCon.AutoMigrate(&User{})
	log.Printf("[/AUTH] - Auth Key %v", authKey)
	// log.Printf("[/ENC] - ENC Key %v", encKey)
}

func AuthHandler(hndlr http.HandlerFunc) http.HandlerFunc {
	// assume that the user is already logged in
	return func(writer http.ResponseWriter, req *http.Request) {
		session, err := store.Get(req, sessName)
		log.Println("[/secret] - session", session.IsNew)
		log.Printf("[ID] - %s", session.ID)
		log.Printf("[ID] - %s", session.Values)
		if session.IsNew {
			http.Redirect(writer, req, "/", http.StatusUnauthorized)
			return
		}
		if err != nil {
			log.Println("bad session")
			session.Values["authenticated"] = false
			session.Options.MaxAge = -1
			session.Save(req, writer)
			// store.Save(req, writer, session)
			if err = session.Save(req, writer); err != nil {
				http.Error(writer, err.Error(), http.StatusInternalServerError)
			}
			http.Redirect(writer, req, "/", http.StatusUnauthorized)
			return
		}
		req = req.WithContext(context.WithValue(req.Context(), "session", session))
		req = req.WithContext(context.WithValue(req.Context(), "test", "bruh"))
		hndlr(writer, req)
	}
}

func SecretRoute(writer http.ResponseWriter, req *http.Request) {
	currSesson := req.Context().Value("session").(*sessions.Session)
	test := req.Context().Value("test").(string)
	writer.Header().Set("access-control-allow-origin", "*")
	log.Printf("[/secret] - SESSION : %v", currSesson.Values)
	writer.Write([]byte(fmt.Sprintf(`{"data":%s%s}`, currSesson.Values["userid"], test)))
}

func IsAllowed(user *User) (bool, error) {
	// check wheather the users email has already been registered
	var found User
	res := MyCon.Find(&found, "email = ? OR username = ?", user.Email, user.Username)
	log.Printf("[QUERY] - %s", res.Statement.SQL.String())
	if res.Error != nil {
		return false, res.Error
	}
	if res.RowsAffected > 0 {
		return false, errors.New("This User Already Exists in the System")
	}
	log.Println(res.RowsAffected)

	return true, nil
}

func SendError(writer http.ResponseWriter, r *http.Request) {
	err := r.Context().Value("error").(string)
	writer.WriteHeader(http.StatusBadRequest)
	writer.Header().Set("Content-Type", "application/json; charset=utf-8")
	writer.Write([]byte(fmt.Sprintf(`{"err":"%s"}`, err)))
}

func RegisterHandler(writer http.ResponseWriter, r *http.Request) {
	//  Let the reciever know the that the data being sent is a JSON
	session, err := store.Get(r, sessName)
	// user is already logged in and is trying to register again
	if err != nil {
		log.Printf("[/register] - POST %s", err.Error())
		// http.Error(writer, err.Error(), http.StatusBadRequest)
		r = r.WithContext(context.WithValue(r.Context(), "error", "Current Session Still Active Logout and Register Again"))
		SendError(writer, r)
		return
	}
	writer.Header().Set("Content-Type", "application/json; charset=utf-8")
	// Get the body length so we can read the number of "bytes" being sent
	length, _ := strconv.Atoi(r.Header.Get("Content-length"))
	content := utils.ParseBody(length, r.Body)
	// Store the parsed user in this variable
	var newUser User
	// Parse the JSON string sent from the front end and match the struct USER
	if err = json.Unmarshal(content, &newUser); err != nil {
		// Invalid JSON
		r = r.WithContext(context.WithValue(r.Context(), "error", err.Error()))
		SendError(writer, r)
		return
	}

	// Check if the username and email provided doesnt already exist
	if allowed, err := IsAllowed(&newUser); err != nil || !allowed {
		log.Printf("[/register] - POST :ERR %s", err.Error())
		r = r.WithContext(context.WithValue(r.Context(), "error", err.Error()))
		SendError(writer, r)
		return
	}

	(&newUser).Hash()
	log.Printf("[/register] - New User Ready %v", newUser)
	MyCon.Model(&newUser).Create(&newUser)
	session.Values["authenticated"] = true
	session.Values["userid"] = newUser.UID
	session.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   60 * 60 * 24 * 2,
		HttpOnly: true,
		Secure:   false,
	}
	session.Save(r, writer)
	// store.Save(r, writer, session)
	usrStr, _ := json.Marshal(newUser)
	fmt.Fprintf(writer, `{"msg": %s}`, string(usrStr))
}

func LoginHandler(writer http.ResponseWriter, r *http.Request) {
	log.Printf("[/login] - POST")
	session, err := store.Get(r, sessName)
	log.Printf("[SESSION] - %v", session.Values)
	writer.Header().Set("Content-Type", "application/json; charset=utf-8")
	if err != nil {
		log.Printf("ERROR: %s", err.Error())
		r = r.WithContext(context.WithValue(r.Context(), "error", err.Error()))
		SendError(writer, r)
		return
	}

	// Read the JSON body as an slice of bytes
	length, _ := strconv.Atoi(r.Header.Get("Content-length"))
	body := utils.ParseBody(length, r.Body)

	var loginUser User
	if err = json.Unmarshal(body, &loginUser); err != nil {
		log.Printf("ERROR: %s", err.Error())
		http.Error(writer, fmt.Sprintf(`{"msg": %s}`, err.Error()), http.StatusInternalServerError)
		return
	}
	if isAllowed, authUser := CheckLogin(&loginUser); isAllowed {
		log.Println("[/user] - ", authUser)

		session.Values = map[interface{}]interface{}{"authenticated": true, "userid": authUser.UID}
		session.Options = &sessions.Options{
			Path:     "/",
			MaxAge:   60 * 60 * 24 * 2,
			HttpOnly: true,
			Secure:   false,
		}
		if err = session.Save(r, writer); err != nil {
			r = r.WithContext(context.WithValue(r.Context(), "error", err.Error()))
			SendError(writer, r)
			return
		}
		log.Printf("[/signup] - USER FOUND %v", authUser)
		reply := fmt.Sprintf(`{"msg": "Login Successfull", "id":"%s"}`, authUser.UID)
		writer.Write([]byte(reply))
	} else {
		// wrong passwrod or somet hsit
		r = r.WithContext(context.WithValue(r.Context(), "error", "Invalid Password / Email"))
		SendError(writer, r)
	}
}
