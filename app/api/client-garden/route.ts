import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { CLIENT_GARDEN_BUCKET, emptyClientGarden, isOwnerEmail, sanitizeClientGarden } from "@/lib/client-garden";

async function getOwner() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user && isOwnerEmail(user.email) ? user : null;
}

async function ensureBucket() {
  const admin = createAdminClient();
  const { data: buckets, error } = await admin.storage.listBuckets();
  if (error) throw error;
  if (!buckets.some((bucket) => bucket.name === CLIENT_GARDEN_BUCKET)) {
    const { error: createError } = await admin.storage.createBucket(CLIENT_GARDEN_BUCKET, {
      public: false,
      fileSizeLimit: 1_000_000,
      allowedMimeTypes: ["application/json"],
    });
    if (createError && !createError.message.toLowerCase().includes("already exists")) throw createError;
  }
  return admin;
}

export async function GET() {
  const owner = await getOwner();
  if (!owner) return NextResponse.json({ error: "Owner access required." }, { status: 403 });
  try {
    const admin = await ensureBucket();
    const { data, error } = await admin.storage.from(CLIENT_GARDEN_BUCKET).download(`${owner.id}/client-garden.json`);
    if (error) {
      if (error.message.toLowerCase().includes("not found") || error.message.toLowerCase().includes("object not found")) {
        return NextResponse.json(emptyClientGarden);
      }
      throw error;
    }
    return NextResponse.json(sanitizeClientGarden(JSON.parse(await data.text())));
  } catch (error) {
    console.error("Client Garden read failed", error);
    return NextResponse.json({ error: "The dashboard could not be loaded." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const owner = await getOwner();
  if (!owner) return NextResponse.json({ error: "Owner access required." }, { status: 403 });
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 900_000) return NextResponse.json({ error: "Dashboard data is too large." }, { status: 413 });
    const safeData = sanitizeClientGarden(await request.json());
    const admin = await ensureBucket();
    const { error } = await admin.storage.from(CLIENT_GARDEN_BUCKET).upload(
      `${owner.id}/client-garden.json`,
      JSON.stringify(safeData),
      { contentType: "application/json", upsert: true, cacheControl: "0" },
    );
    if (error) throw error;
    return NextResponse.json(safeData);
  } catch (error) {
    console.error("Client Garden save failed", error);
    return NextResponse.json({ error: "Your changes could not be saved." }, { status: 500 });
  }
}
