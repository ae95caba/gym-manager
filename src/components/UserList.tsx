import React from "react";

import UserCardWithOnsiteStatus from "./UserCardWithOnsiteStatus";
import type { User } from "@prisma/client";
export default function UserList({ users }: { users: User[] }) {
  return (
    <div className="container mx-auto">
      <div
        className="flex gap-10 flex-wrap justify-center
    "
      >
        {users.map((user: User) => (
          <UserCardWithOnsiteStatus key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
