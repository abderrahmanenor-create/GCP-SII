import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mois = parseInt(searchParams.get("mois") || `${new Date().getMonth() + 1}`);
    const annee = parseInt(searchParams.get("annee") || `${new Date().getFullYear()}`);

    const debut = new Date(annee, mois - 1, 1);
    const fin = new Date(annee, mois, 1);

    const presences = await db.presenceJournaliere.findMany({
      where: { date: { gte: debut, lt: fin } },
      include: {
        user: {
          select: {
            id: true, nom: true, prenom: true,
            matricule: true, poste: { select: { nom: true } },
          },
        },
      },
      orderBy: [{ user: { nom: "asc" } }, { date: "asc" }],
    });

    // Grouper par ouvrier
    const parOuvrier: Record<string, any> = {};
    presences.forEach(p => {
      if (!parOuvrier[p.userId]) {
        parOuvrier[p.userId] = {
          user: p.user,
          jours: {},
          stats: { present: 0, absent: 0, retard: 0, conge: 0, mission: 0, maladie: 0 },
        };
      }
      const jour = new Date(p.date).getDate();
      parOuvrier[p.userId].jours[jour] = {
        statut: p.statut,
        heureArrivee: p.heureArrivee,
        heureDepart: p.heureDepart,
      };
      const s = p.statut.toLowerCase().replace("arret_maladie", "maladie").replace("valide_chef", "present").replace("valide_rh", "present");
      if (parOuvrier[p.userId].stats[s] !== undefined) {
        parOuvrier[p.userId].stats[s]++;
      }
    });

    // Jours ouvrés du mois
    const joursOuvres: number[] = [];
    const cur = new Date(debut);
    while (cur < fin) {
      const dow = cur.getDay();
      if (dow !== 0 && dow !== 6) joursOuvres.push(cur.getDate());
      cur.setDate(cur.getDate() + 1);
    }

    return NextResponse.json({
      mois, annee,
      joursOuvres,
      ouvriers: Object.values(parOuvrier),
      totalPresences: presences.filter(p => p.statut === "PRESENT").length,
      totalAbsences: presences.filter(p => p.statut === "ABSENT").length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}