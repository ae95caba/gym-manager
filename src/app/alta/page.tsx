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

  const inputContainerStyle = "w-[300px] grid grid-cols-[7rem_15rem]  ";
  const inputStyle = "text-black px-2";
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
            <input
              type="text"
              id="name"
              name="name"
              required
              className={inputStyle}
            />
          </div>
          <div className={inputContainerStyle}>
            <label htmlFor="surname">Apellido:</label>
            <input
              type="text"
              id="surname"
              name="surname"
              required
              className={inputStyle}
            />
          </div>
          <div className={inputContainerStyle}>
            <label htmlFor="phone">Teléfono:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className={inputStyle}
            />
          </div>
          <div className={inputContainerStyle}>
            <label htmlFor="address">Dirección:</label>
            <input
              type="text"
              id="address"
              name="address"
              required
              className={inputStyle}
            />
          </div>
          <div className={inputContainerStyle}>
            <label htmlFor="age">Edad:</label>
            <input
              type="number"
              id="age"
              name="age"
              required
              className={inputStyle}
              min="0"
              onKeyDown={(e) => {
                if (
                  e.key.match(/[^0-9]/) &&
                  e.key !== "Backspace" &&
                  e.key !== "ArrowLeft" &&
                  e.key !== "ArrowRight"
                ) {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>

        <button type="submit" className="bg-white text-black p-2">
          Crear Usuario
        </button>
      </form>
    </div>
  );
}
