import { NextResponse } from nextserver;
import { db } from @libdb;

export async function GET(req Request, { params } { params { id string } }) {
  try {
    const user = await db.user.findUnique({
      where { id params.id },
      include {
        habilitations true,  On charge les habilitations
        epiDistribues {
          include { epi true }  On charge les EPI et le nom de l'EPI
        }
      },
    });

    if (!user) {
      return NextResponse.json({ error Utilisateur non trouvé }, { status 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error Erreur serveur }, { status 500 });
  }
}