import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const tarifs = await db.tarifContrat.findMany({
      where: { contratId: params.id },
      include: {
        poste: { select: { id: true, nom: true } },
        materiel: { select: { id: true, nom: true, code: true } },
      },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(tarifs);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { type, posteId, materielId, tauxFacture, tauxRevient, unite } = body;

    if (!type || !tauxFacture) {
      return NextResponse.json(
        { error: "Type et taux facturable obligatoires" },
        { status: 400 }
      );
    }

    if (type === "MO" && !posteId) {
      return NextResponse.json(
        { error: "Poste obligatoire pour un tarif MO" },
        { status: 400 }
      );
    }

    if (type === "MATERIEL" && !materielId) {
      return NextResponse.json(
        { error: "Matériel obligatoire pour un tarif matériel" },
        { status: 400 }
      );
    }

    const tarif = await db.tarifContrat.create({
      data: {
        contratId: params.id,
        type,
        posteId: type === "MO" ? posteId : null,
        materielId: type === "MATERIEL" ? materielId : null,
        tauxFacture: parseFloat(tauxFacture),
        tauxRevient: tauxRevient ? parseFloat(tauxRevient) : null,
        unite: unite || (type === "MO" ? "HEURE" : "JOUR"),
      },
      include: {
        poste: { select: { id: true, nom: true } },
        materiel: { select: { id: true, nom: true, code: true } },
      },
    });

    return NextResponse.json(tarif);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(req.url);
    const tarifId = searchParams.get("tarifId");

    if (!tarifId) {
      return NextResponse.json({ error: "tarifId obligatoire" }, { status: 400 });
    }

    await db.tarifContrat.delete({ where: { id: tarifId } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}