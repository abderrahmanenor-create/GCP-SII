import { NextResponse } from nextserver;
import { db } from @libdb;

 GET  Détail d'une feuille de régie
export async function GET(req Request, { params } { params Promise{ id string } }) {
  try {
    const { id } = await params;

    const feuille = await db.feuilleRegie.findUnique({
      where { id },
      include {
        zone {
          include {
            projet {
              include { contrat { include { client true } } }
            }
          }
        },
        lignes {
          include {
            user {
              select {
                id true, nom true, prenom true,
                matricule true, photoUrl true, tauxHoraire true,
                poste true,
              }
            }
          }
        },
        affectationsMat {
          include {
            materiel {
              select {
                id true, nom true, code true,
                prixLocationJour true, categorie true,
              }
            }
          }
        },
        rapports true,
      },
    });

    if (!feuille) {
      return NextResponse.json({ error Feuille non trouvée }, { status 404 });
    }

    return NextResponse.json(feuille);
  } catch (error) {
    return NextResponse.json({ error Erreur serveur }, { status 500 });
  }
}

 PATCH  Valider une feuille (chef ou client)
export async function PATCH(req Request, { params } { params Promise{ id string } }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { action, userId, signatureUrl, scanSignature } = body;

    let updateData any = {};

    if (action === VALIDER_CHEF) {
      updateData = {
        statut VALIDE_CHEF,
        valideChefId userId,
        dateValidChef new Date(),
      };
    } else if (action === VALIDER_CLIENT) {
      updateData = {
        statut VALIDE_CLIENT,
        valideClientId userId,
        dateValidClient new Date(),
        signatureUrl,
        scanSignature,
      };
    } else if (action === SOUMETTRE) {
      updateData = { statut SOUMIS };
    }

    const feuille = await db.feuilleRegie.update({
      where { id },
      data updateData,
    });

    return NextResponse.json(feuille);
  } catch (error any) {
    return NextResponse.json({ error error.message }, { status 500 });
  }
}

 DELETE  Supprimer une feuille (brouillon seulement)
export async function DELETE(req Request, { params } { params Promise{ id string } }) {
  try {
    const { id } = await params;

    const feuille = await db.feuilleRegie.findUnique({ where { id } });
    if (!feuille) {
      return NextResponse.json({ error Feuille non trouvée }, { status 404 });
    }
    if (feuille.statut !== BROUILLON) {
      return NextResponse.json({ error Impossible de supprimer une feuille validée }, { status 403 });
    }

    await db.feuilleRegie.delete({ where { id } });
    return NextResponse.json({ success true });
  } catch (error any) {
    return NextResponse.json({ error error.message }, { status 500 });
  }
}