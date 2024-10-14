// src/app/New.tsx
"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Use the correct import for search parameters
import Button from "@/components/Button";
import Input from "@/components/Input";
import Swal from "sweetalert2";
import { SubmitButton } from "@/components/SubmitButton";
import createUser from "@/libs/asdf";
// Server action to handle user creation

export default function New({ params }) {
  const searchParams = useSearchParams(); // Get the search parameters
  const status = searchParams.get("status"); // Get the status parameter from the URL
  const message = searchParams.get("message"); // Get the message parameter if exists
  const inputContainerStyle = "w-[300px] grid grid-cols-[7rem_15rem]";
  useEffect(() => {
    // Use useEffect to handle query changes
    if (status === "success") {
      Swal.fire({
        title: "Success",
        text: "User successfully created!",
        icon: "success",
        timer: 2000, // Close after 2 seconds
      });
    } else if (status === "error") {
      Swal.fire({
        title: "Error",
        text: `There was a problem: ${message || "Unknown error"}`,
        icon: "error",
      });
    }
  }, [status, message]); // Trigger effect when status or message changes

  return (
    <form
      id="userForm"
      action={createUser} // Specify the server action
      className="flex flex-col items-center gap-20"
    >
      <div className="flex flex-col items-center gap-5">
        <div className={inputContainerStyle}>
          <label htmlFor="name">Nombre:</label>
          <Input type="text" id="name" name="name" required />
        </div>
        <div className={inputContainerStyle}>
          <label htmlFor="surname">Apellido:</label>
          <Input type="text" id="surname" name="surname" required />
        </div>
        <div className={inputContainerStyle}>
          <label htmlFor="phone">Teléfono:</label>
          <Input type="text" id="phone" name="phone" required />
        </div>
        <div className={inputContainerStyle}>
          <label htmlFor="address">Dirección:</label>
          <Input type="text" id="address" name="address" required />
        </div>
        <div className={inputContainerStyle}>
          <label htmlFor="age">Edad:</label>
          <Input type="number" id="age" name="age" required min={0} />
        </div>
      </div>

      {<Button type="submit">Crear Usuario</Button>}
    </form>
  );
}
