import { useState } from "react";
import DemoForm from "./DemoForm";

const initialFormState = {
  fullName: "",
  phoneNumber: "",
  paymentDate: "",
  amount: "",
};

function DemoLiveSection() {
  const [formValues, setFormValues] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Demo de llamada</h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">Nombre, número, fecha de pago y monto.</p>
        </div>

        <DemoForm values={formValues} onChange={handleInputChange} />
      </div>
    </section>
  );
}

export default DemoLiveSection;
