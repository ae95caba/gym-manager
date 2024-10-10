"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
export default function UserCard({ user }) {
  const [onsite, setOnsite] = useState();
  const router = useRouter();

  /* useEffect(() => {
    first;

    return () => {
      second;
    };
  }, [third]); */

  return (
    <div
      className="bg-slate-900 p-3 hover:bg-slate-800 hover:cursor-pointer"
      onClick={() => router.push(`/miembros/` + user.id)}
    >
      <h3 className="font-bold text-2xl mb-2">
        {user.name} {user.surname}
      </h3>
      <p>{user.address}</p>
      <p>
        Miembro hasta :{new Date(user.membershipExpiry).toLocaleDateString()}
      </p>
      {onsite ? <p>Esta en el gym</p> : <p>No esta en el gym</p>}
    </div>
  );
}
