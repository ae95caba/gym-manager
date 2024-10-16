import React from "react";
import { BASE_API_URL } from "@/libs/constants";
import UserCard from "./UserCard";
import type { User } from "@prisma/client";
import OnsiteStatus from "./OnsiteStatus";

export async function getLastUserSession(id: number) {
  try {
    const res = await fetch(
      `${BASE_API_URL}/api/sessions?userId=${id}&last=true`,
      {
        next: { tags: ["session"] },
      }
    );
    /*     console.log(`------------------------------------`);
    console.log(`fetching last user session in "user card"`); */

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "An error occurred"); // Throw an error with the response message
    }
    const data = await res.json();
    /*     console.log(data.endTime);
    console.log(`------------------------------------`); */
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
        <OnsiteStatus onsite={onsite} />
      </UserCard>
    </div>
  );
}
