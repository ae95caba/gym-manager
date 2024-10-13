import React from "react";

import UserList from "@/components/UserList";
import { BASE_API_URL } from "@/libs/constants";
async function fetchOnsiteUsers() {
  const res = await fetch(`${BASE_API_URL}/api/users?onsite=true`, {
    cache: "no-store", // Ensures the data is fetched fresh on every request
  });

  const data = await res.json();
  return data;
}

export default async function Entrenando() {
  if (!BASE_API_URL) {
    return null;
  }
  const onsiteUsers = await fetchOnsiteUsers();
  return <UserList users={onsiteUsers} />;
}
