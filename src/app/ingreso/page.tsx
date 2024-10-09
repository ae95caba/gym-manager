"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Ingreso() {
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    const userId = e.target.id.value;

    const options = {
      method: "POST",
      body: JSON.stringify({
        userId,
      }),
      headers: { "Content-Type": "application/json" },
    };

    console.log(options.body);

    const res = await fetch(`/api/sessions`, options);

    const data = await res.json();

    console.log(data);

    router.push("/");
    router.refresh();
  }

  return (
    <div>
      <form id="userForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Numero de socio:</label>
        <input type="number" id="id" name="id" required />

        <button type="submit">Ingresar miembro</button>
      </form>
    </div>
  );
}
