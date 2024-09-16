# Usar la imagen oficial de Go
FROM golang:1.20

WORKDIR /app

# Copiar el código fuente y descargar dependencias
COPY go.mod go.sum ./
RUN go mod download

# Copiar el código fuente
COPY . .

# Compilar la