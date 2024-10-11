"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "../miembros/[id]/page";
import UserCard from "@/components/UserCard";
import { notFound } from "next/navigation";
import Swal from "sweetalert2";
export default function Ingreso({ params }) {
  const { action } = params;
  if (action !== "ingreso" && action !== "salida") {
    notFound(); // This will redirect to the 404 page
  }
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
      Swal.fire({
        title: "Todo bien",
        text: `${user.name} ${user.surname} ingreso con exito`,
        icon: "success",
        timer: 2000, // Close after 2 seconds (2000 milliseconds)
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }

  async function endSession() {
    const options = {
      method: "PUT",

      headers: { "Content-Type": "application/json" },
    };

    try {
      const res = await fetch(`/api/sessions/${user.id}`, options);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "An error occurred"); // Throw an error with the response message
      }
      const data = await res.json();

      console.log(data);
      Swal.fire({
        title: `Todo bien`,
        text: `${user.name} ${user.surname} salio con exito`,
        icon: "success",
        timer: 2000, // Close after 2 seconds (2000 milliseconds)
      });

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
        <input
          type="number"
          id="id"
          name="id"
          required
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

        <button type="submit">
          {action === "ingreso" ? "Ingresó" : "Salió"}
        </button>
      </form>
      {user && (
        <div>
          <UserCard user={user} />
          <button onClick={action === "ingreso" ? createSession : endSession}>
            OK
          </button>
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
