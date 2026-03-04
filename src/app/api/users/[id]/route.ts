import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const user = await db.user.findUnique({
      where: { id },
      include: {
        poste: true,
        typeContrat: true,
        equipe: true,
        societe: true,
        habilitations: {
          include: { type: true },
          orderBy: { dateFin: "asc" },
        },
        epiDistribues: {
          include: { epi: true },
          orderBy: { date: "desc" },
        },
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

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const {
      nom,
      prenom,
      email,
      telephone,
      matricule,
      cin,
      cnss,
      role,
      statut,
      tauxHoraire,
      salaireBase,
      indemniteTransport,
      autreIndemnite,
      dateDebutContrat,
      dateFinContrat,
      posteId,
      typeContratId,
      equipeId,
      societeId,
    } = body;

    const user = await db.user.update({
      where: { id },
      data: {
        nom,
        prenom,
        email,
        telephone,
        matricule: matricule || null,
        cin: cin || null,
        cnss: cnss || null,
        role,
        statut,
        tauxHoraire: tauxHoraire || null,
        salaireBase: salaireBase || null,
        indemniteTransport: indemniteTransport || null,
        autreIndemnite: autreIndemnite || null,
        dateDebutContrat: dateDebutContrat ? new Date(dateDebutContrat) : null,
        dateFinContrat: dateFinContrat ? new Date(dateFinContrat) : null,
        posteId: posteId || null,
        typeContratId: typeContratId || null,
        equipeId: equipeId || null,
        societeId: societeId || null,
      },
      include: {
        poste: true,
        typeContrat: true,
        equipe: true,
        societe: true,
        habilitations: { include: { type: true } },
        epiDistribues: { include: { epi: true } },
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    await db.user.update({
      where: { id },
      data: { statut: "INACTIF" },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}