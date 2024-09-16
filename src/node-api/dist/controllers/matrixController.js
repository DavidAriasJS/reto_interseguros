"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processMatrix = void 0;
// Función para calcular el valor máximo en una matriz
const findMax = (matrix) => {
    return Math.max(...matrix.flat());
};
// Función para calcular el valor mínimo en una matriz
const findMin = (matrix) => {
    return Math.min(...matrix.flat());
};
// Función para calcular el promedio de todos los valores en una matriz
const findAverage = (matrix) => {
    const totalSum = findSum(matrix);
    const totalCount = matrix.flat().length;
    return totalSum / totalCount;
};
// Función para calcular la suma de todos los valores en una matriz
const findSum = (matrix) => {
    return matrix.flat().reduce((acc, val) => acc + val, 0);
};
// Función para verificar si una matriz es diagonal
const isDiagonal = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (i !== j && matrix[i][j] !== 0) {
                return false;
            }
        }
    }
    return true;
};
// Controlador para procesar las matrices y realizar las operaciones
const processMatrix = (req, res) => {
    const { Q, R } = req.body;
    if (!Q || !R) {
        res.status(400).json({ error: 'Se requieren las matrices Q y R en el cuerpo de la solicitud.' });
        return;
    }
    // Realizar las operaciones sobre las matrices Q y R
    const operations = {
        Q: {
            max: findMax(Q),
            min: findMin(Q),
            average: findAverage(Q),
            sum: findSum(Q),
            isDiagonal: isDiagonal(Q),
        },
        R: {
            max: findMax(R),
            min: findMin(R),
            average: findAverage(R),
            sum: findSum(R),
            isDiagonal: isDiagonal(R),
        }
    };
    // Devolver los resultados en JSON
    res.json(operations);
};
exports.processMatrix = processMatrix;
