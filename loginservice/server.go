package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/ayushsherpa111/loginService/handler"
	"github.com/gorilla/mux"
)

var (
	logr = log.New(os.Stdout, "TEST: ", log.LUTC|log.Lshortfile)
)

type s struct {
	name string
}

func pong(wr http.ResponseWriter, r *http.Request) {
	logr.Println(r.Context().Value("Header"))
	if r.Method == "POST" {
		defer r.Body.Close()
		var n interface{}
		dcdr := json.NewDecoder(r.Body)
		err := dcdr.Decode(&n)
		if err != nil {
			log.Println(err.Error())
		}
		log.Println(n)
	}
	wr.Write([]byte("pong"))
}

func tstMid(hdr http.HandlerFunc) http.HandlerFunc {
	return func(writer http.ResponseWriter, req *http.Request) {
		var mp = map[string][]string{"hello": {"A"}}
		req = req.WithContext(context.WithValue(req.Context(), "Header", mp))
		hdr(writer, req)
	}
}

func handleRoute() {
	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = ":5000"
	}
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/signin", handler.LoginHandler).Methods("POST")
	router.HandleFunc("/secret", handler.AuthHandler(handler.SecretRoute)).Methods("GET")
	router.HandleFunc("/register", handler.RegisterHandler).Methods("POST")
	router.HandleFunc("/ping", tstMid(pong)).Methods("GET", "POST")
	if err := http.ListenAndServe(port, router); err != nil {
		log.Fatalln(err)
	} else {
		log.Printf("listening on 0.0.0.0:%s", port)
	}
}

func main() {
	handler.Connection()
	handleRoute()
}
