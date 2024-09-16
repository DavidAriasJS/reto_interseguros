package controllers

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"go-api/models"

	"github.com/golang-jwt/jwt/v4"
)

var jwtKey = []byte("supersecretkey")

type Claims struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}

func Login(w http.ResponseWriter, r *http.Request) {
	var credentials models.User
	err := json.NewDecoder(r.Body).Decode(&credentials)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Datos inválidos"})
		return
	}

	users, err := os.ReadFile("./data/users.json")
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Error leyendo datos de usuario"})
		return
	}

	var storedUsers []models.User
	json.Unmarshal(users, &storedUsers)

	var isValidUser bool
	for _, user := range storedUsers {
		if user.Username == credentials.Username && user.Password == credentials.Password {
			isValidUser = true
			break
		}
	}

	if !isValidUser {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "Credenciales inválidas"})
		return
	}

	expirationTime := time.Now().Add(15 * time.Minute)
	claims := &Claims{
		Username: credentials.Username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Error generando token"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"token": tokenString})
}
