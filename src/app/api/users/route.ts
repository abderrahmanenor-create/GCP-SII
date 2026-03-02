import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nom, prenom, email, password, role, statut, matricule, cin, cnss, tauxHoraire } = body;

    // Cryptage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        nom,
        prenom,
        email,
        password: hashedPassword,
        role,
        statut,
        matricule,
        cin,
        cnss,
        tauxHoraire,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
