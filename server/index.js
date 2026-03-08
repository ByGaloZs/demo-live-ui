/**
 * server/index.js
 * Archivo principal del servidor backend.
 * Configura Express, middlewares, rutas y maneja la comunicación con Retell AI.
 * Proporciona endpoints para iniciar llamadas de demostración.
 */

import process from "process";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Cargar variables de entorno primero, antes de otros imports
dotenv.config();

import express from "express";
import cors from "cors";
import callDemoRouter from "./routes/callDemo.js";

const app = express();
const PORT = process.env.PORT || 8787;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === "production";

// Middlewares
if (isProduction) {
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || false,
    }),
  );
} else {
  app.use(cors());
}
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

if (isProduction) {
  const distPath = path.resolve(__dirname, "../dist");

  app.use(express.static(distPath));

  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
