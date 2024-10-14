"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { formattedDate } from "@/libs/functions";
import type { User } from "@prisma/client";

export default function UserCard({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) {
  const router = useRouter();

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
      {children}
    </div>
  );
}
