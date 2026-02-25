/**
 * src/features/demoLive/DemoCards.jsx
 * Componente presentacional que renderiza tarjetas de opciones de demos.
 * Cada tarjeta es seleccionable y notifica cambios al componente padre.
 */

/**
 * Componente DemoCards
 * Renderiza un grid de tarjetas interactivas con opciones de demostración.
 * - Responsive: 1 columna en mobile, 2 en tablets, 4 en desktop
 * - Cada tarjeta muestra un ícono, título, descripción y badge opcional
 * - La selección es controlada por el componente padre
 *
 * @param {Object} props - Props del componente
 * @param {Array} props.options - Lista de opciones de demo a mostrar
 * @param {string} props.selectedId - ID de la opción actualmente seleccionada
 * @param {Function} props.onSelect - Callback cuando se selecciona una tarjeta
 */
function DemoCards({ options, selectedId, onSelect }) {
  return (
    // Grid responsive: 1 columna en mobile, 2 en small devices, 4 en desktop
    <div className="h-full overflow-visible grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
      {options.map((option) => {
        // Determina si esta tarjeta está actualmente seleccionada
        const isSelected = option.id === selectedId;

        return (
          <button
            key={option.id}
            type="button"
            // Notifica al componente padre cuando se selecciona esta tarjeta
            onClick={() => onSelect(option.id)}
            aria-pressed={isSelected}
            className={[
              "relative w-full h-full flex flex-col rounded-2xl border bg-white p-5 text-left shadow-sm transition",
              "hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500/30",
              // Estilos condicionales: borde e indicador visual para la tarjeta seleccionada
              isSelected ? "border-indigo-400 ring-2 ring-indigo-200" : "border-slate-200",
            ].join(" ")}
          >
            {/* Badge de distinción (ej: "Popular") */}
            {option.badge ? (
              <span className="absolute -top-3 right-6 -translate-x-1/2 rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700 z-10 shadow-sm ring-1 ring-indigo-200">
                {option.badge}
              </span>
            ) : null}

            {/* Encabezado: Ícono + checkbox */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                  {/* El ícono puede ser una ruta de archivo (SVG/PNG) o un componente JSX */}
                  {typeof option.icon === "string" ? <img src={option.icon} alt="" className="h-6 w-6" /> : option.icon}
                </div>
              </div>

              {/* Indicador visual de selección */}
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

            {/* Título y descripción */}
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
