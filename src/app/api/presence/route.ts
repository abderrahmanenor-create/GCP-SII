import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

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
      const debut = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const fin = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
      where.date = { gte: debut, lt: fin };
    } else if (mois && annee) {
      const debut = new Date(parseInt(annee), parseInt(mois) - 1, 1);
      const fin = new Date(parseInt(annee), parseInt(mois), 1);
      where.date = { gte: debut, lt: fin };
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, lignes } = body;

    if (!date || !lignes?.length) {
      return NextResponse.json({ error: "Date et lignes obligatoires" }, { status: 400 });
    }

    const dateObj = new Date(date);
    const debut = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());

    // Upsert chaque ligne
    const results = await Promise.all(
      lignes.map(async (l: any) => {
        return db.presenceJournaliere.upsert({
          where: {
            userId_date: {
              userId: l.userId,
              date: debut,
            },
          },
          create: {
            userId: l.userId,
            date: debut,
            statut: l.statut || "PRESENT",
            heureArrivee: l.heureArrivee || null,
            heureDepart: l.heureDepart || null,
            remarque: l.remarque || null,
          },
          update: {
            statut: l.statut || "PRESENT",
            heureArrivee: l.heureArrivee || null,
            heureDepart: l.heureDepart || null,
            remarque: l.remarque || null,
          },
        });
      })
    );

    return NextResponse.json(results, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}