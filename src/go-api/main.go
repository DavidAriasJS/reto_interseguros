package main

import (
	"go-api/controllers"
	"go-api/middleware"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/auth/login", controllers.Login).Methods("POST")

	protected := router.PathPrefix("/matrix").Subrouter()
	protected.Use(middleware.JWTMiddleware)
	protected.HandleFunc("/factorize", controllers.FactorizeMatrix).Methods("POST")

	corsHandler := handlers.CORS(
		handlers.AllowedOrigins([]string{"http://localhost:4200"}),                   // Permitir localhost:4200
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}), // Métodos permitidos
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),           // Headers permitidos
	)

	log.Println("Servidor escuchando en el puerto 8080")
	err := http.ListenAndServe(":8080", corsHandler(router))
	if err != nil {
		log.Fatal("Error iniciando el servidor:", err)
	}
}
