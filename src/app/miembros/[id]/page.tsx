import React from "react";
import Button from "@/components/Button";
export async function getUser(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/users/${id}`);

    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.error || "An error occurred"); // Throw an error with the response message
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
}

export function formattedDate(date) {
  return new Date(date).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default async function User({ params }) {
  const user = await getUser(params.id);

  return (
    <div className="flex flex-col gap-10 items-center  ">
      <div className="w-fit flex flex-col gap-5">
        <p>Nombre : {user.name} </p>
        <p>Apellido : {user.surname}</p>
        <p>Direccion: {user.address}</p>
        <p>Telefono: {user.phone}</p>
        <p>Edadd: {user.age}</p>
        <p>Fecha de alta: {formattedDate(user.createdAt)}</p>
        <p>
          Fecha de vigencia de membresia: {formattedDate(user.membershipExpiry)}
        </p>
      </div>
      <div className="flex gap-5">
        <Button>Renovar membresia</Button>
        <Button>Editar datos</Button>
        <Button>Eliminar</Button>
      </div>
    </div>
  );
}
