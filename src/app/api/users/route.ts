import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const isOnsiteQuery = searchParams.get("onsite");

  let users;

  if (isOnsiteQuery) {
    // Query users who have at least one active session (endTime is null)
    users = await prisma.user.findMany({
      where: {
        sessions: {
          some: {
            endTime: null, // Filters users who have an active session
          },
        },
      },
      include: {
        sessions: true, // Include all sessions (optional)
      },
    });
  } else {
    // If no "online" query parameter is present, return all users
    users = await prisma.user.findMany({
      include: { sessions: true }, // Optional: include sessions to view related data
    });
  }

  return NextResponse.json(users, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, surname, phone, address, age } = body;

    const newUser = await prisma.user.create({
      data: {
        name,
        surname,
        phone,
        address,
        age: +age,
        membershipExpiry: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000), //31 days from now
      },
    });
    return NextResponse.json(newUser);
  } catch (error) {
    let statusCode = 500;
    if (error instanceof Prisma.PrismaClientValidationError) {
      statusCode = 400;
    }
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: statusCode });
  }
}
