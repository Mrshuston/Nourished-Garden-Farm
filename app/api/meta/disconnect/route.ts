import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isOwnerEmail } from "@/lib/client-garden";
import { deleteMetaConnection, getMetaConfig, metaJson, readMetaConnection } from "@/lib/meta";

export async function DELETE() {
  const { data: { user } } = await (await createClient()).auth.getUser();
  if (!user || !isOwnerEmail(user.email)) return NextResponse.json({ error: "Owner access required." }, { status: 403 });
  try {
    const connection = await readMetaConnection(user.id);
    const config = getMetaConfig();
    if (connection && config) {
      try {
        await metaJson(`https://graph.facebook.com/${config.apiVersion}/me/permissions?access_token=${encodeURIComponent(connection.userAccessToken)}`, { method: "DELETE" });
      } catch (error) {
        console.warn("Meta permission revocation failed; removing local connection.", error);
      }
    }
    await deleteMetaConnection(user.id);
    return NextResponse.json({ connected: false });
  } catch (error) {
    console.error("Meta disconnect failed", error);
    return NextResponse.json({ error: "Meta could not be disconnected." }, { status: 500 });
  }
}
