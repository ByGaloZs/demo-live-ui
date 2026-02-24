const inputStyles =
  "mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-300/50";

function DemoForm({ values, onChange, selectedDemo }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Por ahora solo registra la solicitud; aqui se conectaria el endpoint real.
    console.log("Demo solicitado:", {
      selectedDemo,
      ...values,
    });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-slate-100 bg-white shadow-2xl">
      <div className="p-6 sm:p-8 relative">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <p className="text-2xl font-bold text-slate-900">Solicita tu Demo en Vivo</p>
            <p className="mt-1 text-sm text-slate-600">Elige un escenario y te llamamos en 30 segundos</p>
          </div>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Inputs controlados: el estado vive en DemoLiveSection */}
          <div>
            <label className="text-sm font-semibold text-slate-700">Número de teléfono</label>
            <input
              name="phone"
              value={values.phone}
              onChange={onChange}
              placeholder="+52 55 0000 0000"
              className={inputStyles}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Nombre completo</label>
            <input
              name="fullName"
              value={values.fullName}
              onChange={onChange}
              placeholder="Tu nombre"
              className={inputStyles}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Nombre de Empresa</label>
            <input
              name="companyName"
              value={values.companyName}
              onChange={onChange}
              placeholder="Nombre de tu empresa"
              className={inputStyles}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Correo electrónico</label>
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={onChange}
              placeholder="nombre@empresa.com"
              className={inputStyles}
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-base font-bold text-white shadow-lg shadow-blue-300/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-300/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.319.159.717.327 1.142.228.567.534 1.273.97 2 .436.727.95 1.379 1.578 1.913.629.534 1.265.821 1.914.821.649 0 1.285-.287 1.914-.82.627-.535 1.142-1.186 1.578-1.914.436-.727.742-1.433.97-2 .168-.425.269-.823.327-1.142L14.46 6.27a1 1 0 01-.54-1.06l.74-4.435A1 1 0 0116.847 2H19a1 1 0 011 1v14a1 1 0 01-1 1h-2.153a1 1 0 01-.986-.836l-.74-4.435a1 1 0 01.54-1.06l1.548-.773c-.058-.319-.159-.717-.327-1.142-.228-.567-.534-1.273-.97-2-.436-.727-.95-1.379-1.578-1.913-.629-.534-1.265-.821-1.914-.821-.649 0-1.285.287-1.914.82-.627.535-1.142 1.186-1.578 1.914-.436.727-.742 1.433-.97 2-.168.425-.269.823-.327 1.142l1.548.773a1 1 0 01.54 1.06l-.74 4.435a1 1 0 01-.986.836H4a1 1 0 01-1-1V3z" />
              </svg>
              Llamar ahora
            </button>
            <p className="mt-3 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
              <span>🔒</span> Protegemos tus datos • Atención inmediata
            </p>
          </div>
        </form>
      </div>

      <div className="absolute bottom-0 right-0 opacity-30 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 200 200" className="text-blue-200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <path
            d="M100 80 C110 80, 120 85, 120 95 L120 130 C120 135, 115 140, 110 140 L90 140 C85 140, 80 135, 80 130 L80 95 C80 85, 90 80, 100 80 M85 95 L115 95 M100 105 L100 125"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            opacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
}

export default DemoForm;
