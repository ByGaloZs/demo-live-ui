import headset from "../../assets/demo-icons/headset.svg";
import bank from "../../assets/demo-icons/bank.svg";
import trendUp from "../../assets/demo-icons/trend-up.svg";
import clipboard from "../../assets/demo-icons/clipboard.svg";

// Lista de beneficios mostrados en el bloque de introduccion.
export const benefits = ["Respuesta inmediata", "Voz 100% natural", "Múltiples casos de uso"];

// Opciones que alimentan las tarjetas y la seleccion de demo activa.
// `id` funciona como identificador estable para seleccion y keys de React.
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
