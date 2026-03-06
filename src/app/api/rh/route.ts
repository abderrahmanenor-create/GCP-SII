import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const statut = searchParams.get("statut") || "";
  const posteId = searchParams.get("posteId") || "";

  try {
    const where: any = {};
    if (statut) where.statut = statut;
    if (posteId) where.posteId = posteId;
    if (search) {
      where.OR = [
        { nom: { contains: search, mode: "insensitive" } },
        { prenom: { contains: search, mode: "insensitive" } },
        { matricule: { contains: search, mode: "insensitive" } },
        { cin: { contains: search, mode: "insensitive" } },
      ];
    }

    const users = await db.user.findMany({
      where,
      include: { poste: true },
      orderBy: [{ statut: "asc" }, { nom: "asc" }],
    });

    const enriched = await Promise.all(users.map(async (u) => {
      let habilitations: any[] = [];
      let distributions: any[] = [];

      try {
        habilitations = await (db  as any).habilitation.findMany({
          where: { userId: u.id },
          include: { typeHabilitation: true },
          orderBy: { dateExpiration: "asc" },
        });
      } catch {}

      try {
        distributions = await (db as any).distributionEPI.findMany({
          where: { userId: u.id, statut: "ACTIF" },
          include: { epi: true },
        });
      } catch {}

      return { ...u, habilitations, distributions };
    }));

    return NextResponse.json(enriched);
  } catch (error: any) {
    console.error("GET /api/rh error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nom, prenom, email, matricule, cin, telephone, posteId, role, statut, dateEmbauche, salaire, adresse } = body;

    if (!nom || !prenom) {
      return NextResponse.json({ error: "Nom et prénom obligatoires" }, { status: 400 });
    }

    const user = await db.user.create({
      data: {
        nom, prenom,
        email: email || null,
        matricule: matricule || null,
        cin: cin || null,
        telephone: telephone || null,
        posteId: posteId || null,
        role: role || "OUVRIER",
        statut: statut || "ACTIF",
        dateEmbauche: dateEmbauche ? new Date(dateEmbauche) : null,
        salaire: salaire ? parseFloat(salaire) : null,
        adresse: adresse || null,
      },
      include: { poste: true },
    });

    return NextResponse.json({ ...user, habilitations: [], distributions: [] }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/rh error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, habilitations, distributions, poste, lignesRegie, ...data } = body;

    if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });

    if (data.dateEmbauche) data.dateEmbauche = new Date(data.dateEmbauche);
    else delete data.dateEmbauche;
    if (data.salaire) data.salaire = parseFloat(data.salaire);
    else delete data.salaire;
    if (!data.posteId) data.posteId = null;

    const user = await db.user.update({
      where: { id },
      data,
      include: { poste: true },
    });

    return NextResponse.json({ ...user, habilitations: [], distributions: [] });
  } catch (error: any) {
    console.error("PATCH /api/rh error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });

    await db.user.update({
      where: { id },
      data: { statut: "INACTIF" },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/rh error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}