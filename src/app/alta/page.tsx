// src/app/New.tsx
"use client";
import React, { useRef } from "react";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Swal from "sweetalert2";

import { SubmitButton } from "@/components/SubmitButton";

// Server action to handle user creation

export default function Alta() {
  const formRef = useRef(null);
  const inputContainerStyle = "w-[300px] grid grid-cols-[7rem_15rem]";

  async function createUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Create FormData from the form element
    const formData = new FormData(event.currentTarget);

    const name = formData.get("name") as string;
    const surname = formData.get("surname") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const age = formData.get("age") as string;

    const options = {
      method: "POST",
      body: JSON.stringify({
        name,
        surname,
        phone,
        address,
        age,
      }),
      headers: { "Content-Type": "application/json" },
    };

    try {
      const res = await fetch(`/api/users`, options);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "An error occurred");
      }
      const data = await res.json();
      Swal.fire({
        title: "Success",
        text: "User successfully created!",
        icon: "success",
        timer: 2000, // Close after 2 seconds,
        willClose: () => {
          // Reset the form after successful submission

          if (formRef.current) {
            formRef.current.reset(); // Reset the form fields
          }
        },
      });
      return data; // Return the response data
    } catch (error) {
      console.log(
        `error: ${
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        }`
      );

      const errorMessage = encodeURIComponent(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );

      Swal.fire({
        title: "Error",
        text: `There was a problem: ${errorMessage || "Unknown error"}`,
        icon: "error",
      });
    }
  }

  return (
    <form
      ref={formRef}
      id="userForm"
      onSubmit={createUser} // Specify the server action
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

      <SubmitButton />
    </form>
  );
}
