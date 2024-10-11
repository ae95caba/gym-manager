"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
export default function New() {
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const surname = e.target.surname.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const age = e.target.age.value;

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
      console.log(error.message);
      alert(error.message);
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
