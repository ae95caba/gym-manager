import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request) {
  // Retrieve query parameters from the request URL
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId"); // Get the userId from the query parameters
  const last = searchParams.get("last"); // Check if the "last" parameter is present

  let sessions;
  try {
    // Check if the userId parameter is provided
    if (userId) {
      // If "last" is present, retrieve only the most recent session
      if (last) {
        sessions = await prisma.session.findFirst({
          where: { userId: parseInt(userId, 10) },
          orderBy: { startTime: "desc" }, // Order by startTime in descending order to get the last session
        });
      } else {
        // Retrieve all sessions for the user if "last" is not specified
        sessions = await prisma.session.findMany({
          where: { userId: parseInt(userId, 10) },
          orderBy: { startTime: "desc" }, // Optional: Order sessions by startTime
        });
      }
    } else {
      // If no userId is provided, retrieve all sessions
      sessions = await prisma.session.findMany();
    }

    return NextResponse.json(sessions, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Endpoint para registrar el inicio de una sesión (login)
export async function POST(request) {
  try {
    const body = await request.json();
    const { userId } = body;

    // Check if the user already has an active session (without endTime)
    const activeSession = await prisma.session.findFirst({
      where: {
        userId: +userId,
        endTime: null, // Active session has no endTime
      },
    });

    if (activeSession) {
      return NextResponse.json(
        { error: "User already has an active session." },
        { status: 400 } // Bad request
      );
    }

    // Crea una nueva sesión con el tiempo de inicio (login)
    const newSession = await prisma.session.create({
      data: {
        userId: +userId,
        startTime: new Date(),
      },
    });

    return NextResponse.json(newSession);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
