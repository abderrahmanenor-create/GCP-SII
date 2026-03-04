import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, typeId, dateFin, dateObtention, document } = body;

    if (!userId || !typeId || !dateFin) {
      return NextResponse.json(
        { error: "userId, typeId et dateFin sont obligatoires" },
        { status: 400 }
      );
    }

    const habilitation = await db.habilitation.create({
      data: {
        userId,
        typeId,
        dateFin: new Date(dateFin),
        dateObtention: dateObtention ? new Date(dateObtention) : new Date(),
        document: document || null,
        statut: "VALIDE",
      },
      include: {
        type: true,
        user: {
          select: { id: true, nom: true, prenom: true }
        },
      },
    });

    return NextResponse.json(habilitation);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const expireSoon = searchParams.get("expireSoon");

    let where: any = {};

    if (userId) {
      where.userId = userId;
    }

    if (expireSoon === "true") {
      const in30days = new Date();
      in30days.setDate(in30days.getDate() + 30);
      where.dateFin = { lte: in30days };
    }

    const habilitations = await db.habilitation.findMany({
      where,
      include: {
        type: true,
        user: {
          select: { id: true, nom: true, prenom: true, matricule: true }
        },
      },
      orderBy: { dateFin: "asc" },
    });

    return NextResponse.json(habilitations);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id obligatoire" }, { status: 400 });
    }

    await db.habilitation.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}