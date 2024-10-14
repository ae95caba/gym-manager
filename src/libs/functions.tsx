// lib/userService.ts
import type { User } from "@prisma/client";
import { BASE_API_URL } from "./constants";
import { isRedirectError } from "next/dist/client/components/redirect";
export async function getUser(id: string): Promise<User | undefined> {
  try {
    const res = await fetch(`${BASE_API_URL}/api/users/${id}`);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "An error occurred");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    const errorMessage =
      (error as Error).message || "An unexpected error occurred";
    console.log(errorMessage);
    alert(errorMessage);
  }
}

export function formattedDate(date: string | number | Date): string {
  return new Date(date).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function rethrowIfRedirectError(error: unknown) {
  if (isRedirectError(error)) {
    throw error;
  }
}
