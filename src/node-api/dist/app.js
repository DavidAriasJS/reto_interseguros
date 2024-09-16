"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const matrixRoutes_1 = __importDefault(require("./routes/matrixRoutes"));
// Inicializamos la aplicación Express
const app = (0, express_1.default)();
const port = 3000;
// Configuramos middleware para analizar JSON
app.use(body_parser_1.default.json());
// Definimos las rutas de la API
app.use('/matrix', matrixRoutes_1.default);
// Iniciamos el servidor
app.listen(port, () => {
    console.log(`API de matrices escuchando en http://localhost:${port}`);
});
