/**
 * App.jsx
 * Componente principal de la aplicación.
 * Actúa como contenedor de la sección principal de demostraciones en vivo.
 * Proporciona el layout base con estilos responsive.
 */

import DemoLiveSection from "./features/demoLive/DemoLiveSection";

/**
 * Componente App
 * Renderiza el contenedor principal con la sección de demos en vivo.
 * La estructura utiliza clases de Tailwind CSS para un diseño responsive y centrado.
 */
function App() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Sección principal con formulario de demo y tarjetas de opciones */}
        <DemoLiveSection />
      </div>
    </main>
  );
}

export default App;
