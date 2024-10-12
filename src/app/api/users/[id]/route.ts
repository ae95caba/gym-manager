import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
export async function GET(
  request: NextRequest,
  { params }: { params: { [key: string]: string } }
) {
  const user = await prisma.user.findUnique({ where: { id: +params.id } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { [key: string]: string } }
) {
  const body = await request.json();
  const updatedUser = await prisma.user.update({
    where: { id: +params.id },
    data: body,
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { [key: string]: string } }
) {
  try {
    const deletedUser = await prisma.user.delete({ where: { id: +params.id } });

    return NextResponse.json(deletedUser);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
