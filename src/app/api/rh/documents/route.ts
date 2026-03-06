import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "userId manquant" }, { status: 400 });

    const documents = await db.documentRH.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(documents);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, type, nom, url, taille, expiration, remarque } = body;

    if (!userId || !type || !nom || !url) {
      return NextResponse.json({ error: "userId, type, nom et url obligatoires" }, { status: 400 });
    }

    const doc = await db.documentRH.create({
      data: {
        userId,
        type,
        nom,
        url,
        taille: taille || null,
        expiration: expiration ? new Date(expiration) : null,
        remarque: remarque || null,
      },
    });

    return NextResponse.json(doc, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id manquant" }, { status: 400 });

    const doc = await db.documentRH.findUnique({ where: { id } });
    if (!doc) return NextResponse.json({ error: "Document non trouvé" }, { status: 404 });

    // Supprimer de Cloudinary si possible
    try {
      const publicId = doc.url.split("/").pop()?.split(".")[0];
      if (publicId) await cloudinary.uploader.destroy(`rh-documents/${publicId}`);
    } catch {}

    await db.documentRH.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}