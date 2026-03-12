import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET : récupère les statuts de la veille pour pré-remplir
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) return NextResponse.json([]);

    // Cherche la dernière fiche disponible avant cette date
    const dateObj = new Date(date);
    const today = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());

    const veille = await db.presenceJournaliere.findMany({
      where: {
        date: { lt: today },
      },
      orderBy: { date: "desc" },
      distinct: ["userId"],
      select: {
        userId: true,
        statut: true,
        heureArrivee: true,
        heureDepart: true,
      },
    });

    return NextResponse.json(veille);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}