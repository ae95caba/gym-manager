// src/app/New.tsx
"use client";
import React, { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // Use the correct import for search parameters
import Button from "@/components/Button";
import Input from "@/components/Input";
import Swal from "sweetalert2";

import { SubmitButton } from "@/components/SubmitButton";
import createUser from "@/libs/asdf";
// Server action to handle user creation

export default function New() {
  const formRef = useRef(null);
  const router = useRouter(); // Get the router to manipulate the URL

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
        timer: 2000, // Close after 2 seconds,
        willClose: () => {
          // Remove the status query parameter when the alert closes
          const newSearchParams = new URLSearchParams(searchParams.toString());
          newSearchParams.delete("status"); // Remove the status query
          newSearchParams.delete("message"); // Remove the message query

          // Reset the form after successful submission
          if (formRef.current) {
            formRef.current.reset(); // Reset the form fields
          }

          // Update the URL without refreshing the page
          router.replace(`/alta?${newSearchParams.toString()}`);
        },
      });
    } else if (status === "error") {
      Swal.fire({
        title: "Error",
        text: `There was a problem: ${message || "Unknown error"}`,
        icon: "error",
        willClose: () => {
          const newSearchParams = new URLSearchParams(searchParams.toString());
          newSearchParams.delete("status");
          newSearchParams.delete("message");
          router.replace(`/alta?${newSearchParams.toString()}`);
        },
      });
    }
  }, [status, message]); // Trigger effect when status or message changes

  return (
    <form
      ref={formRef}
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

      <SubmitButton />
    </form>
  );
}
