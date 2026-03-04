import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const societes = await db.societe.findMany({
      include: {
        _count: { select: { users: true, contrats: true } }
      },
      orderBy: { nom: "asc" }
    });
    return NextResponse.json(societes);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nom, type, ice, email, tel, adresse } = body;

    if (!nom || !type) {
      return NextResponse.json({ error: "Nom et type obligatoires" }, { status: 400 });
    }

    const societe = await db.societe.create({
      data: { nom, type, ice, email, tel, adresse }
    });

    return NextResponse.json(societe);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, nom, type, ice, email, tel, adresse, actif } = body;

    const societe = await db.societe.update({
      where: { id },
      data: { nom, type, ice, email, tel, adresse, actif }
    });

    return NextResponse.json(societe);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}