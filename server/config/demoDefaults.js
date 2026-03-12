/**
 * server/config/demoDefaults.js
 * Valores por defecto hardcodeados para demos específicas.
 * Se mantienen en backend para no depender de variables de entorno de plataforma.
 */

/**
 * Valores por defecto para cada tipo de demo.
 * Estos valores se utilizan para personalizar los scripts de los agentes
 * y hacer que los escenarios de demostración suenen más realistas.
 */
export const DEMO_DEFAULTS = {
  // Valores por defecto para el agente de Cobranza
  collections: {
    amount: "1750",
    dpd: "1",
    dueDate: "2026-03-20",
  },
};
