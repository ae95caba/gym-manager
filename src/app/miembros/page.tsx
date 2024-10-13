import React from "react";
import UserCard from "@/components/UserCard";
import type { User } from "@prisma/client";
import { BASE_API_URL } from "@/libs/constants";
async function fetchUsers() {
  console.log(BASE_API_URL);
  const res = await fetch(`${BASE_API_URL}/api/users`);
  console.log(res);
  const data = await res.json();
  return data;
}

export default async function Miembros() {
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
