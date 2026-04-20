import { useMemo, useState } from "react";

const baseInputStyles =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400";
const errorInputStyles = "border-red-300 focus:border-red-400";
const labelStyles = "text-sm font-medium text-slate-700";
const errorTextStyles = "mt-1 text-xs text-red-600";

function validateForm(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Ingresa el nombre.";
  }

  const phoneDigits = values.phoneNumber.replace(/\D/g, "");
  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = "Ingresa el número.";
  } else if (phoneDigits.length < 10) {
    errors.phoneNumber = "Debe tener al menos 10 dígitos.";
  }

  if (!values.paymentDate) {
    errors.paymentDate = "Selecciona la fecha.";
  }

  if (!String(values.amount).trim()) {
    errors.amount = "Ingresa el monto.";
  } else if (Number(values.amount) <= 0) {
    errors.amount = "Debe ser mayor a 0.";
  }

  return errors;
}

function DemoForm({ values, onChange }) {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState({
    type: "",
    message: "",
  });

  const isFormComplete = useMemo(() => {
    return values.fullName.trim() && values.phoneNumber.trim() && values.paymentDate && String(values.amount).trim();
  }, [values]);

  const getInputClassName = (fieldName) => {
    return `${baseInputStyles} ${errors[fieldName] ? errorInputStyles : ""}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm(values);
    setErrors(validationErrors);
    setSubmitState({ type: "", message: "" });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/call-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: values.fullName,
          phone: values.phoneNumber,
          paymentDate: values.paymentDate,
          amount: values.amount,
          demoId: "collections",
        }),
      });

      const rawText = await response.text();

      let data = {};
      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch {
        data = {
          ok: false,
          message: rawText || `HTTP ${response.status}`,
        };
      }

      if (!response.ok || !data.ok) {
        setSubmitState({
          type: "error",
          message: data.message || `Error ${response.status}: no se pudo procesar la solicitud.`,
        });

        console.error("Call demo error response:", {
          status: response.status,
          data,
        });
        return;
      }

      setSubmitState({
        type: "success",
        message:
          data.mode === "mock"
            ? "Formulario enviado. Payload generado en modo mock."
            : "Llamada solicitada correctamente.",
      });

      console.log("Call demo response:", data);
    } catch (error) {
      console.error("Submit error:", error);

      setSubmitState({
        type: "error",
        message: error.message || "Error inesperado al enviar el formulario.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="space-y-5">
        <div>
          <label htmlFor="fullName" className={labelStyles}>
            Nombre
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Mario Padilla"
            value={values.fullName}
            onChange={onChange}
            className={getInputClassName("fullName")}
          />
          {errors.fullName ? <p className={errorTextStyles}>{errors.fullName}</p> : null}
        </div>

        <div>
          <label htmlFor="phoneNumber" className={labelStyles}>
            Número
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="+52 55 1234 5678"
            value={values.phoneNumber}
            onChange={onChange}
            className={getInputClassName("phoneNumber")}
          />
          {errors.phoneNumber ? <p className={errorTextStyles}>{errors.phoneNumber}</p> : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="paymentDate" className={labelStyles}>
              Fecha de pago
            </label>
            <input
              id="paymentDate"
              name="paymentDate"
              type="date"
              value={values.paymentDate}
              onChange={onChange}
              className={getInputClassName("paymentDate")}
            />
            {errors.paymentDate ? <p className={errorTextStyles}>{errors.paymentDate}</p> : null}
          </div>

          <div>
            <label htmlFor="amount" className={labelStyles}>
              Monto
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="3500"
              value={values.amount}
              onChange={onChange}
              className={getInputClassName("amount")}
            />
            {errors.amount ? <p className={errorTextStyles}>{errors.amount}</p> : null}
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormComplete || isSubmitting}
          className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isSubmitting ? "Procesando..." : "Llamar ahora"}
        </button>

        {submitState.type === "success" ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {submitState.message}
          </div>
        ) : null}

        {submitState.type === "error" ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitState.message}
          </div>
        ) : null}
      </div>
    </form>
  );
}

export default DemoForm;
