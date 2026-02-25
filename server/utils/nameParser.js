/**
 * Parses a full name into first name and surname for Retell LLM variables.
 * @param {string} fullName - The full name to parse
 * @returns {Object} { rl_clientName, rl_clientSurname }
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
