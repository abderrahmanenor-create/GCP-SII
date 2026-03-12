import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const zones = await db.zone.findMany({
      include: {
        projet: {
          select: {
            id: true,
            nom: true,
            code: true,
            contrat: {
              select: {
                id: true,
                numero: true,
                client: {
                  select: { id: true, nom: true }
                }
              }
            }
          }
        }
      },
      orderBy: { nom: "asc" }
    });

    return NextResponse.json(zones);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nom, projetId } = body;

    const zone = await db.zone.create({
      data: { nom, projetId },
      include: {
        projet: {
          select: { id: true, nom: true, code: true }
        }
      }
    });

    return NextResponse.json(zone);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}