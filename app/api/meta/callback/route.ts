import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isOwnerEmail } from "@/lib/client-garden";
import { getMetaConfig, metaJson, type MetaConnection, writeMetaConnection } from "@/lib/meta";

type TokenResponse = { access_token: string; token_type?: string; expires_in?: number };
type MeResponse = { id: string; name: string };
type PageResponse = { data: Array<{ id: string; name: string; access_token: string; instagram_business_account?: { id: string; username?: string } }> };

export async function GET(request: Request) {
  const config = getMetaConfig();
  const destination = new URL("/client-garden", config?.appUrl || process.env.NEXT_PUBLIC_APP_URL || "https://www.nourished-garden-health.com");
  const finish = (result: string) => {
    destination.searchParams.set("meta", result);
    const response = NextResponse.redirect(destination);
    response.cookies.delete("meta_oauth_state");
    return response;
  };

  const { data: { user } } = await (await createClient()).auth.getUser();
  if (!user || !isOwnerEmail(user.email)) return finish("access-denied");
  if (!config) return finish("setup-needed");
  const url = new URL(request.url);
  if (url.searchParams.get("error")) return finish("cancelled");
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const savedState = (await cookies()).get("meta_oauth_state")?.value;
  if (!code || !state || !savedState || state !== savedState) return finish("invalid-state");

  try {
    const shortTokenUrl = new URL(`https://graph.facebook.com/${config.apiVersion}/oauth/access_token`);
    shortTokenUrl.searchParams.set("client_id", config.appId);
    shortTokenUrl.searchParams.set("client_secret", config.appSecret);
    shortTokenUrl.searchParams.set("redirect_uri", config.redirectUri);
    shortTokenUrl.searchParams.set("code", code);
    const shortToken = await metaJson<TokenResponse>(shortTokenUrl.toString());

    const longTokenUrl = new URL(`https://graph.facebook.com/${config.apiVersion}/oauth/access_token`);
    longTokenUrl.searchParams.set("grant_type", "fb_exchange_token");
    longTokenUrl.searchParams.set("client_id", config.appId);
    longTokenUrl.searchParams.set("client_secret", config.appSecret);
    longTokenUrl.searchParams.set("fb_exchange_token", shortToken.access_token);
    const longToken = await metaJson<TokenResponse>(longTokenUrl.toString());

    const fields = "id,name,access_token,instagram_business_account{id,username}";
    const [profile, pages] = await Promise.all([
      metaJson<MeResponse>(`https://graph.facebook.com/${config.apiVersion}/me?fields=id,name&access_token=${encodeURIComponent(longToken.access_token)}`),
      metaJson<PageResponse>(`https://graph.facebook.com/${config.apiVersion}/me/accounts?fields=${encodeURIComponent(fields)}&access_token=${encodeURIComponent(longToken.access_token)}`),
    ]);
    const connection: MetaConnection = {
      connectedAt: new Date().toISOString(),
      userId: profile.id,
      userName: profile.name,
      userAccessToken: longToken.access_token,
      pages: pages.data.map((page) => ({ id: page.id, name: page.name, accessToken: page.access_token, instagram: page.instagram_business_account || null })),
    };
    await writeMetaConnection(user.id, connection);
    return finish(connection.pages.length ? "connected" : "no-pages");
  } catch (error) {
    console.error("Meta connection failed", error);
    return finish("failed");
  }
}
