import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET : Liste des présences du jour par zone
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
    const zoneId = searchParams.get("zoneId");

    const dateDebut = new Date(date);
    dateDebut.setHours(0, 0, 0, 0);
    const dateFin = new Date(date);
    dateFin.setHours(23, 59, 59, 999);

    const presences = await db.presenceSite.findMany({
      where: {
        date: { gte: dateDebut, lte: dateFin },
        ...(zoneId && { zoneId }),
      },
      include: {
        user: {
          select: {
            id: true, nom: true, prenom: true,
            matricule: true, photoUrl: true, poste: true,
          },
        },
        zone: { select: { id: true, nom: true } },
      },
      orderBy: { user: { nom: "asc" } },
    });

    return NextResponse.json(presences);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST : Créer ou mettre à jour une présence
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, date, statut, heureArrivee, heureDepart, motifAbsence, note, zoneId } = body;

    const dateObj = new Date(date);
    dateObj.setHours(12, 0, 0, 0);

    const presence = await db.presenceSite.upsert({
      where: { userId_date: { userId, date: dateObj } },
      update: { statut, heureArrivee, heureDepart, motifAbsence, note, zoneId },
      create: { userId, date: dateObj, statut, heureArrivee, heureDepart, motifAbsence, note, zoneId },
      include: {
        user: { select: { id: true, nom: true, prenom: true, matricule: true } },
      },
    });

    return NextResponse.json(presence);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH : Valider les présences du jour
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { ids, valideParId } = body;

    await db.presenceSite.updateMany({
      where: { id: { in: ids } },
      data: { valide: true, valideParId },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}