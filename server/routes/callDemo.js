import express from "express";
import { parseFullName } from "../utils/nameParser.js";
import { getAgentConfig, isValidDemoId } from "../config/demoAgents.js";

const router = express.Router();

/**
 * POST /api/call-demo
 *
 * Creates a mock call payload (simulating Retell API payload).
 *
 * Expected request body:
 * {
 *   "phone": "+525512345678",
 *   "fullName": "Mario Padilla Franco",
 *   "demoId": "collections"
 * }
 *
 * Returns mock Retell payload without actually calling Retell.
 */
router.post("/call-demo", (req, res) => {
  try {
    const { phone, fullName, demoId } = req.body;

    // Validation
    if (!phone || !fullName || !demoId) {
      return res.status(400).json({
        ok: false,
        message: "Missing required fields: phone, fullName, demoId",
      });
    }

    // Validate demoId
    if (!isValidDemoId(demoId)) {
      return res.status(400).json({
        ok: false,
        message: `Invalid demoId: ${demoId}. Valid options: collections`,
      });
    }

    // Get agent config
    const agentConfig = getAgentConfig(demoId);
    if (!agentConfig) {
      return res.status(500).json({
        ok: false,
        message: "Failed to load agent configuration",
      });
    }

    // Parse name
    const { rl_clientName, rl_clientSurname } = parseFullName(fullName);

    // Build mock Retell payload
    const mockPayload = {
      to_number: phone,
      agent_id: agentConfig.agentId,
      retell_llm_dynamic_variables: {
        rl_clientName,
        rl_clientSurname,
      },
    };

    // Return mock response (without calling real Retell)
    return res.status(200).json({
      ok: true,
      message: "Mock call payload created (form phone mapped to to_number)",
      payload: mockPayload,
    });
  } catch (error) {
    console.error("Error in /api/call-demo:", error);
    return res.status(500).json({
      ok: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default router;
