import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

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
        statut: true,
        photoUrl: true,
        poste: { select: { nom: true } },
        equipe: { select: { nom: true } },
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      nom, prenom, email, password, role, statut,
      matricule, cin, cnss, tauxHoraire, telephone,
      posteId, typeContratId, salaireBase,
      indemniteTransport, autreIndemnite,
      dateDebutContrat, dateFinContrat,
    } = body;

    const hashedPassword = await bcrypt.hash(password || "Chantier2024!", 10);

    const user = await db.user.create({
      data: {
        nom,
        prenom,
        email,
        password: hashedPassword,
        role: role || "OUVRIER",
        statut: statut || "ACTIF",
        matricule: matricule || null,
        cin: cin || null,
        cnss: cnss || null,
        telephone: telephone || null,
        tauxHoraire: tauxHoraire || null,
        salaireBase: salaireBase || null,
        indemniteTransport: indemniteTransport || null,
        autreIndemnite: autreIndemnite || null,
        posteId: posteId || null,
        typeContratId: typeContratId || null,
        dateDebutContrat: dateDebutContrat ? new Date(dateDebutContrat) : null,
        dateFinContrat: dateFinContrat ? new Date(dateFinContrat) : null,
      },
      select: {
        id: true,
        nom: true,
        prenom: true,
        matricule: true,
        role: true,
        statut: true,
        photoUrl: true,
        poste: { select: { nom: true } },
        equipe: { select: { nom: true } },
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}