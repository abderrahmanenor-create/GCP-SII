import { NextResponse } from "next/server";
import { db } from "@/lib/db";

function calculerDatePeremption(dateMiseEnService: Date, dureeVieAns: number | null): Date | null {
  if (!dureeVieAns) return null;
  const date = new Date(dateMiseEnService);
  date.setFullYear(date.getFullYear() + dureeVieAns);
  return date;
}

function calculerProchVGP(dateMiseEnService: Date, vgpPeriodeMois: number | null): Date | null {
  if (!vgpPeriodeMois) return null;
  const date = new Date(dateMiseEnService);
  date.setMonth(date.getMonth() + vgpPeriodeMois);
  return date;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const epiId = searchParams.get("epiId");
    const statut = searchParams.get("statut");
    const alertes = searchParams.get("alertes");

    const where: any = {};
    if (userId) where.userId = userId;
    if (epiId) where.epiId = epiId;
    if (statut) where.statut = statut;

    // Filtre alertes : EPI périmés ou VGP dépassée
    if (alertes === "true") {
      const now = new Date();
      where.statut = "ACTIF";
      where.OR = [
        { datePeremption: { lte: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) } },
        { dateProchVGP: { lte: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) } },
      ];
    }

    const distributions = await db.distributionEPI.findMany({
      where,
      include: {
        epi: {
          select: {
            id: true, nom: true, reference: true, norme: true,
            categorieSec: true, vgpRequise: true, dureeVieAns: true
          }
        },
        user: {
          select: {
            id: true, nom: true, prenom: true, matricule: true,
            poste: { select: { nom: true } }
          }
        }
      },
      orderBy: { date: "desc" }
    });

    return NextResponse.json(distributions);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { epiId, userId, quantite, etat, taille, dateMiseEnService, remarque } = body;

    if (!epiId || !userId) {
      return NextResponse.json({ error: "EPI et employé obligatoires" }, { status: 400 });
    }

    const epi = await db.ePI.findUnique({ where: { id: epiId } });
    if (!epi) return NextResponse.json({ error: "EPI non trouvé" }, { status: 404 });

    if (epi.stockActuel < (parseInt(quantite) || 1)) {
      return NextResponse.json({ error: "Stock insuffisant" }, { status: 400 });
    }

    const dateService = dateMiseEnService ? new Date(dateMiseEnService) : new Date();
    const datePeremption = epi.datePeremption ||
      calculerDatePeremption(dateService, epi.dureeVieAns);
    const dateProchVGP = epi.vgpRequise ?
      calculerProchVGP(dateService, epi.vgpPeriodeMois) : null;

    const distribution = await db.distributionEPI.create({
      data: {
        epiId,
        userId,
        quantite: parseInt(quantite) || 1,
        etat: etat || "NEUF",
        taille: taille || null,
        dateMiseEnService: dateService,
        datePeremption,
        dateProchVGP,
        remarque: remarque || null,
        statut: "ACTIF",
      },
      include: {
        epi: { select: { id: true, nom: true, norme: true, categorieSec: true } },
        user: { select: { id: true, nom: true, prenom: true, matricule: true } }
      }
    });

    // Décrémenter stock
    await db.ePI.update({
      where: { id: epiId },
      data: { stockActuel: { decrement: parseInt(quantite) || 1 } }
    });

    // Mouvement sortie
    await db.mouvementEPI.create({
      data: {
        type: "SORTIE",
        quantite: parseInt(quantite) || 1,
        motif: `Distribution à ${userId}`,
        epiId,
      }
    });

    return NextResponse.json(distribution);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, action, motifReforme, dateDerniereVGP, dateProchVGP } = body;

    if (action === "RETOUR") {
      const dist = await db.distributionEPI.update({
        where: { id },
        data: { statut: "RETOURNE", dateRetour: new Date() },
        include: { epi: true }
      });
      await db.ePI.update({
        where: { id: dist.epiId },
        data: { stockActuel: { increment: dist.quantite } }
      });
      await db.mouvementEPI.create({
        data: { type: "RETOUR", quantite: dist.quantite, motif: "Retour EPI", epiId: dist.epiId }
      });
      return NextResponse.json(dist);
    }

    if (action === "REFORME") {
      const dist = await db.distributionEPI.update({
        where: { id },
        data: { statut: "REFORME", motifReforme: motifReforme || "Réformé", dateRetour: new Date() },
      });
      await db.mouvementEPI.create({
        data: { type: "PERTE", quantite: 1, motif: motifReforme || "Réforme EPI", epiId: dist.epiId }
      });
      return NextResponse.json(dist);
    }

    if (action === "VGP") {
      const dist = await db.distributionEPI.update({
        where: { id },
        data: {
          dateDerniereVGP: dateDerniereVGP ? new Date(dateDerniereVGP) : new Date(),
          dateProchVGP: dateProchVGP ? new Date(dateProchVGP) : null,
        }
      });
      return NextResponse.json(dist);
    }

    return NextResponse.json({ error: "Action inconnue" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}