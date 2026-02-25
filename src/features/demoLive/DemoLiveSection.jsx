import { useState } from "react";
import { demoOptions, benefits } from "./demoData";
import DemoCards from "./DemoCards";
import DemoForm from "./DemoForm";

const initialFormState = {
  fullName: "",
  phone: "",
  email: "",
  companyName: "",
};

function DemoLiveSection() {
  // Estado para controlar la opcion de demo seleccionada.
  const [selectedDemoId, setSelectedDemoId] = useState(demoOptions[0].id);
  // Estado centralizado de los campos del formulario.
  const [formValues, setFormValues] = useState(initialFormState);

  // Deriva el objeto completo de la demo activa a partir del id.
  const selectedDemo = demoOptions.find((demo) => demo.id === selectedDemoId);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Actualizacion generica por nombre de campo para no crear handlers por input.
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="relative overflow-hidden bg-white px-6 py-12 sm:px-8 lg:px-0 lg:py-16">
      <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-blue-200/40 via-indigo-200/30 to-purple-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-100/40 via-sky-100/30 to-purple-100/30 blur-3xl" />

      {/* IMPORTANTE: items-stretch para que ambas columnas tengan la misma altura */}
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_420px] lg:items-stretch">
        {/* IMPORTANTE: flex + h-full para poder estirar el área de cards */}
        <div className="order-1 lg:order-none flex h-full flex-col">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 mb-6 w-fit">
            <span className="text-xl">✨</span>
            <span className="text-sm font-semibold text-indigo-700">Demo en Vivo</span>
          </div>

          <h1 className="text-5xl font-bold text-slate-900 leading-tight">
            Prueba Nuestros
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Agentes de Voz con IA
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-lg">
            Experimenta la potencia de nuestros agentes de voz alimentados por inteligencia artificial. Diseñados para
            mejorar la experiencia del cliente.
          </p>

          <div className="mt-8 space-y-3">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-blue-500 text-white">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-base font-semibold text-slate-800">{benefit}</span>
              </div>
            ))}
          </div>

          {/* IMPORTANTE: este bloque debe poder crecer */}
          <div className="mt-10 flex flex-col flex-1">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Elige un Demo para Probar</h2>
            <p className="text-sm text-slate-600 mb-6">
              Selecciona uno de nuestros casos de uso y conoce cómo nuestros agentes pueden transformar tu negocio.
            </p>

            {/* IMPORTANTE: este wrapper deja que DemoCards se estire */}
            <div className="flex-1">
              {/* Componente presentacional; seleccion controlada por este contenedor */}
              <DemoCards options={demoOptions} selectedId={selectedDemoId} onSelect={setSelectedDemoId} />
            </div>
          </div>
        </div>

        {/* Sticky está bien. Si aun así quieres que siempre mida EXACTO igual, quita lg:sticky */}
        <div className="order-2 lg:order-none lg:self-center">
          {/* Formulario controlado por props para mantener una sola fuente de verdad */}
          <DemoForm values={formValues} onChange={handleInputChange} selectedDemo={selectedDemo} />
        </div>
      </div>
    </section>
  );
}

export default DemoLiveSection;
