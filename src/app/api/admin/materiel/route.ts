import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const materiels = await db.materiel.findMany({
      include: {
        categorie: { select: { id: true, nom: true } },
        affectations: {
          where: { dateFin: null },
          include: {
            zone: {
              select: {
                id: true,
                nom: true,
                projet: { select: { nom: true, code: true } }
              }
            }
          }
        }
      },
      orderBy: { nom: "asc" }
    });
    return NextResponse.json(materiels);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      nom, code, numeroSerie, proprietaire, statut,
      coutJournalier, prixLocationJour, categorieId,
      attestationElectrique, dateAttestElec,
      certificatLevage, dateCertLevage,
      ficheControleOutillage, dateControleOutillage,
      carnetBord, dateCarnetBord, ficheEPI,
      prochaineInspElec, prochaineInspLevage, prochaineInspOutillage
    } = body;

    if (!nom || !code) {
      return NextResponse.json(
        { error: "Nom et code obligatoires" },
        { status: 400 }
      );
    }

    const materiel = await db.materiel.create({
      data: {
        nom,
        code,
        numeroSerie: numeroSerie || null,
        proprietaire: proprietaire || "INTERNE",
        statut: statut || "OPERATIONNEL",
        coutJournalier: coutJournalier ? parseFloat(coutJournalier) : null,
        prixLocationJour: prixLocationJour ? parseFloat(prixLocationJour) : null,
        categorieId: categorieId || null,
        attestationElectrique: attestationElectrique || null,
        dateAttestElec: dateAttestElec ? new Date(dateAttestElec) : null,
        certificatLevage: certificatLevage || null,
        dateCertLevage: dateCertLevage ? new Date(dateCertLevage) : null,
        ficheControleOutillage: ficheControleOutillage || null,
        dateControleOutillage: dateControleOutillage ? new Date(dateControleOutillage) : null,
        carnetBord: carnetBord || null,
        dateCarnetBord: dateCarnetBord ? new Date(dateCarnetBord) : null,
        ficheEPI: ficheEPI || null,
        prochaineInspElec: prochaineInspElec ? new Date(prochaineInspElec) : null,
        prochaineInspLevage: prochaineInspLevage ? new Date(prochaineInspLevage) : null,
        prochaineInspOutillage: prochaineInspOutillage ? new Date(prochaineInspOutillage) : null,
      },
      include: {
        categorie: true
      }
    });

    return NextResponse.json(materiel);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    const materiel = await db.materiel.update({
      where: { id },
      data: {
        ...data,
        coutJournalier: data.coutJournalier ? parseFloat(data.coutJournalier) : null,
        prixLocationJour: data.prixLocationJour ? parseFloat(data.prixLocationJour) : null,
        dateAttestElec: data.dateAttestElec ? new Date(data.dateAttestElec) : null,
        dateCertLevage: data.dateCertLevage ? new Date(data.dateCertLevage) : null,
        dateControleOutillage: data.dateControleOutillage ? new Date(data.dateControleOutillage) : null,
        dateCarnetBord: data.dateCarnetBord ? new Date(data.dateCarnetBord) : null,
        prochaineInspElec: data.prochaineInspElec ? new Date(data.prochaineInspElec) : null,
        prochaineInspLevage: data.prochaineInspLevage ? new Date(data.prochaineInspLevage) : null,
        prochaineInspOutillage: data.prochaineInspOutillage ? new Date(data.prochaineInspOutillage) : null,
      },
      include: {
        categorie: true
      }
    });

    return NextResponse.json(materiel);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}