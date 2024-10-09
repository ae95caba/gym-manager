import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  const sessions = await prisma.session.findMany();
  return NextResponse.json(sessions, {
    headers: { "Cache-Control": "no-store" },
  });
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
