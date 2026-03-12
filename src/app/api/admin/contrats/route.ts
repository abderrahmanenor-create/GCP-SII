import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const contrats = await db.contrat.findMany({
      include: {
        client: { select: { id: true, nom: true, type: true } },
        _count: { select: { projets: true, factures: true } }
      },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(contrats);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      numero, objet, budget, dateDebut, dateFin,
      statut, validationRequise, clientId
    } = body;

    if (!numero || !objet || !clientId || !dateDebut) {
      return NextResponse.json(
        { error: "Numéro, objet, client et date début obligatoires" },
        { status: 400 }
      );
    }

    const contrat = await db.contrat.create({
      data: {
        numero,
        objet,
        budget: parseFloat(budget) || 0,
        dateDebut: new Date(dateDebut),
        dateFin: dateFin ? new Date(dateFin) : null,
        statut: statut || "ACTIF",
        validationRequise: validationRequise ?? true,
        clientId
      },
      include: {
        client: { select: { id: true, nom: true } }
      }
    });

    return NextResponse.json(contrat);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const {
      id, numero, objet, budget, dateDebut,
      dateFin, statut, validationRequise, clientId
    } = body;

    const contrat = await db.contrat.update({
      where: { id },
      data: {
        numero,
        objet,
        budget: parseFloat(budget) || 0,
        dateDebut: new Date(dateDebut),
        dateFin: dateFin ? new Date(dateFin) : null,
        statut,
        validationRequise,
        clientId
      },
      include: {
        client: { select: { id: true, nom: true } }
      }
    });

    return NextResponse.json(contrat);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}