/**
 * server/utils/nameParser.js
 * Utilidad para parsear nombres completos en nombre y apellido.
 * Utilizado para extraer información de clientes para los agentes de IA.
 */

/**
 * Divide un nombre completo en nombre y apellido.
 * Se utiliza para poblar variables dinámicas de los agentes de Retell.
 *
 * @param {string} fullName - Nombre completo a parsear
 * @returns {Object} Objeto con propiedades { rl_clientName, rl_clientSurname }
 * @example
 * parseFullName("Mario Padilla Franco")
 * // Retorna: { rl_clientName: "Mario", rl_clientSurname: "Padilla Franco" }
 */
export function parseFullName(fullName) {
  if (!fullName || typeof fullName !== "string") {
    return {
      rl_clientName: "",
      rl_clientSurname: "",
    };
  }

  // Trim extra spaces and normalize
  const trimmed = fullName.trim().replace(/\s+/g, " ");

  if (!trimmed) {
    return {
      rl_clientName: "",
      rl_clientSurname: "",
    };
  }

  // Split by space
  const parts = trimmed.split(" ");

  if (parts.length === 1) {
    return {
      rl_clientName: parts[0],
      rl_clientSurname: "",
    };
  }

  // First part is name, rest is surname
  const rl_clientName = parts[0];
  const rl_clientSurname = parts.slice(1).join(" ");

  return {
    rl_clientName,
    rl_clientSurname,
  };
}
