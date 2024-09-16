import express from 'express';
import bodyParser from 'body-parser';
import matrixRoutes from './routes/matrixRoutes';

// Inicializamos la aplicación Express
const app = express();
const port = 3000;

// Configuramos middleware para analizar JSON
app.use(bodyParser.json());

// Definimos las rutas de la API
app.use('/matrix', matrixRoutes);

// Iniciamos el servidor
app.listen(port, () => {
  console.log(`API de matrices escuchando en http://localhost:${port}`);
});