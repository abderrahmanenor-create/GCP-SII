import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET : Générer un rapport
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "JOURNALIER";
    const zoneId = searchParams.get("zoneId");
    const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
    const mois = searchParams.get("mois");
    const annee = searchParams.get("annee");
    const semaine = searchParams.get("semaine");

    let dateDebut: Date;
    let dateFin: Date;

    if (type === "JOURNALIER") {
      dateDebut = new Date(date);
      dateDebut.setHours(0, 0, 0, 0);
      dateFin = new Date(date);
      dateFin.setHours(23, 59, 59, 999);
    } else if (type === "HEBDOMADAIRE" && semaine && annee) {
      const d = getDateFromWeek(parseInt(annee), parseInt(semaine));
      dateDebut = d.start;
      dateFin = d.end;
    } else if ((type === "MENSUEL" || type === "MENSUEL_VALORISE") && mois && annee) {
      dateDebut = new Date(parseInt(annee), parseInt(mois) - 1, 1);
      dateFin = new Date(parseInt(annee), parseInt(mois), 0, 23, 59, 59);
    } else {
      return NextResponse.json({ error: "Paramètres invalides" }, { status: 400 });
    }

    // Récupérer les feuilles de régie
    const feuilles = await db.feuilleRegie.findMany({
      where: {
        date: { gte: dateDebut, lte: dateFin },
        ...(zoneId && { zoneId }),
        statut: { in: ["VALIDE_CHEF", "VALIDE_CLIENT", "SOUMIS"] },
      },
      include: {
        zone: {
          include: {
            projet: {
              include: { contrat: { include: { client: true } } }
            }
          }
        },
        lignes: {
          include: {
            user: {
              select: {
                id: true, nom: true, prenom: true,
                matricule: true, tauxHoraire: true, poste: true,
              }
            }
          }
        },
        affectationsMat: {
          include: {
            materiel: {
              select: {
                id: true, nom: true, code: true,
                prixLocationJour: true, categorie: true,
              }
            }
          }
        },
      },
      orderBy: { date: "asc" },
    });

    // Récupérer les présences
    const presences = await db.presenceSite.findMany({
      where: {
        date: { gte: dateDebut, lte: dateFin },
        ...(zoneId && { zoneId }),
      },
      include: {
        user: {
          select: {
            id: true, nom: true, prenom: true,
            matricule: true, poste: true,
          }
        },
      },
      orderBy: { date: "asc" },
    });

    // Calcul des totaux
    const totalHeures = feuilles.reduce((sum, f) => sum + f.totalHeures, 0);
    const totalCoutMO = feuilles.reduce((sum, f) => sum + f.totalCoutMO, 0);
    const totalCoutMat = feuilles.reduce((sum, f) => sum + f.totalCoutMat, 0);
    const totalHT = totalCoutMO + totalCoutMat;
    const tva = totalHT * 0.20;
    const totalTTC = totalHT + tva;

    // Récapitulatif par employé
    const parEmploye: Record<string, any> = {};
    feuilles.forEach(f => {
      f.lignes.forEach(l => {
        if (!parEmploye[l.userId]) {
          parEmploye[l.userId] = {
            user: l.user,
            totalHeures: 0,
            totalMontant: 0,
            jours: 0,
          };
        }
        parEmploye[l.userId].totalHeures += l.heures;
        parEmploye[l.userId].totalMontant += l.montant;
        parEmploye[l.userId].jours += 1;
      });
    });

    // Récapitulatif matériel
    const parMateriel: Record<string, any> = {};
    feuilles.forEach(f => {
      f.affectationsMat.forEach(a => {
        if (!parMateriel[a.materielId]) {
          parMateriel[a.materielId] = {
            materiel: a.materiel,
            totalJours: 0,
            totalMontant: 0,
          };
        }
        parMateriel[a.materielId].totalJours += a.joursFactures;
        parMateriel[a.materielId].totalMontant += a.montant;
      });
    });

    const rapport = {
      type,
      periode: { dateDebut, dateFin },
      feuilles,
      presences,
      resumeEmployes: Object.values(parEmploye),
      resumeMateriel: Object.values(parMateriel),
      totaux: {
        totalHeures,
        totalCoutMO,
        totalCoutMat,
        totalHT,
        tva,
        totalTTC,
      },
      genereLe: new Date(),
    };

    return NextResponse.json(rapport);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

function getDateFromWeek(year: number, week: number) {
  const start = new Date(year, 0, 1 + (week - 1) * 7);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(start.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return { start: monday, end: sunday };
}