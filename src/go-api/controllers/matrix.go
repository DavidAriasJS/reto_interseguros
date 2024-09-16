package controllers

import (
	"encoding/json"
	"log"
	"net/http"

	"gonum.org/v1/gonum/mat"
)

func FactorizeMatrix(w http.ResponseWriter, r *http.Request) {
	log.Println("Recibiendo datos...")

	matrixData := [][]float64{
		{1, 2},
		{3, 4},
	}

	rows := len(matrixData)
	cols := len(matrixData[0])

	log.Printf("Dimensiones de la matriz directa: %d filas, %d columnas\n", rows, cols)

	// Transformar la matriz 2D en un slice 1D para Gonum
	flatData := make([]float64, 0, rows*cols)
	for _, row := range matrixData {
		flatData = append(flatData, row...)
	}

	A := mat.NewDense(rows, cols, flatData)
	log.Println("Matriz Gonum creada con éxito")

	var qr mat.QR
	qr.Factorize(A)

	Q := mat.NewDense(0, 0, nil)
	R := mat.NewDense(0, 0, nil)
	qr.QTo(Q)
	qr.RTo(R)

	response := map[string]interface{}{
		"Q": Q.RawMatrix(),
		"R": R.RawMatrix(),
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		log.Println("Error enviando la respuesta:", err)
		http.Error(w, "Error enviando la respuesta", http.StatusInternalServerError)
	}
}
