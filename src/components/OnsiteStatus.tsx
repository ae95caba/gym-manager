import React from "react";

export default function OnsiteStatus({ onsite }) {
  return (
    <>
      {onsite === undefined ? (
        <p>Cargando ...</p>
      ) : onsite ? (
        <p className="text-green-500">Esta en el gym</p>
      ) : (
        <p className="text-red-500">No esta en el gym</p>
      )}
    </>
  );
}
