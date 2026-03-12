import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const statut = searchParams.get("statut") || "";
  const posteId = searchParams.get("posteId") || "";

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

  const users = await prisma.user.findMany({
    where,
    include: {
      poste: true,
      habilitations: {
        include: { typeHabilitation: true },
        orderBy: { dateExpiration: "asc" },
      },
      distributions: {
        where: { statut: "ACTIF" },
        include: { epi: true },
      },
      lignesRegie: {
        take: 1,
        orderBy: { createdAt: "desc" },
        include: {
          feuilleRegie: {
            include: {
              zone: { include: { projet: true } },
            },
          },
        },
      },
    },
    orderBy: [{ statut: "asc" }, { nom: "asc" }],
  });

  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    nom, prenom, email, matricule, cin, telephone,
    posteId, role, statut, dateEmbauche, salaire,
    adresse, photo,
  } = body;

  if (!nom || !prenom) {
    return NextResponse.json({ error: "Nom et prénom obligatoires" }, { status: 400 });
  }

  const user = await prisma.user.create({
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
      photo: photo || null,
    },
    include: { poste: true },
  });

  return NextResponse.json(user, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { id, ...data } = body;

  if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });

  if (data.dateEmbauche) data.dateEmbauche = new Date(data.dateEmbauche);
  if (data.salaire) data.salaire = parseFloat(data.salaire);
  if (data.salaire === "") data.salaire = null;

  const user = await prisma.user.update({
    where: { id },
    data,
    include: { poste: true },
  });

  return NextResponse.json(user);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });

  // Soft delete — on archive plutôt que supprimer
  await prisma.user.update({
    where: { id },
    data: { statut: "INACTIF" },
  });

  return NextResponse.json({ success: true });
}