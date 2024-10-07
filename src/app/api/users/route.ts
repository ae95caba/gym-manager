import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";
export async function GET() {
  console.log("get users");
  const users = await prisma.user.findMany();

  return NextResponse.json(users, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, subname, phone, adress, age } = body;

    const newUser = await prisma.user.create({
      data: { name, subname, phone, adress, age },
    });
    return NextResponse.json(newUser);
  } catch (error) {
    let statusCode = 500;
    if (error instanceof Prisma.PrismaClientValidationError) {
      statusCode = 400;
    }
    return NextResponse.json({ error: error.message }, { status: statusCode });
  }
}
