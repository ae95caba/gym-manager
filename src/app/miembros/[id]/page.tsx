import React from "react";

async function getUser(id) {
  const res = await fetch(`http://localhost:3000/api/users/${id}`);

  const data = await res.json();

  return data;
}
export default async function User({ params }) {
  const user = await getUser(params.id);
  return <div>User : {user.name} </div>;
}
