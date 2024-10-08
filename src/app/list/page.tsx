import React from "react";

async function fetchUsers() {
  const res = await fetch(`http://localhost:3000/api/users`);

  const data = await res.json();
  return data;
}

export default async function List() {
  const users = await fetchUsers();
  console.log(users);
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
