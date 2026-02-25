/**
 * postcss.config.js
 * Configuración de PostCSS para procesamiento de CSS.
 * Incluye Tailwind CSS y Autoprefixer para compatibilidad entre navegadores.
 */

export default {
  plugins: {
    tailwindcss: {}, // Procesa las directivas de Tailwind CSS
    autoprefixer: {}, // Agrega prefijos de navegadores automáticamente
  },
};
