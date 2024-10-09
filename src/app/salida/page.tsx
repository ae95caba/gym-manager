"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Salida() {
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    const userId = e.target.id.value;

    const options = {
      method: "PUT",

      headers: { "Content-Type": "application/json" },
    };

    const res = await fetch(`/api/sessions/${userId}`, options);

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

        <button type="submit">Salió</button>
      </form>
    </div>
  );
}
