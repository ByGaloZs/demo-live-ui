/**
 * tailwind.config.js
 * Configuración de Tailwind CSS para estilos utilitarios.
 * Define el contenido a procesar y extensiones de tema.
 */

/** @type {import('tailwindcss').Config} */
export default {
  // Archivos donde Tailwind buscará clases a utilizar
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  // Extensión del tema de Tailwind (actualmente sin cambios personalizados)
  theme: {
    extend: {},
  },

  // Plugins adicionales de Tailwind (actualmente sin plugins)
  plugins: [],
};
