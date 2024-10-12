import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";

// Endpoint para registrar el fin de una sesión (logout)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the user ID from params
    const userId = +params.id; // Assuming params.id is the user ID

    // Retrieve the last session for the user
    const lastSession = await prisma.session.findFirst({
      where: { userId: userId, endTime: null },
      orderBy: { startTime: "desc" }, // Assuming startTime determines the last session
    });

    if (!lastSession) {
      return NextResponse.json(
        { error: "No active session found for this user." },
        { status: 404 }
      );
    }

    // Update the last session with the endTime
    const updatedSession = await prisma.session.update({
      where: { id: lastSession.id }, // Update by session ID
      data: { endTime: new Date() },
    });

    return NextResponse.json(updatedSession);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedSession = await prisma.session.delete({
      where: { id: +params.id },
    });

    return NextResponse.json(deletedSession);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await prisma.session.findUnique({
    where: { id: +params.id },
  });
  if (!session) {
    return NextResponse.json("Session not found", { status: 404 });
  }
  return NextResponse.json(session);
}
