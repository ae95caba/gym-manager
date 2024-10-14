"use server";

import { revalidateTag } from "next/cache";

import { BASE_API_URL } from "@/libs/constants";
import { redirect } from "next/navigation";
import { rethrowIfRedirectError } from "@/libs/functions";

export default async function createUser(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const surname = formData.get("surname") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const age = formData.get("age") as string;

  const options = {
    method: "POST",
    body: JSON.stringify({
      name,
      surname,
      phone,
      address,
      age,
    }),
    headers: { "Content-Type": "application/json" },
  };

  try {
    const res = await fetch(`${BASE_API_URL}/api/users`, options);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "An error occurred");
    }
    const data = await res.json();
    revalidateTag("users"); // Revalidate the users tag
    // On success, append status=success to the URL
    redirect(`/alta?status=success`);
    return data; // Return the response data
  } catch (error) {
    rethrowIfRedirectError(error); //redirect will always throw and error called NEXT_REDIRECT
    console.log(
      `error: ${
        error instanceof Error ? error.message : "An unexpected error occurred"
      }`
    );

    const errorMessage = encodeURIComponent(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
    // Redirect to the error page with the error message
    redirect(`/alta?status=error&message=${errorMessage}`);
  }
}
