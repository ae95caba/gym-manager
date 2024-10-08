"use client";
import { useRouter } from "next/navigation";
import React from "react";
export default function UserCard({ user }) {
  const router = useRouter();
  return (
    <div
      className="bg-slate-900 p-3 hover:bg-slate-800 hover:cursor-pointer"
      onClick={() => router.push(`users/` + user.id)}
    >
      <h3 className="font-bold text-2xl mb-2">{user.name}</h3>
      <p>{user.address}</p>
      <p>{new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
