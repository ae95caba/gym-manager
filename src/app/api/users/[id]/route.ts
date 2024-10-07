import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
export async function GET(request, { params }) {
  const user = await prisma.user.findUnique({ where: { id: +params.id } });
  if (!user) {
    return NextResponse.json("User not found", { status: 404 });
  }
  return NextResponse.json(user);
}

export async function PUT(request, { params }) {
  const body = await request.json();
  const updatedUser = await prisma.user.update({
    where: { id: +params.id },
    data: body,
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(request, { params }) {
  try {
    const deletedUser = await prisma.user.delete({ where: { id: +params.id } });

    return NextResponse.json(deletedUser);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
