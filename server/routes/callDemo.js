/**
 * server/routes/callDemo.js
 * Rutas para gestionar solicitudes de demostraciones en vivo.
 * Maneja la validación de datos del formulario, construcción de variables dinámicas
 * y creación de llamadas telefónicas con Retell AI.
 */

import express from "express";
import { parseFullName } from "../utils/nameParser.js";
import { getAgentConfig, isValidDemoId } from "../config/demoAgents.js";
import { createRetellPhoneCall } from "../services/retellClient.js";
import { DEMO_DEFAULTS } from "../config/demoDefaults.js";
import { isValidE164 } from "../utils/phoneValidator.js";

const router = express.Router();

/**
 * POST /api/call-demo
 *
 * Recibe datos del formulario y:
 * - Valida inputs (phone, fullName, demoId).
 * - Determina el agente según demoId.
 * - Construye dynamic variables para el agente.
 * - Decide si hace llamada REAL (Retell) o MOCK:
 *    - REAL si existe RETELL_API_KEY + RETELL_FROM_NUMBER + agentId real (no "mock-").
 *    - MOCK si falta algo (o el agentId sigue siendo "mock-...").
 *
 * Expected request body:
 * {
 *   "phone": "+525512345678",
 *   "fullName": "Mario Padilla Franco",
 *   "demoId": "collections"
 * }
 *
 * Response estándar:
 * - Siempre incluye "payload" (para que el frontend sea consistente)
 * - Si es retell, también incluye "call_id"
 */
router.post("/call-demo", async (req, res) => {
  try {
    const { phone, fullName, demoId } = req.body;

    // 1) Validación de campos requeridos
    if (!phone || !fullName || !demoId) {
      return res.status(400).json({
        ok: false,
        message: "Missing required fields: phone, fullName, demoId",
      });
    }

    // 2) Validación del teléfono (formato E.164)
    if (!isValidE164(phone)) {
      return res.status(400).json({
        ok: false,
        message: "Invalid phone format. Use E.164 like +525512345678",
      });
    }

    // 3) Validación del demoId
    if (!isValidDemoId(demoId)) {
      return res.status(400).json({
        ok: false,
        message: `Invalid demoId: ${demoId}.`,
      });
    }

    // 4) Obtener configuración del agente para ese demo
    const agentConfig = getAgentConfig(demoId);
    if (!agentConfig) {
      return res.status(500).json({
        ok: false,
        message: "Failed to load agent configuration",
      });
    }

    // 5) Parsear nombre completo -> (rl_clientName, rl_clientSurname)
    const { rl_clientName, rl_clientSurname } = parseFullName(fullName);

    // 6) Construir dynamic variables base (válidas para cualquier demo)
    let dynamicVars = {
      rl_clientName,
      rl_clientSurname,
    };

    // 7) Si es collections, agregamos variables extra para que el script suene "real"
    //    (Si luego quieres defaults para otros demos, se hace igual con su config)
    if (demoId === "collections") {
      const defaults = DEMO_DEFAULTS?.collections;

      // Si por alguna razón no hay defaults, igual seguimos (solo con nombre/apellido)
      if (defaults) {
        const today = new Date();
        const fmt = (d) => d.toISOString().slice(0, 10); // YYYY-MM-DD

        const offsetDays = Number(defaults.paymentDateOffsetDays || 0);
        const paymentDate = new Date(today.getTime() + offsetDays * 24 * 60 * 60 * 1000);

        dynamicVars = {
          ...dynamicVars,
          rl_today: fmt(today),
          rl_paymentDate: fmt(paymentDate),
          rl_debtAmount: defaults.rl_debtAmount,
          rl_dpd: defaults.rl_dpd,
          prolongation_amount: defaults.prolongation_amount,
          prolongation_term: defaults.prolongation_term,
        };
      }
    }

    // 8) Payload estándar que SIEMPRE regresamos al frontend (modo mock o retell)
    //    Esto evita "payload: undefined" en el frontend.
    const requestPayload = {
      to_number: phone,
      agent_id: agentConfig.agentId,
      retell_llm_dynamic_variables: dynamicVars,
    };

    // 9) Decidir si hacemos llamada real con Retell
    //    - Debe existir API Key
    //    - Debe existir FROM number
    //    - agentId debe ser real (no mock)
    const fromNumber = process.env.RETELL_FROM_NUMBER;
    const hasRetellConfig =
      Boolean(process.env.RETELL_API_KEY) &&
      Boolean(fromNumber) &&
      Boolean(agentConfig.agentId) &&
      !String(agentConfig.agentId).startsWith("mock-");

    // 10) Si hay config real: llamar a Retell
    if (hasRetellConfig) {
      try {
        const retellResp = await createRetellPhoneCall({
          fromNumber,
          toNumber: phone,
          overrideAgentId: agentConfig.agentId,
          dynamicVariables: dynamicVars,
        });

        return res.status(200).json({
          ok: true,
          mode: "retell",
          message: "Retell call created",
          call_id: retellResp?.call_id || null,
          payload: {
            ...requestPayload,
            from_number: fromNumber, // útil para debug/consistencia
          },
        });
      } catch (error) {
        console.error("Retell error:", error?.details || error);
        return res.status(error.status || 500).json({
          ok: false,
          mode: "retell",
          message: error.message || "Retell call failed",
          payload: requestPayload, // lo devolvemos para debug sin exponer details
        });
      }
    }

    // 11) Si NO hay config real: responder mock (mismo contrato)
    return res.status(200).json({
      ok: true,
      mode: "mock",
      message: "Mock call payload created",
      payload: requestPayload,
    });
  } catch (error) {
    console.error("Error in /api/call-demo:", error);
    return res.status(500).json({
      ok: false,
      message: "Internal server error",
    });
  }
});

export default router;
