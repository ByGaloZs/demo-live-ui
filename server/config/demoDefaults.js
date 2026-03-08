/**
 * server/config/demoDefaults.js
 * Valores por defecto para variables dinámicas de demos específicas.
 * Estas variables se inyectan en los scripts de los agentes de IA para simular escenarios reales.
 * Cada demo puede tener sus propios valores por defecto.
 */

/**
 * Valores por defecto para cada tipo de demo.
 * Estos valores se utilizan para personalizar los scripts de los agentes
 * y hacer que los escenarios de demostración suenen más realistas.
 */
export const DEMO_DEFAULTS = {
  // Valores por defecto para el agente de Cobranza
  collections: {
    rl_amount: process.env.RETELL_COLLECTIONS_AMOUNT || "1500", // Monto fijo de deuda
    rl_dpd: process.env.RETELL_COLLECTIONS_DPD || "1", // Días de atraso fijos
    rl_today: process.env.RETELL_COLLECTIONS_TODAY || "2026-03-08", // Fecha fija (YYYY-MM-DD)
    rl_dueDate: process.env.RETELL_COLLECTIONS_DUE_DATE || "2026-03-11", // Vencimiento fijo (YYYY-MM-DD)
  },
};
