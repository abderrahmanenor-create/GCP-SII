import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";

// Fonction pour AJOUTER un ouvrier (POST)
export async function POST(req: Request) {
  try {
    // 1. Vérifier si l'utilisateur est connecté (Sécurité)
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    // 2. Récupérer les données envoyées
    const body = await req.json();
    const { firstName, lastName, matricule, skills } = body;

    // 3. Créer l'ouvrier dans la base Neon
    const newWorker = await db.worker.create({
      data: {
        firstName,
        lastName,
        matricule: matricule || null,
        skills: skills || [],
      },
    });

    return NextResponse.json(newWorker, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// Fonction pour VOIR les ouvriers (GET)
export async function GET() {
  try {
    const workers = await db.worker.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(workers);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}