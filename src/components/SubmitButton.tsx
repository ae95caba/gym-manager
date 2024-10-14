"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ params }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "cargando" : "aceptar"}
    </button>
  );
}
