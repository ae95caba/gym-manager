import React from "react";
import { BASE_API_URL } from "@/libs/constants";
import UserCard from "./UserCard";
import type { User } from "@prisma/client";

export async function getLastUserSession(id: number) {
  try {
    const res = await fetch(
      `${BASE_API_URL}/api/sessions?userId=${id}&last=true`,
      {
        next: { tags: ["userLastSession"] },
      }
    );
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "An error occurred"); // Throw an error with the response message
    }
    const data = await res.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      // Handle specific error types if needed
    } else {
      console.log("An unexpected error occurred");
    }
  }
}

export default async function UserCardWithOnsiteStatus({
  user,
}: {
  user: User;
}) {
  const lastUserSession = await getLastUserSession(user.id);
  const onsite = lastUserSession && !lastUserSession.endTime;
  return (
    <div>
      <UserCard user={user}>
        {onsite === undefined ? (
          <p>Cargando ...</p>
        ) : onsite ? (
          <p className="text-green-500">Esta en el gym</p>
        ) : (
          <p className="text-red-500">No esta en el gym</p>
        )}
      </UserCard>
    </div>
  );
}
