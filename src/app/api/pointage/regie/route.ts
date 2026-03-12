import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET : Liste des feuilles de régie
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const zoneId = searchParams.get("zoneId");
    const mois = searchParams.get("mois");
    const annee = searchParams.get("annee");
    const statut = searchParams.get("statut");

    const feuilles = await db.feuilleRegie.findMany({
      where: {
        ...(zoneId && { zoneId }),
        ...(mois && { mois: parseInt(mois) }),
        ...(annee && { annee: parseInt(annee) }),
        ...(statut && { statut }),
      },
      include: {
        zone: { select: { id: true, nom: true, projet: { select: { nom: true, code: true } } } },
        lignes: { include: { user: { select: { id: true, nom: true, prenom: true, matricule: true } } } },
        affectationsMat: { include: { materiel: { select: { id: true, nom: true, code: true, prixLocationJour: true } } } },
      },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(feuilles);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST : Créer une feuille de régie
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { date, zoneId, lignes, affectationsMat } = body;

    const dateObj = new Date(date);
    const semaine = getWeekNumber(dateObj);
    const mois = dateObj.getMonth() + 1;
    const annee = dateObj.getFullYear();

    // Calcul totaux
    let totalHeures = 0;
    let totalCoutMO = 0;
    let totalCoutMat = 0;

    const lignesData = (lignes || []).map((l: any) => {
      const montant = l.heures * l.tauxHoraire;
      totalHeures += l.heures;
      totalCoutMO += montant;
      return { ...l, montant };
    });

    const matData = (affectationsMat || []).map((m: any) => {
      const montant = m.joursFactures * (m.prixLocationJour || 0);
      totalCoutMat += montant;
      return { ...m, montant };
    });

    const totalGeneral = totalCoutMO + totalCoutMat;

    const feuille = await db.feuilleRegie.create({
      data: {
        date: dateObj,
        semaine,
        mois,
        annee,
        zoneId,
        totalHeures,
        totalCoutMO,
        totalCoutMat,
        totalGeneral,
        lignes: { create: lignesData },
        affectationsMat: { create: matData },
      },
      include: {
        zone: true,
        lignes: { include: { user: true } },
        affectationsMat: { include: { materiel: true } },
      },
    });

    return NextResponse.json(feuille);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}