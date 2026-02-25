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
    rl_debtAmount: "1500", // Monto de deuda en pesos
    rl_dpd: "12", // Días de Atraso (Days Past Due)
    prolongation_amount: "300", // Monto de prórroga disponible
    prolongation_term: "7", // Plazo de prórroga en días
    paymentDateOffsetDays: 3, // Offset para calcular la fecha de pago
  },
};
