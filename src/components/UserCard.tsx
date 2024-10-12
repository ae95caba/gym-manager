"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { formattedDate } from "@/libs/functions";

export default function UserCard({ user }) {
  const [onsite, setOnsite] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getLastUserSession(id) {
      try {
        const res = await fetch(`/api/sessions?userId=${id}&last=true`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "An error occurred"); // Throw an error with the response message
        }
        const data = await res.json();

        return data;
      } catch (error) {
        console.log(error.message);
      }
    }

    async function asdf() {
      const lastUserSession = await getLastUserSession(user.id);
      console.log(lastUserSession);

      if (lastUserSession && !lastUserSession.endTime) {
        setOnsite(true);
      }
    }

    asdf();
  }, []);

  const currentDate = new Date();
  const membershipExpiryDate = new Date(user.membershipExpiry);
  const isMembershipValid = membershipExpiryDate > currentDate;

  return (
    <div
      className="bg-slate-900 p-5 hover:bg-slate-800 hover:cursor-pointer flex flex-col gap-5 w-[350px]"
      onClick={() => router.push(`/miembros/` + user.id)}
    >
      <h3 className="font-bold text-2xl mb-2">
        {user.name} {user.surname}
      </h3>
      <p>Nro de miembro : {user.id}</p>

      <div>
        {isMembershipValid ? (
          <p className="text-green-500">
            Membresía vigente hasta: {formattedDate(user.membershipExpiry)}
          </p>
        ) : (
          <p className="text-red-500">
            Membresía vencida el: {formattedDate(user.membershipExpiry)}
          </p>
        )}
      </div>
      {onsite ? (
        <p>Esta en el gym</p>
      ) : (
        <p className="text-red-500"> No esta en el gym</p>
      )}
    </div>
  );
}
