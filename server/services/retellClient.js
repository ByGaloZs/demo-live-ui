/**
 * server/services/retellClient.js
 * Cliente para comunicarse con la API de Retell AI.
 * Gestiona la creación de llamadas telefónicas automáticas con agentes de IA.
 */

const RETELL_URL = "https://api.retellai.com/v2/create-phone-call";

/**
 * Crea una llamada telefónica a través de Retell AI.
 * Se comunica con la API de Retell para iniciar una llamada automática
 * con un agente de IA específico.
 *
 * @param {Object} options - Opciones de la llamada
 * @param {string} options.fromNumber - Número telefónico del remitente (formato E.164)
 * @param {string} options.toNumber - Número telefónico del destinatario (formato E.164)
 * @param {string} [options.overrideAgentId] - ID del agente personalizado a utilizar
 * @param {Object} [options.dynamicVariables={}] - Variables dinámicas para el script del agente
 * @returns {Promise<Object>} Respuesta de Retell con información de la llamada
 * @throws {Error} Si falta la API key o la solicitud falla
 */
export async function createRetellPhoneCall({ fromNumber, toNumber, overrideAgentId, dynamicVariables = {} }) {
  const apiKey = process.env.RETELL_API_KEY;
  if (!apiKey) throw new Error("Missing RETELL_API_KEY");

  // Convierte todas las variables dinámicas a strings (requerido por Retell)
  const retell_llm_dynamic_variables = Object.fromEntries(
    Object.entries(dynamicVariables).map(([k, v]) => [k, String(v ?? "")]),
  );

  // Construye el cuerpo de la solicitud
  const body = {
    from_number: fromNumber,
    to_number: toNumber,
    ...(overrideAgentId ? { override_agent_id: overrideAgentId } : {}),
    ...(Object.keys(retell_llm_dynamic_variables).length ? { retell_llm_dynamic_variables } : {}),
  };

  // Realiza la solicitud HTTP a la API de Retell
  const resp = await fetch(RETELL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  // Parsea la respuesta JSON
  const data = await resp.json().catch(() => ({}));

  // Maneja errores de la API
  if (!resp.ok) {
    const msg = data?.error?.message || data?.message || `Retell API error (HTTP ${resp.status})`;
    const err = new Error(msg);
    err.status = resp.status;
    err.details = data;
    throw err;
  }

  return data;
}
