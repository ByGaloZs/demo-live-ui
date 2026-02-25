/**
 * server/utils/phoneValidator.js
 * Utilidad para validar números telefónicos en formato E.164.
 * Garantiza que los números cumplan con estándares internacionales para Retell.
 */

/**
 * Valida si un número telefónico cumple con el formato E.164.
 * Formato E.164: comienza con "+" seguido de 10 a 15 dígitos.
 *
 * @param {string} phone - Número telefónico a validar
 * @returns {boolean} true si el formato es válido, false en caso contrario
 * @example
 * isValidE164("+525512345678") // true
 * isValidE164("5512345678")     // false (falta el "+")
 */
export function isValidE164(phone) {
  if (typeof phone !== "string") return false;
  const trimmed = phone.trim();
  return /^\+\d{10,15}$/.test(trimmed);
}
