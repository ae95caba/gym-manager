"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { FormEvent } from "react";
export default function New() {
  const router = useRouter();
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement; // Cast e.target to HTMLFormElement
    const formData = new FormData(form); // Create FormData object to extract values

    const name = formData.get("name") as string; // Use FormData to get values
    const surname = formData.get("surname") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const age = formData.get("age") as string; // Consider using number if age is a number

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

    console.log(options.body);

    try {
      const res = await fetch(`/api/users`, options);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "An error occurred"); // Throw an error with the response message
      }
      const data = await res.json();
      console.log(data);
      router.push("/miembros");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        alert(error.message);
      } else {
        console.log("An unexpected error occurred");
        alert("An unexpected error occurred");
      }
    }
  }

  const inputContainerStyle = "w-[300px] grid grid-cols-[7rem_15rem]  ";

  return (
    <div className="container">
      <form
        id="userForm"
        onSubmit={handleSubmit}
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

        <Button type="submit">Crear Usuario</Button>
      </form>
    </div>
  );
}
