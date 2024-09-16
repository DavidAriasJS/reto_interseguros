

import { Router } from 'express';
import { processMatrix } from '../controllers/matrixController';

const router = Router();

// Ruta para procesar matrices Q y R
router.post('/process', processMatrix);

export default router;