import express from "express";
import { parseFullName } from "../utils/nameParser.js";
import { getAgentConfig, isValidDemoId } from "../config/demoAgents.js";
import { createRetellPhoneCall } from "../services/retellClient.js";

const router = express.Router();

function normalizePhoneToE164(phone) {
  if (!phone || typeof phone !== "string") return "";

  const digits = phone.replace(/\D/g, "");

  if (digits.length === 10) {
    return `+52${digits}`;
  }

  if (digits.length === 12 && digits.startsWith("52")) {
    return `+${digits}`;
  }

  if (phone.trim().startsWith("+")) {
    return `+${digits}`;
  }

  return `+${digits}`;
}

function isValidE164(phone) {
  return /^\+\d{10,15}$/.test(phone);
}

function formatDateToDDMMYYYY(dateValue) {
  if (!dateValue || typeof dateValue !== "string") return "";

  const match = dateValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return dateValue;

  const [, year, month, day] = match;
  return `${day}/${month}/${year}`;
}

function getTodayDateString() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  return `${day}/${month}/${year}`;
}

router.post("/call-demo", async (req, res) => {
  try {
    const { phone, fullName, paymentDate, amount, demoId = "collections" } = req.body;

    if (!phone || !fullName || !paymentDate || !amount || !demoId) {
      return res.status(400).json({
        ok: false,
        message: "Missing required fields: phone, fullName, paymentDate, amount, demoId",
      });
    }

    if (!isValidDemoId(demoId)) {
      return res.status(400).json({
        ok: false,
        message: `Invalid demoId: ${demoId}`,
      });
    }

    const normalizedPhone = normalizePhoneToE164(phone);

    if (!isValidE164(normalizedPhone)) {
      return res.status(400).json({
        ok: false,
        message: "Número inválido.",
      });
    }

    const { rl_clientName, rl_clientSurname } = parseFullName(fullName);
    const formattedDebtDate = formatDateToDDMMYYYY(paymentDate);
    const formattedAmount = String(amount).trim();

    const dynamicVariables = {
      rl_clientName,
      rl_clientSurname,
      rl_debtAmount: formattedAmount,
      rl_debtDate: formattedDebtDate,
      rl_today: getTodayDateString(),
    };

    const agentConfig = getAgentConfig(demoId);

    if (!agentConfig) {
      return res.status(500).json({
        ok: false,
        message: "No se pudo cargar la configuración del agente.",
      });
    }

    const fromNumber = process.env.RETELL_FROM_NUMBER;
    const hasRetellConfig =
      Boolean(process.env.RETELL_API_KEY) &&
      Boolean(fromNumber) &&
      Boolean(agentConfig.agentId) &&
      !String(agentConfig.agentId).startsWith("mock-");

    if (!hasRetellConfig) {
      return res.status(200).json({
        ok: true,
        mode: "mock",
        message: "Mock payload created",
        payload: {
          to_number: normalizedPhone,
          agent_id: agentConfig.agentId,
          retell_llm_dynamic_variables: dynamicVariables,
        },
      });
    }

    const retellResponse = await createRetellPhoneCall({
      fromNumber,
      toNumber: normalizedPhone,
      overrideAgentId: agentConfig.agentId,
      dynamicVariables,
    });

    return res.status(200).json({
      ok: true,
      mode: "retell",
      message: "Call created successfully",
      call_id: retellResponse?.call_id || null,
      payload: {
        to_number: normalizedPhone,
        from_number: fromNumber,
        agent_id: agentConfig.agentId,
        retell_llm_dynamic_variables: dynamicVariables,
      },
    });
  } catch (error) {
    console.error("Error in /api/call-demo:", error);

    return res.status(error?.status || 500).json({
      ok: false,
      message: error?.message || "Internal server error",
      details: error?.details || null,
    });
  }
});

export default router;
