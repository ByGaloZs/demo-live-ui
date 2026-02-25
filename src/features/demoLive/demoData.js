/**
 * src/features/demoLive/demoData.js
 * Datos estáticos para la sección de demostraciones en vivo.
 * Incluye beneficios y configuración de las tarjetas de demostración.
 */

import headset from "../../assets/demo-icons/headset.svg";
import bank from "../../assets/demo-icons/bank.svg";
import trendUp from "../../assets/demo-icons/trend-up.svg";
import clipboard from "../../assets/demo-icons/clipboard.svg";

/**
 * Lista de beneficios principales mostrados en la sección introductoria.
 * Estos beneficios se muestran con checkmarks visuales en la página.
 */
export const benefits = ["Respuesta inmediata", "Voz 100% natural", "Múltiples casos de uso"];

/**
 * Opciones de demos disponibles.
 * Cada opción alimenta una tarjeta seleccionable y se utiliza para determinar
 * qué agente de IA será utilizado para la demostración.
 * El campo `id` es estable y se utiliza como identificador para selección y claves de React.
 */
export const demoOptions = [
  {
    id: "support",
    title: "Atención al Cliente",
    description: "Resolución de consultas",
    icon: headset,
  },
  {
    id: "collections",
    title: "Cobranza Inteligente",
    description: "Recordatorios de pago",
    badge: "Popular",
    icon: bank,
  },
  { id: "sales", title: "Ventas", description: "Calificación de leads", icon: trendUp },
  { id: "surveys", title: "Encuestas", description: "Satisfacción (NPS)", icon: clipboard },
];
