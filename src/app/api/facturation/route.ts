import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Générer numéro facture auto : FAC-2026-0001
async function genererNumero(): Promise<string> {
  const annee = new Date().getFullYear();
  const derniere = await db.facture.findFirst({
    where: { numero: { startsWith: `FAC-${annee}-` } },
    orderBy: { createdAt: "desc" },
  });
  let seq = 1;
  if (derniere) {
    const parts = derniere.numero.split("-");
    seq = parseInt(parts[2]) + 1;
  }
  return `FAC-${annee}-${seq.toString().padStart(4, "0")}`;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get("clientId") || "";
    const statut = searchParams.get("statut") || "";

    const where: any = {};
    if (clientId) where.clientId = clientId;
    if (statut) where.statut = statut;

    const factures = await db.facture.findMany({
      where,
      include: {
        client: { select: { id: true, nom: true } },
        feuilles: {
          select: {
            id: true, date: true, totalGeneral: true, totalHeures: true,
            zone: { select: { nom: true, projet: { select: { nom: true, code: true } } } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(factures);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientId, feuilleIds, tauxTVA, tauxRetenue, dateEcheance, notes } = body;

    if (!clientId || !feuilleIds?.length) {
      return NextResponse.json({ error: "Client et feuilles obligatoires" }, { status: 400 });
    }

    // Récupérer les feuilles
    const feuilles = await db.feuilleRegie.findMany({
      where: { id: { in: feuilleIds } },
    });

    if (feuilles.some(f => f.statut !== "VALIDE_CLIENT")) {
      return NextResponse.json({ error: "Toutes les feuilles doivent être validées client" }, { status: 400 });
    }

    if (feuilles.some(f => f.factureId)) {
      return NextResponse.json({ error: "Certaines feuilles sont déjà facturées" }, { status: 400 });
    }

    // Calculs
    const totalHT = feuilles.reduce((sum, f) => sum + f.totalGeneral, 0);
    const tva = parseFloat(tauxTVA) || 20;
    const retenue = parseFloat(tauxRetenue) || 0;
    const montantTVA = totalHT * (tva / 100);
    const totalTTC = totalHT + montantTVA;
    const montantRetenue = totalTTC * (retenue / 100);
    const netAPayer = totalTTC - montantRetenue;

    const numero = await genererNumero();

    const facture = await db.facture.create({
      data: {
        numero,
        clientId,
        totalHT,
        tauxTVA: tva,
        montantTVA,
        tauxRetenue: retenue,
        montantRetenue,
        totalTTC,
        netAPayer,
        dateEcheance: dateEcheance ? new Date(dateEcheance) : null,
        notes: notes || null,
        feuilles: { connect: feuilleIds.map((id: string) => ({ id })) },
      },
      include: {
        client: true,
        feuilles: {
          include: {
            lignes: {
              include: {
                user: { include: { poste: true } },
              },
            },
            affectationsMat: {
              include: { materiel: true },
            },
            zone: {
              include: { projet: { include: { contrat: true } } },
            },
          },
        },
      },
    });

    return NextResponse.json(facture, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, statut, notes, dateEcheance, tauxRetenue, tauxTVA } = body;

    if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });

    const current = await db.facture.findUnique({ where: { id } });
    if (!current) return NextResponse.json({ error: "Facture non trouvée" }, { status: 404 });

    const data: any = {};
    if (statut) data.statut = statut;
    if (notes !== undefined) data.notes = notes;
    if (dateEcheance) data.dateEcheance = new Date(dateEcheance);

    // Recalcul si taux changés
    if (tauxTVA !== undefined || tauxRetenue !== undefined) {
      const tva = tauxTVA !== undefined ? parseFloat(tauxTVA) : current.tauxTVA;
      const retenue = tauxRetenue !== undefined ? parseFloat(tauxRetenue) : current.tauxRetenue;
      const montantTVA = current.totalHT * (tva / 100);
      const totalTTC = current.totalHT + montantTVA;
      const montantRetenue = totalTTC * (retenue / 100);
      data.tauxTVA = tva;
      data.montantTVA = montantTVA;
      data.tauxRetenue = retenue;
      data.montantRetenue = montantRetenue;
      data.totalTTC = totalTTC;
      data.netAPayer = totalTTC - montantRetenue;
    }

    const facture = await db.facture.update({
      where: { id },
      data,
      include: { client: true, feuilles: true },
    });

    return NextResponse.json(facture);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });

    // Délier les feuilles avant suppression
    await db.feuilleRegie.updateMany({
      where: { factureId: id },
      data: { factureId: null },
    });

    await db.facture.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}