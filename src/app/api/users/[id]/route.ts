import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await db.user.findUnique({
      where: { id: params.id },
      include: {
        habilitations: true,
        epiDistribues: {
          include: { epi: true }
        }
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}