import React from "react";
import UserCard from "@/components/UserCard";
async function fetchOnsiteUsers() {
  const res = await fetch(`http://localhost:3000/api/users?onsite=true`);

  const data = await res.json();
  return data;
}

export default async function Entrenando() {
  const onsiteUsers = await fetchOnsiteUsers();
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-3 gap-3 mt-10">
        {onsiteUsers.map((user) => (
          <UserCard key={user.key} user={user} />
        ))}
      </div>
    </div>
  );
}
