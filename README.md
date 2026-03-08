# 🎙️ Demo Live UI - Agentes de Voz con IA

Una aplicación web interactiva para solicitar demostraciones en vivo de agentes de voz impulsados por inteligencia artificial. Este proyecto permite a los usuarios experimentar diferentes casos de uso de agentes conversacionales automatizados a través de llamadas telefónicas reales utilizando Retell AI.

## 📋 Descripción del Proyecto

**Demo Live UI** es una solución completa que combina un frontend moderno en React con un backend en Node.js/Express para gestionar demostraciones telefónicas automatizadas. El sistema soporta múltiples tipos de agentes especializados:

- **🎧 Atención al Cliente**: Resolución de consultas y soporte
- **💰 Cobranza Inteligente**: Recordatorios de pago y gestión de cuentas
- **📈 Ventas**: Calificación de leads y prospección
- **📋 Encuestas**: Medición de satisfacción (NPS) y feedback

## 🏗️ Arquitectura del Proyecto

```
demo-live-ui/
├── server/                    # Backend Node.js/Express
│   ├── index.js              # Servidor principal
│   ├── config/               # Configuraciones
│   │   ├── demoAgents.js    # Definición de agentes
│   │   └── demoDefaults.js  # Valores por defecto
│   ├── routes/               # Rutas de API
│   │   └── callDemo.js      # Endpoint para crear llamadas
│   ├── services/             # Servicios externos
│   │   └── retellClient.js  # Cliente de Retell AI
│   └── utils/                # Utilidades
│       ├── nameParser.js    # Parseador de nombres
│       └── phoneValidator.js # Validación de teléfonos
├── src/                       # Frontend React
│   ├── main.jsx              # Punto de entrada
│   ├── App.jsx               # Componente raíz
│   ├── features/
│   │   └── demoLive/         # Feature de demos
│   │       ├── DemoLiveSection.jsx  # Contenedor principal
│   │       ├── DemoForm.jsx         # Formulario
│   │       ├── DemoCards.jsx        # Tarjetas de opciones
│   │       └── demoData.js          # Datos de demos
│   └── assets/               # Recursos estáticos
├── public/                    # Archivos públicos
├── index.html                 # HTML base
├── vite.config.js            # Configuración de Vite
├── tailwind.config.js        # Configuración de Tailwind
├── postcss.config.js         # Configuración de PostCSS
├── eslint.config.js          # Configuración de ESLint
└── package.json              # Dependencias y scripts

```

## 🚀 Tecnologías Utilizadas

### Frontend

- **React 19** - Biblioteca de UI con hooks modernos
- **Vite** - Build tool y servidor de desarrollo ultra-rápido
- **Tailwind CSS** - Framework de utilidades CSS
- **PostCSS** - Procesamiento de CSS con autoprefixer

### Backend

- **Node.js** - Entorno de ejecución JavaScript
- **Express 5** - Framework web minimalista
- **Retell AI API** - Servicio de agentes de voz con IA
- **dotenv** - Gestión de variables de entorno
- **CORS** - Middleware para peticiones cross-origin

### Desarrollo

- **ESLint** - Linter de código JavaScript/React
- **ES Modules** - Sistema de módulos moderno

## 📦 Instalación

### Prerequisitos

- **Node.js** v18 o superior
- **npm** o **yarn**
- Cuenta de [Retell AI](https://www.retellai.com/) (para llamadas reales)

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd demo-live-ui
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto:

```env
# API Key de Retell AI (obtener en https://retellai.com)
RETELL_API_KEY=tu_api_key_aqui

# Número de teléfono desde el cual se realizarán las llamadas (formato E.164)
RETELL_FROM_NUMBER=+525512345678

# IDs de los agentes configurados en Retell AI
RETELL_AGENT_SUPPORT=agent_id_support
RETELL_AGENT_COLLECTIONS=agent_id_collections
RETELL_AGENT_SALES=agent_id_sales
RETELL_AGENT_SURVEYS=agent_id_surveys

# Variables fijas para demo de Collections (opcionales)
RETELL_COLLECTIONS_AMOUNT=1500
RETELL_COLLECTIONS_DPD=1
RETELL_COLLECTIONS_TODAY=2026-03-08
RETELL_COLLECTIONS_DUE_DATE=2026-03-11

# Puerto del servidor backend (opcional, default: 8787)
PORT=8787
```

> **Nota**: Si no configuras las variables de Retell, la aplicación funcionará en **modo mock** (simula llamadas sin ejecutarlas realmente).

## 🎯 Uso

### Modo Desarrollo

Ejecutar el proyecto requiere **dos terminales** simultáneas:

**Terminal 1 - Frontend (Vite)**:

```bash
npm run dev:ui
```

Esto iniciará el servidor de desarrollo en `http://localhost:5173`

**Terminal 2 - Backend (Express)**:

```bash
npm run dev:api
```

Esto iniciará el servidor API en `http://localhost:8787`

### Simular Producción Localmente

```bash
npm run build
NODE_ENV=production npm run start
```

En PowerShell:

```powershell
$env:NODE_ENV="production"; npm run start
```

### Build de Producción

```bash
npm run build
```

Los archivos compilados estarán en el directorio `dist/`.

### Preview de Producción

```bash
npm run preview
```

## 🚀 Deploy en Render (Single Web Service)

Configurar el servicio como un único **Web Service** de Node/Express que sirve frontend + API.

- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start`

### Variables de entorno requeridas

- `RETELL_API_KEY`
- `RETELL_FROM_NUMBER`
- `RETELL_AGENT_*` (por ejemplo: `RETELL_AGENT_SUPPORT`, `RETELL_AGENT_COLLECTIONS`, `RETELL_AGENT_SALES`, `RETELL_AGENT_SURVEYS`)

### Variable opcional

- `CORS_ORIGIN` (si necesitas permitir un origen explícito distinto al mismo dominio)
- `RETELL_COLLECTIONS_AMOUNT`
- `RETELL_COLLECTIONS_DPD`
- `RETELL_COLLECTIONS_TODAY`
- `RETELL_COLLECTIONS_DUE_DATE`

## 🔧 Configuración de Agentes

### Agregar un Nuevo Agente

1. **Configurar en Retell AI**: Crear y configurar el agente en la plataforma de Retell

2. **Actualizar `server/config/demoAgents.js`**:

```javascript
const demoAgents = {
  // ... agentes existentes

  nuevoAgente: {
    envKey: "RETELL_AGENT_NUEVO",
    fallbackAgentId: "mock-agent-nuevo",
    name: "Nuevo Agente",
    description: "Descripción del agente",
  },
};
```

3. **Agregar variable de entorno**:

```env
RETELL_AGENT_NUEVO=tu_agent_id
```

4. **Actualizar `src/features/demoLive/demoData.js`**:

```javascript
export const demoOptions = [
  // ... opciones existentes

  {
    id: "nuevoAgente",
    title: "Nuevo Agente",
    description: "Breve descripción",
    icon: iconoImportado,
  },
];
```

### Variables Dinámicas Personalizadas

Para agregar variables dinámicas a un demo específico:

1. **Definir defaults en `server/config/demoDefaults.js`**:

```javascript
export const DEMO_DEFAULTS = {
  nuevoAgente: {
    variable1: "valor1",
    variable2: "valor2",
  },
};
```

2. **Procesar en `server/routes/callDemo.js`** (similar al caso de `collections`)

## 🌐 API Endpoints

### `GET /api/health`

Verifica el estado del servidor.

**Response**:

```json
{
  "ok": true,
  "message": "Server is running"
}
```

### `POST /api/call-demo`

Crea una llamada de demostración.

**Request Body**:

```json
{
  "phone": "+525512345678",
  "fullName": "Mario Padilla Franco",
  "demoId": "collections"
}
```

**Response (Modo Real)**:

```json
{
  "ok": true,
  "mode": "retell",
  "message": "Retell call created",
  "call_id": "abc123xyz",
  "payload": {
    "to_number": "+525512345678",
    "agent_id": "agent_xyz",
    "from_number": "+525500000000",
    "retell_llm_dynamic_variables": {
      "rl_clientName": "Mario",
      "rl_clientSurname": "Padilla Franco"
    }
  }
}
```

**Response (Modo Mock)**:

```json
{
  "ok": true,
  "mode": "mock",
  "message": "Mock call payload created",
  "payload": {
    "to_number": "+525512345678",
    "agent_id": "mock-agent-collections",
    "retell_llm_dynamic_variables": {
      "rl_clientName": "Mario",
      "rl_clientSurname": "Padilla Franco"
    }
  }
}
```

## 📱 Validación de Teléfonos

Los números telefónicos deben estar en formato **E.164**:

- Comienzan con `+`
- Seguidos del código de país y número (10-15 dígitos)
- Ejemplo válido: `+525512345678`
- Ejemplo inválido: `5512345678` (falta `+`)

## 🎨 Personalización de Estilos

El proyecto utiliza **Tailwind CSS** para los estilos. Para personalizar:

1. **Colores y fuentes**: Editar `tailwind.config.js`
2. **Estilos globales**: Editar `src/index.css`
3. **Estilos de componentes**: Los componentes utilizan clases de Tailwind directamente

## 🧪 Testing

```bash
npm run lint
```

## 🔒 Seguridad

- **Variables de entorno**: Nunca subir el archivo `.env` al repositorio
- **API Keys**: Mantener las claves de Retell AI privadas
- **Validación**: Todos los inputs se validan en el backend
- **CORS**: Configurado para permitir solo orígenes autorizados

## 📝 Scripts Disponibles

| Script            | Descripción                                 |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo (frontend) |
| `npm run build`   | Compila la aplicación para producción       |
| `npm run preview` | Preview de la versión de producción         |
| `npm run lint`    | Ejecuta el linter de código                 |

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commitea tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Pushea a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📄 Estructura de Comentarios

Todos los archivos del proyecto incluyen:

- **Docstrings**: Descripción general del archivo al inicio
- **JSDoc**: Documentación de funciones importantes con parámetros y valores de retorno
- **Comentarios inline**: Explicaciones de lógica compleja

## 🐛 Troubleshooting

### El servidor no inicia

- Verificar que el puerto 8787 no esté en uso
- Revisar que las dependencias estén instaladas correctamente

### Las llamadas no se ejecutan

- Verificar que `RETELL_API_KEY` esté configurada
- Verificar que `RETELL_FROM_NUMBER` esté en formato E.164
- Revisar los logs del servidor para mensajes de error de Retell

### Errores de CORS

- Verificar que el proxy de Vite esté configurado correctamente
- Asegurarse de que ambos servidores (frontend y backend) estén corriendo

## 📧 Soporte

Para preguntas o soporte, por favor abre un issue en el repositorio.

## 📜 Licencia

Este proyecto es de uso privado. Todos los derechos reservados.

---

**Desarrollado con ❤️ usando React, Node.js y Retell AI**
