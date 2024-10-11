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

      router.push("/miembros");
      router.refresh();
    } catch (error) {
      console.log(error.message);

      Swal.fire({
        title: `Oops`,
        text: `${user.name} ${user.surname} ya esta en el gym`,
        icon: "error",
      });
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

      router.push("/miembros");
      router.refresh();
    } catch (error) {
      console.log(error.message);

      Swal.fire({
        title: `Oops`,
        text: `${user.name} ${user.surname} no esta en el gym`,
        icon: "error",
      });
    }
  }

  return (
    <div className="container flex flex-col gap-20   items-center">
      <form
        id="userForm"
        onSubmit={askConfirmation}
        className="flex gap-4 justify-center"
      >
        <label htmlFor="name">Numero de socio:</label>
        <input
          type="number"
          id="id"
          name="id"
          className="w-20 text-black text-center"
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

        <button
          type="submit"
          className="bg-white text-black px-2 rounded border border-gray-300 hover:bg-gray-200"
        >
          {action === "ingreso" ? "Ingresó" : "Salió"}
        </button>
      </form>
      {user && (
        <div className=" w-fit flex flex-col gap-5  ">
          <h2>Confirmar miembro:</h2>
          <UserCard user={user} />
          <div className="container flex justify-evenly">
            <button
              onClick={action === "ingreso" ? createSession : endSession}
              className="bg-green-500 w-[100px] text-center"
            >
              OK
            </button>
            <button
              onClick={() => {
                setUser(null);
              }}
              className="bg-red-500 w-[100px] py-3 flex justify-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
