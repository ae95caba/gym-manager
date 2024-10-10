import React from "react";

export async function getUser(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/users/${id}`);

    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.error || "An error occurred"); // Throw an error with the response message
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
}
export default async function User({ params }) {
  const user = await getUser(params.id);
  return <div>User : {user.name} </div>;
}
