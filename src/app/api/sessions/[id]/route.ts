import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

// Endpoint para registrar el fin de una sesión (logout)
export async function PUT(request, { params }) {
  try {
    // Actualiza la sesión con el tiempo de fin (logout)
    const updatedSession = await prisma.session.update({
      where: { id: +params.id },
      data: { endTime: new Date() },
    });

    return NextResponse.json(updatedSession);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
