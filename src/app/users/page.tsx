import React from "react";
import UserCard from "@/components/UserCard";
async function fetchUsers() {
  const res = await fetch(`http://localhost:3000/api/users`);

  const data = await res.json();
  return data;
}

export default async function Users() {
  const users = await fetchUsers();
  console.log(users);
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-3 gap-3 mt-10">
        {users.map((user) => (
          <UserCard key={user.key} user={user} />
        ))}
      </div>
    </div>
  );
}
