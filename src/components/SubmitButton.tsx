"use client";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import Swal from "sweetalert2";
export function SubmitButton({ params }) {
  const { pending } = useFormStatus();
  // Use useEffect to monitor changes in params
  useEffect(() => {
    if (params.status === "success") {
      console.log("Form submitted successfully!");
      Swal.fire({
        title: "Todo bien",
        text: "Usuario dado de alta",
        icon: "success",
        timer: 2000, // Close after 2 seconds (2000 milliseconds)
      });
      // You can trigger a success alert or any other action here
    } else if (params.status === "error") {
      console.log(`Error: ${params.message}`);
      Swal.fire({
        title: "Oops",
        text: "Ubo un problema",
        icon: "error",
      });
      // You can trigger an error alert or any other action here
    }
  }, [params]); // The effect runs when params changes
  return (
    <button type="submit" disabled={pending}>
      {pending ? "cargando" : "aceptar"}
    </button>
  );
}
