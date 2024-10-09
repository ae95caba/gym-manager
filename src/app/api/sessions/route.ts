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

    console.log("linea 10");
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
