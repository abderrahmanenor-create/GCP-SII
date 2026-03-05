import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Durées de vie par défaut selon normes
const DUREES_VIE_DEFAUT: Record<string, { ans?: number; lavages?: number; vgp: boolean; vgpMois?: number; categorie: string; norme: string }> = {
  "Casque de chantier":     { ans: 4,  vgp: false, categorie: "II",  norme: "EN 397" },
  "Harnais antichute":      { ans: 5,  vgp: true,  vgpMois: 12, categorie: "III", norme: "EN 361" },
  "Gants mécaniques":       { ans: 2,  vgp: false, categorie: "II",  norme: "EN 388" },
  "Gants chimiques":        { ans: 2,  vgp: false, categorie: "III", norme: "EN 374" },
  "Chaussures sécurité":    { ans: 3,  vgp: false, categorie: "II",  norme: "EN 20345" },
  "Gilet haute visibilité": { ans: 3,  lavages: 25, vgp: false, categorie: "II", norme: "EN 20471" },
  "Masque FFP2":            { ans: 1,  vgp: false, categorie: "III", norme: "EN 149" },
  "Masque FFP3":            { ans: 1,  vgp: false, categorie: "III", norme: "EN 149" },
  "Lunettes protection":    { ans: 3,  vgp: false, categorie: "II",  norme: "EN 166" },
  "Protection auditive":    { ans: 2,  vgp: false, categorie: "II",  norme: "EN 352" },
  "Longe antichute":        { ans: 5,  vgp: true,  vgpMois: 12, categorie: "III", norme: "EN 354" },
};

export async function GET() {
  try {
    const epis = await db.ePI.findMany({
      include: {
        categorie: { select: { id: true, nom: true } },
        _count: { select: { distributions: true, mouvements: true } },
        distributions: {
          where: { statut: "ACTIF" },
          select: { id: true }
        }
      },
      orderBy: { nom: "asc" }
    });
    return NextResponse.json(epis);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      nom, reference, marque, taille, norme, categorieSec,
      stockInitial, seuilAlerte, prixUnitaire, categorieId,
      dureeVieAns, nbLavagesMax, vgpRequise, vgpPeriodeMois, datePeremption
    } = body;

    if (!nom) return NextResponse.json({ error: "Nom obligatoire" }, { status: 400 });

    // Appliquer valeurs par défaut selon nom EPI
    const defauts = DUREES_VIE_DEFAUT[nom] || null;

    const epi = await db.ePI.create({
      data: {
        nom,
        reference: reference || null,
        marque: marque || null,
        taille: taille || null,
        norme: norme || defauts?.norme || null,
        categorieSec: categorieSec || defauts?.categorie || "II",
        stockInitial: parseInt(stockInitial) || 0,
        stockActuel: parseInt(stockInitial) || 0,
        seuilAlerte: parseInt(seuilAlerte) || 5,
        prixUnitaire: prixUnitaire ? parseFloat(prixUnitaire) : null,
        categorieId: categorieId || null,
        dureeVieAns: dureeVieAns ? parseInt(dureeVieAns) : (defauts?.ans || null),
        nbLavagesMax: nbLavagesMax ? parseInt(nbLavagesMax) : (defauts?.lavages || null),
        vgpRequise: vgpRequise !== undefined ? vgpRequise : (defauts?.vgp || false),
        vgpPeriodeMois: vgpPeriodeMois ? parseInt(vgpPeriodeMois) : (defauts?.vgpMois || null),
        datePeremption: datePeremption ? new Date(datePeremption) : null,
      },
      include: { categorie: true }
    });

    // Créer mouvement entrée initial
    if (parseInt(stockInitial) > 0) {
      await db.mouvementEPI.create({
        data: {
          type: "ENTREE",
          quantite: parseInt(stockInitial),
          motif: "Stock initial",
          epiId: epi.id,
        }
      });
    }

    return NextResponse.json(epi);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, action, type, quantite, motif, ...data } = body;

    if (action === "MOUVEMENT") {
      const epi = await db.ePI.findUnique({ where: { id } });
      if (!epi) return NextResponse.json({ error: "EPI non trouvé" }, { status: 404 });

      let newStock = epi.stockActuel;
      if (type === "ENTREE" || type === "RETOUR") {
        newStock += parseInt(quantite);
      } else {
        newStock = Math.max(0, newStock - parseInt(quantite));
      }

      await db.mouvementEPI.create({
        data: { type, quantite: parseInt(quantite), motif: motif || null, epiId: id }
      });

      const updated = await db.ePI.update({
        where: { id },
        data: { stockActuel: newStock },
        include: { categorie: true }
      });

      return NextResponse.json(updated);
    }

    const epi = await db.ePI.update({
      where: { id },
      data: {
        nom: data.nom,
        reference: data.reference || null,
        marque: data.marque || null,
        taille: data.taille || null,
        norme: data.norme || null,
        categorieSec: data.categorieSec || "II",
        seuilAlerte: parseInt(data.seuilAlerte) || 5,
        prixUnitaire: data.prixUnitaire ? parseFloat(data.prixUnitaire) : null,
        categorieId: data.categorieId || null,
        dureeVieAns: data.dureeVieAns ? parseInt(data.dureeVieAns) : null,
        nbLavagesMax: data.nbLavagesMax ? parseInt(data.nbLavagesMax) : null,
        vgpRequise: data.vgpRequise || false,
        vgpPeriodeMois: data.vgpPeriodeMois ? parseInt(data.vgpPeriodeMois) : null,
        datePeremption: data.datePeremption ? new Date(data.datePeremption) : null,
      },
      include: { categorie: true }
    });

    return NextResponse.json(epi);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}