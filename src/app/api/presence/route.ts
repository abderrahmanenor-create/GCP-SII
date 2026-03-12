import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET : liste fiches ou fiche d'une date
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const mois = searchParams.get("mois");
    const annee = searchParams.get("annee");
    const userId = searchParams.get("userId");

    const where: any = {};
    if (userId) where.userId = userId;

    if (date) {
      const d = new Date(date);
      where.date = {
        gte: new Date(d.getFullYear(), d.getMonth(), d.getDate()),
        lt: new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1),
      };
    } else if (mois && annee) {
      where.date = {
        gte: new Date(parseInt(annee), parseInt(mois) - 1, 1),
        lt: new Date(parseInt(annee), parseInt(mois), 1),
      };
    }

    const presences = await db.presenceJournaliere.findMany({
      where,
      include: {
        user: {
          select: {
            id: true, nom: true, prenom: true,
            matricule: true, photoUrl: true,
            poste: { select: { nom: true } },
          },
        },
      },
      orderBy: [{ date: "desc" }, { user: { nom: "asc" } }],
    });

    return NextResponse.json(presences);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST : sauvegarder appel du jour (upsert)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, lignes } = body;

    if (!date || !lignes?.length) {
      return NextResponse.json({ error: "Date et lignes obligatoires" }, { status: 400 });
    }

    const dateObj = new Date(date);
    const debut = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());

    const results = await Promise.all(
      lignes.map(async (l: any) => {
        return db.presenceJournaliere.upsert({
          where: { userId_date: { userId: l.userId, date: debut } },
          create: {
            userId: l.userId,
            date: debut,
            statut: l.statut || "PRESENT",
            heureArrivee: l.heureArrivee || null,
            heureDepart: l.heureDepart || null,
            remarque: l.remarque || null,
            statutFiche: "BROUILLON",
          },
          update: {
            statut: l.statut || "PRESENT",
            heureArrivee: l.heureArrivee || null,
            heureDepart: l.heureDepart || null,
            remarque: l.remarque || null,
            statutFiche: "BROUILLON",
          },
        });
      })
    );

    return NextResponse.json(results, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH : validation chef ou RH
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, action, valideurId } = body;

    if (!date || !action) {
      return NextResponse.json({ error: "Date et action obligatoires" }, { status: 400 });
    }

    const dateObj = new Date(date);
    const debut = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
    const fin = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + 1);

    let updateData: any = {};
    if (action === "VALIDER_CHEF") {
      updateData = {
        statutFiche: "VALIDE_CHEF",
        valideChefId: valideurId,
        dateValideChef: new Date(),
      };
    } else if (action === "VALIDER_RH") {
      updateData = {
        statutFiche: "VALIDE_RH",
        valideRHId: valideurId,
        dateValideRH: new Date(),
      };
    }

    await db.presenceJournaliere.updateMany({
      where: { date: { gte: debut, lt: fin } },
      data: updateData,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}