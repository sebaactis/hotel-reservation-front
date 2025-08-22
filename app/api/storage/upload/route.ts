import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server";

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
);

export const runtime = "nodejs";

function mimeToExt(mime: string) {
    if (mime === "image/jpeg") return "jpg";
    if (mime === "image/png") return "png";
    if (mime === "image/webp") return "webp";
    return "bin";
}

export async function POST(req: Request) {

    try {
        const form = await req.formData();
        const files = form.getAll("files") as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No se recibieron archivos" }, { status: 400 });
        }

        const bucket = process.env.SUPABASE_BUCKET!;
        const urls: string[] = [];

        for (const file of files) {

            if (file.size > 10 * 1024 * 1024) {
                return NextResponse.json({ error: `Archivo demasiado grande (>10MB): ${file.name}` }, { status: 400 });
            }

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const ext = mimeToExt(file.type);
            const fileName = `${crypto.randomUUID()}.${ext}`;

            const path = `hotels/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(path, buffer, {
                    contentType: file.type,
                    upsert: false
                });

            if (uploadError) {
                return NextResponse.json({ error: uploadError.message }, { status: 500 });
            }

            const { data } = supabase.storage.from(bucket).getPublicUrl(path);
            urls.push(data.publicUrl);
        }

        return NextResponse.json({ urls }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message ?? "Error al subir" }, { status: 500 });
    }
}