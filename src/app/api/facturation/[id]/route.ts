import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const facture = await db.facture.findUnique({
      where: { id: params.id },
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
              include: { materiel: { include: { categorie: true } } },
            },
            zone: {
              include: {
                projet: {
                  include: { contrat: { include: { client: true } } },
                },
              },
            },
          },
        },
      },
    });

    if (!facture) return NextResponse.json({ error: "Facture non trouvée" }, { status: 404 });
    return NextResponse.json(facture);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}