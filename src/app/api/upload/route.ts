import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, type, url } = body;

    if (!userId || !type || !url) {
      return NextResponse.json(
        { error: "userId, type et url sont obligatoires" },
        { status: 400 }
      );
    }

    const fieldMap: Record<string, string> = {
      photo: "photoUrl",
      cin: "cinUrl",
      cnss: "cnssUrl",
      contrat: "contratUrl",
    };

    const field = fieldMap[type];
    if (!field) {
      return NextResponse.json({ error: "Type invalide" }, { status: 400 });
    }

    const user = await db.user.update({
      where: { id: userId },
      data: { [field]: url },
      select: {
        id: true,
        photoUrl: true,
        cinUrl: true,
        cnssUrl: true,
        contratUrl: true,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}