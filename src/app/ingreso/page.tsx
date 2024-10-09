"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "../miembros/[id]/page";
import UserCard from "@/components/UserCard";
export default function Ingreso() {
  const router = useRouter();
  const [user, setUser] = useState();

  async function askConfirmation(e) {
    e.preventDefault();
    const userId = e.target.id.value;

    try {
      const fetchedUser = await getUser(userId);
      console.log(fetchedUser);
      setUser(fetchedUser);
      // Check if the response is OK (status in the range 200-299)
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }

  async function createSession() {
    const options = {
      method: "POST",
      body: JSON.stringify({
        userId: user.id,
      }),
      headers: { "Content-Type": "application/json" },
    };

    console.log(options.body);

    try {
      const res = await fetch(`/api/sessions`, options);
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
      <form id="userForm" onSubmit={askConfirmation}>
        <label htmlFor="name">Numero de socio:</label>
        <input type="number" id="id" name="id" required />

        <button type="submit">Ingresó</button>
      </form>
      {user && (
        <div>
          <UserCard user={user} />
          <button onClick={createSession}>OK</button>
          <button
            onClick={() => {
              setUser(null);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
