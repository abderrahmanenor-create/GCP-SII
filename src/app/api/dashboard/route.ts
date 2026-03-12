import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const now = new Date();
    const debutMois = new Date(now.getFullYear(), now.getMonth(), 1);
    const fin30j = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    // Ouvriers
    const totalOuvriers = await db.user.count({ where: { statut: "ACTIF" } });

    // Feuilles régie ce mois
    const feuillesMois = await db.feuilleRegie.findMany({
      where: { date: { gte: debutMois } },
      select: {
        statut: true,
        totalGeneral: true,
        totalHeures: true,
      }
    });

    const feuillesEnAttente = feuillesMois.filter(f =>
      f.statut === "SOUMIS" || f.statut === "VALIDE_CHEF"
    ).length;

    const feuillesValidees = feuillesMois.filter(f =>
      f.statut === "VALIDE_CLIENT"
    ).length;

    const totalFacturableMois = feuillesMois
      .filter(f => f.statut === "VALIDE_CLIENT")
      .reduce((sum, f) => sum + (f.totalGeneral || 0), 0);

    const totalHeuresMois = feuillesMois
      .reduce((sum, f) => sum + (f.totalHeures || 0), 0);

    // EPI — alertes stock
    const episAlertesStock = await db.ePI.count({
      where: { stockActuel: { lte: db.ePI.fields.seuilAlerte } }
    }).catch(() => 0);

    // EPI — alertes péremption / VGP dans 30j
    const distributionsAlertes = await db.distributionEPI.count({
      where: {
        statut: "ACTIF",
        OR: [
          { datePeremption: { lte: fin30j } },
          { dateProchVGP: { lte: fin30j } },
        ]
      }
    });

    // Habilitations qui expirent dans 30j
    const habilitationsExpirent = await db.habilitation.count({
      where: {
        dateExpiration: { lte: fin30j, gte: now },
      }
    }).catch(() => 0);

    // Contrats actifs
    const contratsActifs = await db.contrat.count({
      where: { statut: "ACTIF" }
    });

    // Projets actifs
    const projetsActifs = await db.projet.count();

    // Dernières feuilles (5)
    const dernieresFeuilles = await db.feuilleRegie.findMany({
      take: 5,
      orderBy: { date: "desc" },
      select: {
        id: true,
        date: true,
        statut: true,
        totalGeneral: true,
        totalHeures: true,
        zone: {
          select: {
            nom: true,
            projet: {
              select: {
                nom: true,
                contrat: {
                  select: { client: { select: { nom: true } } }
                }
              }
            }
          }
        }
      }
    });

    // Dernières distributions EPI avec alerte
    const dernieresAlertes = await db.distributionEPI.findMany({
      where: {
        statut: "ACTIF",
        OR: [
          { datePeremption: { lte: fin30j } },
          { dateProchVGP: { lte: fin30j } },
        ]
      },
      take: 5,
      orderBy: { datePeremption: "asc" },
      select: {
        id: true,
        datePeremption: true,
        dateProchVGP: true,
        epi: { select: { nom: true, norme: true } },
        user: { select: { nom: true, prenom: true } }
      }
    });

    // Évolution heures 6 derniers mois
    const evolution = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const fin = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      const feuilles = await db.feuilleRegie.findMany({
        where: { date: { gte: d, lte: fin } },
        select: { totalHeures: true, totalGeneral: true }
      });
      evolution.push({
        mois: d.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" }),
        heures: feuilles.reduce((s, f) => s + (f.totalHeures || 0), 0),
        montant: feuilles.reduce((s, f) => s + (f.totalGeneral || 0), 0),
      });
    }

    return NextResponse.json({
      kpis: {
        totalOuvriers,
        feuillesEnAttente,
        feuillesValidees,
        totalFacturableMois,
        totalHeuresMois,
        contratsActifs,
        projetsActifs,
        distributionsAlertes,
        habilitationsExpirent,
      },
      dernieresFeuilles,
      dernieresAlertes,
      evolution,
    });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}