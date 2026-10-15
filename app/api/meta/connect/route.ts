import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isOwnerEmail } from "@/lib/client-garden";
import { getMetaConfig } from "@/lib/meta";

export async function GET() {
  const { data: { user } } = await (await createClient()).auth.getUser();
  if (!user || !isOwnerEmail(user.email)) return NextResponse.json({ error: "Owner access required." }, { status: 403 });
  const config = getMetaConfig();
  if (!config) return NextResponse.redirect(new URL("/client-garden?meta=setup-needed", process.env.NEXT_PUBLIC_APP_URL || "https://www.nourished-garden-health.com"));

  const state = randomBytes(24).toString("hex");
  const scopes = [
    "pages_show_list",
    "pages_read_engagement",
    "pages_manage_posts",
    "instagram_basic",
    "instagram_content_publish",
  ];
  const authUrl = new URL(`https://www.facebook.com/${config.apiVersion}/dialog/oauth`);
  authUrl.searchParams.set("client_id", config.appId);
  authUrl.searchParams.set("redirect_uri", config.redirectUri);
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("scope", scopes.join(","));
  authUrl.searchParams.set("response_type", "code");

  const response = NextResponse.redirect(authUrl);
  response.cookies.set("meta_oauth_state", state, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 600, path: "/" });
  return response;
}
