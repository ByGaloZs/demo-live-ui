import process from "process";

/**
 * Demo agents configuration.
 * Maps demo IDs to their Retell agent IDs.
 * Extensible for future demos (sales, support, etc.)
 */

const demoAgents = {
  collections: {
    agentId: process.env.RETELL_AGENT_COLLECTIONS || "mock-agent-collections",
    name: "Collections Agent",
    description: "Cobranza / Collections",
  },
  // Future demos can be added here
  // sales: {
  //   agentId: process.env.RETELL_AGENT_SALES || "mock-agent-sales",
  //   name: "Sales Agent",
  //   description: "Sales Calls",
  // },
  // support: {
  //   agentId: process.env.RETELL_AGENT_SUPPORT || "mock-agent-support",
  //   name: "Support Agent",
  //   description: "Customer Support",
  // },
};

export function getAgentConfig(demoId) {
  return demoAgents[demoId] || null;
}

export function isValidDemoId(demoId) {
  return demoId in demoAgents;
}

export default demoAgents;
