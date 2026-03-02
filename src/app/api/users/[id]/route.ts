import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Correction Next.js 16 : params est maintenant une Promise
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // On doit attendre (await) les params
    const { id } = await params;

    const user = await db.user.findUnique({
      where: { id: id }, // On utilise l'id récupéré
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