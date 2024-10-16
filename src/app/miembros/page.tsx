import React from "react";
import { BASE_API_URL } from "@/libs/constants";
import UserList from "@/components/UserList";
import { revalidateUsers } from "@/libs/ServerActions";
async function fetchUsers() {
  const res = await fetch(`${BASE_API_URL}/api/users`, {
    next: { tags: ["users"] },
  });

  const data = await res.json();
  return data;
}

export default async function Miembros() {
  if (!BASE_API_URL) {
    return null;
  }
  const users = await fetchUsers();

  return (
    <div>
      <UserList users={users} />
      <form
        action={revalidateUsers}
        className="flex items-center justify-between"
      >
        <button>revalidate</button>
      </form>
    </div>
  );
}
