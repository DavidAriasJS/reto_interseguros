"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const matrixController_1 = require("../controllers/matrixController");
const router = (0, express_1.Router)();
// Ruta para procesar matrices Q y R
router.post('/process', matrixController_1.processMatrix);
exports.default = router;
