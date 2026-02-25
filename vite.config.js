/**
 * vite.config.js
 * Configuración de Vite para el proyecto React.
 * Define plugins, opciones de servidor de desarrollo y proxy de API.
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Plugin de React con Fast Refresh para recargas rápidas durante el desarrollo
  plugins: [react()],

  // Configuración del servidor de desarrollo
  server: {
    // Proxy para redirigir peticiones /api al servidor backend en localhost:8787
    proxy: {
      "/api": {
        target: "http://localhost:8787",
        changeOrigin: true,
      },
    },
  },
});
