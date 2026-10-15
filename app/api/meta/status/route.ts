import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isOwnerEmail } from "@/lib/client-garden";
import { getMetaConfig, readMetaConnection } from "@/lib/meta";

export async function GET() {
  const { data: { user } } = await (await createClient()).auth.getUser();
  if (!user || !isOwnerEmail(user.email)) return NextResponse.json({ error: "Owner access required." }, { status: 403 });
  try {
    const connection = await readMetaConnection(user.id);
    return NextResponse.json({
      configured: Boolean(getMetaConfig()),
      connected: Boolean(connection),
      connectedAt: connection?.connectedAt || null,
      userName: connection?.userName || null,
      pages: connection?.pages.map((page) => ({ id: page.id, name: page.name, instagram: page.instagram || null })) || [],
    });
  } catch (error) {
    console.error("Meta status failed", error);
    return NextResponse.json({ error: "Meta connection status could not be loaded." }, { status: 500 });
  }
}
