import React from "react";
import UserCard from "@/components/UserCard";
import type { User } from "@prisma/client";
import { BASE_API_URL } from "@/libs/constants";

async function fetchUsers() {
  const res = await fetch(`${BASE_API_URL}/api/users`, {
    cache: "no-store", // Ensures the data is fetched fresh on every request
  });

  const data = await res.json();
  return data;
}
export default async function Miembros() {
  if (!BASE_API_URL) {
    return null;
  }
  const users = await fetchUsers();
  console.log(users);
  return (
    <div className="container mx-auto">
      <div
        className="flex gap-10 flex-wrap justify-center
      "
      >
        {users.map((user: User) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
