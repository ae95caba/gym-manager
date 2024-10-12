import React from "react";
import Button from "@/components/Button";

import { getUser, formattedDate } from "@/libs/functions";

interface UserProps {
  params: {
    id: string; // Adjust the type based on your specific use case
  };
}

export default async function User({ params }: UserProps) {
  const user = await getUser(params.id);

  return (
    <div className="flex flex-col gap-10 items-center  ">
      {user && (
        <div className="w-fit flex flex-col gap-5">
          <p>Nombre : {user.name} </p>
          <p>Apellido : {user.surname}</p>
          <p>Direccion: {user.address}</p>
          <p>Telefono: {user.phone}</p>
          <p>Edadd: {user.age}</p>
          <p>Fecha de alta: {formattedDate(user.createdAt)}</p>
          <p>
            Fecha de vigencia de membresia:{" "}
            {formattedDate(user.membershipExpiry)}
          </p>
        </div>
      )}
      <div className="flex gap-5">
        <Button>Renovar membresia</Button>
        <Button>Editar datos</Button>
        <Button>Eliminar</Button>
      </div>
    </div>
  );
}
