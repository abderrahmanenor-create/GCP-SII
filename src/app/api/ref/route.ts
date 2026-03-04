import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET : Récupérer toutes les tables de référence
export async function GET() {
  try {
    const [
      postes,
      typesContrat,
      typesHabilitation,
      categoriesEPI,
      categoriesMateriel,
      motifsAbsence,
      codesPointage,
    ] = await Promise.all([
      db.refPoste.findMany({ where: { actif: true }, orderBy: { nom: "asc" } }),
      db.refTypeContrat.findMany({ where: { actif: true }, orderBy: { nom: "asc" } }),
      db.refTypeHabilitation.findMany({ where: { actif: true }, orderBy: { nom: "asc" } }),
      db.refCategorieEPI.findMany({ where: { actif: true }, orderBy: { nom: "asc" } }),
      db.refCategoriesMateriel.findMany({ where: { actif: true }, orderBy: { nom: "asc" } }),
      db.refMotifAbsence.findMany({ where: { actif: true }, orderBy: { nom: "asc" } }),
      db.refCodePointage.findMany({ where: { actif: true }, orderBy: { code: "asc" } }),
    ]);

    return NextResponse.json({
      postes,
      typesContrat,
      typesHabilitation,
      categoriesEPI,
      categoriesMateriel,
      motifsAbsence,
      codesPointage,
    });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST : Ajouter une entrée dans une table de référence
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { table, data } = body;

    let result;

    switch (table) {
      case "poste":
        result = await db.refPoste.create({ data: { nom: data.nom } });
        break;
      case "typeContrat":
        result = await db.refTypeContrat.create({ data: { nom: data.nom } });
        break;
      case "typeHabilitation":
        result = await db.refTypeHabilitation.create({
          data: { nom: data.nom, dureeValiditeMois: data.dureeValiditeMois || 12 },
        });
        break;
      case "categorieEPI":
        result = await db.refCategorieEPI.create({ data: { nom: data.nom } });
        break;
      case "categorieMateriel":
        result = await db.refCategoriesMateriel.create({ data: { nom: data.nom } });
        break;
      case "motifAbsence":
        result = await db.refMotifAbsence.create({
          data: { nom: data.nom, paye: data.paye || false },
        });
        break;
      case "codePointage":
        result = await db.refCodePointage.create({
          data: {
            code: data.code,
            libelle: data.libelle,
            facturable: data.facturable ?? true,
          },
        });
        break;
      default:
        return NextResponse.json({ error: "Table inconnue" }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}