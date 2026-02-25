/**
 * server/index.js
 * Archivo principal del servidor backend.
 * Configura Express, middlewares, rutas y maneja la comunicación con Retell AI.
 * Proporciona endpoints para iniciar llamadas de demostración.
 */

import process from "process";
import dotenv from "dotenv";

// Cargar variables de entorno primero, antes de otros imports
dotenv.config();

import express from "express";
import cors from "cors";
import callDemoRouter from "./routes/callDemo.js";

const app = express();
const PORT = process.env.PORT || 8787;

// Middlewares
app.use(cors()); // Habilita CORS para comunicación con el frontend
app.use(express.json()); // Parsea cuerpos JSON en las solicitudes

/**
 * Endpoint de salud
 * Verifica que el servidor está funcionando correctamente
 */
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Server is running" });
});

// Rutas de API
app.use("/api", callDemoRouter);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
