import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const projets = await db.projet.findMany({
      include: {
        contrat: {
          select: {
            id: true,
            numero: true,
            objet: true,
            client: { select: { id: true, nom: true } }
          }
        },
        _count: { select: { zones: true, equipes: true } }
      },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(projets);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nom, code, contratId } = body;

    if (!nom || !code || !contratId) {
      return NextResponse.json(
        { error: "Nom, code et contrat obligatoires" },
        { status: 400 }
      );
    }

    const projet = await db.projet.create({
      data: { nom, code, contratId },
      include: {
        contrat: {
          select: {
            id: true,
            numero: true,
            client: { select: { id: true, nom: true } }
          }
        }
      }
    });

    return NextResponse.json(projet);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, nom, code, contratId } = body;

    const projet = await db.projet.update({
      where: { id },
      data: { nom, code, contratId },
      include: {
        contrat: {
          select: {
            id: true,
            numero: true,
            client: { select: { id: true, nom: true } }
          }
        }
      }
    });

    return NextResponse.json(projet);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}