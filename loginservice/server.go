package main

import (
	"log"
	"net/http"
	"os"

	"github.com/ayushsherpa111/loginService/handler"
	"github.com/gorilla/mux"
)

func handleRoute() {
	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = ":5000"
	}
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/register", handler.RegisterHandler).Methods("POST")
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
