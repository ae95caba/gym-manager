import React from "react";

import { BASE_API_URL } from "@/libs/constants";
import UserList from "@/components/UserList";
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
  return <UserList users={users} />;
}
