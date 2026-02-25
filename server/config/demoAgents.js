/**
 * server/config/demoAgents.js
 * Configuración de los agentes de demostración disponibles.
 * Define cuatro tipos de agentes: Cobranza, Ventas, Soporte y Encuestas.
 * Los IDs de agentes se resuelven dinámicamente desde variables de entorno.
 */

/**
 * Configuración lazy de agentes.
 * NOTA: Los agentIds se resuelven dinámicamente en cada llamada a getAgentConfig()
 * para reflejar siempre los valores actuales de process.env.
 */
const demoAgents = {
  collections: {
    envKey: "RETELL_AGENT_COLLECTIONS",
    fallbackAgentId: "mock-agent-collections",
    name: "Collections Agent",
    description: "Cobranza / Collections",
  },
  sales: {
    envKey: "RETELL_AGENT_SALES",
    fallbackAgentId: "mock-agent-sales",
    name: "Sales Agent",
    description: "Sales Calls",
  },
  support: {
    envKey: "RETELL_AGENT_SUPPORT",
    fallbackAgentId: "mock-agent-support",
    name: "Support Agent",
    description: "Customer Support",
  },
  surveys: {
    envKey: "RETELL_AGENT_SURVEYS",
    fallbackAgentId: "mock-agent-surveys",
    name: "Surveys Agent",
    description: "Customer Surveys",
  },
};

/**
 * Obtiene la configuración de un agente específico.
 * Resuelve el agentId dinámicamente desde variables de entorno.
 *
 * @param {string} demoId - Identificador único del tipo de demo (support, collections, sales, surveys)
 * @returns {Object|null} Configuración del agente o null si no existe
 */
export function getAgentConfig(demoId) {
  const cfg = demoAgents[demoId];
  if (!cfg) return null;

  // Resuelve el agentId en tiempo de ejecución desde variables de entorno
  const agentId = process.env[cfg.envKey] || cfg.fallbackAgentId;

  return {
    ...cfg,
    agentId,
  };
}

/**
 * Valida si un demoId es válido.
 *
 * @param {string} demoId - Identificador del tipo de demo a validar
 * @returns {boolean} true si el demoId es válido, false en caso contrario
 */
export function isValidDemoId(demoId) {
  return demoId in demoAgents;
}

export default demoAgents;
