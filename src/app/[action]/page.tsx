"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/libs/functions";
import UserCard from "@/components/UserCard";
import { notFound } from "next/navigation";
import Swal from "sweetalert2";
import Button from "@/components/Button";
import { useSessionContext } from "@/context/SessionContext";
import Input from "@/components/Input";
import type { User } from "@prisma/client";
import { FormEvent } from "react";
interface IngresoSalidaParams {
  action: string;
}

export default function IngresoSalida({
  params,
}: {
  params: IngresoSalidaParams;
}) {
  const { refreshOnsiteUsers } = useSessionContext();
  const { action } = params;
  if (action !== "ingreso" && action !== "salida") {
    notFound(); // This will redirect to the 404 page
  }
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>(undefined);

  async function askConfirmation(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const userId = (form.elements.namedItem("id") as HTMLInputElement).value;

    try {
      const fetchedUser = await getUser(userId);
      console.log(fetchedUser);
      setUser(fetchedUser);
      // Check if the response is OK (status in the range 200-299)
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }

  async function handleSession(action: "create" | "end") {
    const method = action === "create" ? "POST" : "PUT";
    const url =
      action === "create" ? `/api/sessions` : `/api/sessions/${user!.id}`;
    const body =
      action === "create" ? JSON.stringify({ userId: user!.id }) : undefined;

    const options = {
      method,
      headers: { "Content-Type": "application/json" },
      body,
    };

    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "An error occurred");
      }

      const data = await res.json();
      console.log(data);

      Swal.fire({
        title: "Todo bien",
        text:
          action === "create"
            ? `${user!.name} ${user!.surname} ingresó con éxito`
            : `${user!.name} ${user!.surname} salió con éxito`,
        icon: "success",
        timer: 2000, // Close after 2 seconds (2000 milliseconds)
      });

      refreshOnsiteUsers();
      router.push("/miembros");
      router.refresh();
    } catch (error) {
      console.log((error as Error).message);

      Swal.fire({
        title: "Oops",
        text:
          action === "create"
            ? `${user!.name} ${user!.surname} ya está en el gym`
            : `${user!.name} ${user!.surname} no está en el gym`,
        icon: "error",
      });
    }
  }

  return (
    <div className="container flex flex-col gap-20   items-center">
      <form
        id="userForm"
        onSubmit={askConfirmation}
        className="flex gap-4 justify-center items-center"
      >
        <label htmlFor="name">Numero de socio:</label>
        <Input type="number" id="id" name="id" required />

        <Button type="submit">
          {action === "ingreso" ? "Ingresó" : "Salió"}
        </Button>
      </form>
      {user && (
        <div className=" w-fit flex flex-col gap-5  ">
          <h2>Confirmar miembro:</h2>
          <UserCard user={user} />
          <div className="container flex justify-evenly">
            <Button
              className="bg-green-500 w-[100px]"
              onClick={() => {
                if (action === "ingreso") {
                  handleSession("create");
                } else {
                  handleSession("end");
                }
              }}
            >
              OK
            </Button>
            <Button
              className="bg-red-500 w-[100px]"
              onClick={() => {
                setUser(undefined);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
