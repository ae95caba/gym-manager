"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }
  return (
    <div>
      <form id="userForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="surname">Apellido:</label>
        <input type="text" id="surname" name="surname" required />

        <label htmlFor="phone">Teléfono:</label>
        <input type="tel" id="phone" name="phone" required />

        <label htmlFor="address">Dirección:</label>
        <input type="text" id="address" name="address" required />

        <label htmlFor="age">Edad:</label>
        <input type="number" id="age" name="age" required min="0" />

        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
}
