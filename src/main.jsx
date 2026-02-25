/**
 * main.jsx
 * Punto de entrada principal de la aplicación React.
 * Renderiza el componente App en el elemento raíz del DOM.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Renderiza la aplicación con StrictMode para detectar problemas potenciales en desarrollo
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
