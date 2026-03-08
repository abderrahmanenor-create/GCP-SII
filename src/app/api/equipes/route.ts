import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const equipes = await db.equipe.findMany({
      include: { projet: { select: { nom: true } } },
      orderBy: { nom: "asc" },
    });
    return NextResponse.json(equipes);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}