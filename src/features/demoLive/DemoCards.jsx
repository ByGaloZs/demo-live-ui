function DemoCards({ options, selectedId, onSelect }) {
  return (
    // Grid responsive: 1 col mobile, 2 en sm, 4 en desktop.
    <div className="h-full overflow-visible grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
      {options.map((option) => {
        // La tarjeta activa se compara contra el estado del componente padre.
        const isSelected = option.id === selectedId;

        return (
          <button
            key={option.id}
            type="button"
            // Notifica al padre para actualizar la opcion seleccionada.
            onClick={() => onSelect(option.id)}
            aria-pressed={isSelected}
            className={[
              "relative w-full h-full flex flex-col rounded-2xl border bg-white p-5 text-left shadow-sm transition",
              "hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500/30",
              isSelected ? "border-indigo-400 ring-2 ring-indigo-200" : "border-slate-200",
            ].join(" ")}
          >
            {/* BADGE "Popular" fuera de la card */}
            {option.badge ? (
              <span className="absolute -top-3 right-6 -translate-x-1/2 rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700 z-10 shadow-sm ring-1 ring-indigo-200">
                {option.badge}
              </span>
            ) : null}

            {/* Header: Icon + check */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                  {/* icon puede ser ruta (svg/png) o JSX */}
                  {typeof option.icon === "string" ? <img src={option.icon} alt="" className="h-6 w-6" /> : option.icon}
                </div>
              </div>

              <span
                className={
                  isSelected
                    ? "inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white text-sm"
                    : "inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-300 text-sm"
                }
              >
                ✓
              </span>
            </div>

            {/* Title + subtitle */}
            <div className="mt-4 flex-1">
              <p className="text-sm font-semibold text-slate-900">{option.title}</p>
              <p className="mt-1 text-sm text-slate-600">{option.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default DemoCards;
