// src/app/New.tsx
import React from "react";
import { revalidateTag } from "next/cache";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { BASE_API_URL } from "@/libs/constants";
// Server action to handle user creation
async function createUser(formData: FormData) {
  "use server";
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
    const res = await fetch(`${BASE_API_URL}/api/users`, options);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "An error occurred");
    }
    const data = await res.json();
    revalidateTag("users"); // Revalidate the users tag
    return data; // Return the response data
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
}

export default function New() {
  const inputContainerStyle = "w-[300px] grid grid-cols-[7rem_15rem]";

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

      <Button type="submit">Crear Usuario</Button>
    </form>
  );
}
