import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;
    const type = formData.get("type") as string;

    if (!file || !userId) {
      return NextResponse.json({ error: "Fichier et userId obligatoires" }, { status: 400 });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      return NextResponse.json({ error: "Cloudinary non configuré" }, { status: 500 });
    }

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", uploadPreset);
    fd.append("folder", `gcp-sii/rh/${userId}`);
    fd.append("public_id", `${type}_${Date.now()}`);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      { method: "POST", body: fd }
    );

    const data = await res.json();

    if (!data.secure_url) {
      return NextResponse.json({ error: data.error?.message || "Upload échoué" }, { status: 500 });
    }

    return NextResponse.json({
      url: data.secure_url,
      taille: data.bytes,
      format: data.format,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}