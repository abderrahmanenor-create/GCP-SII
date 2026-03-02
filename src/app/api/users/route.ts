import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

// Fonction GET : Pour lire la liste des utilisateurs
export async function GET() {
  try {
    const users = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        nom: true,
        prenom: true,
        matricule: true,
        role: true,
        // On ne sélectionne pas le mot de passe pour la liste
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// Fonction POST : Pour ajouter un utilisateur
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nom, prenom, email, password, role, statut, matricule, cin, cnss, tauxHoraire } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        nom,
        prenom,
        email,
        password: hashedPassword,
        role,
        statut,
        matricule,
        cin,
        cnss,
        tauxHoraire,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}