import { createAdminClient } from "@/lib/supabase/admin";
import { CLIENT_GARDEN_BUCKET } from "@/lib/client-garden";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

export const META_CONNECTION_FILE = "meta-connection.json";

export type MetaPageConnection = {
  id: string;
  name: string;
  accessToken: string;
  instagram?: { id: string; username?: string } | null;
};

export type MetaConnection = {
  connectedAt: string;
  userId: string;
  userName: string;
  userAccessToken: string;
  pages: MetaPageConnection[];
};

type EncryptedMetaConnection = {
  v: 1;
  iv: string;
  tag: string;
  data: string;
};

export function getMetaConfig() {
  const appId = process.env.META_APP_ID?.trim();
  const appSecret = process.env.META_APP_SECRET?.trim();
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://www.nourished-garden-health.com").replace(/\/$/, "");
  const apiVersion = process.env.META_GRAPH_API_VERSION || "v26.0";
  if (!appId || !appSecret) return null;
  return { appId, appSecret, appUrl, apiVersion, redirectUri: `${appUrl}/api/meta/callback` };
}

function encryptionKey() {
  const config = getMetaConfig();
  if (!config) throw new Error("Meta integration is not configured.");
  return createHash("sha256").update(config.appSecret).digest();
}

function encryptConnection(connection: MetaConnection): EncryptedMetaConnection {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(connection), "utf8"), cipher.final()]);
  return {
    v: 1,
    iv: iv.toString("base64"),
    tag: cipher.getAuthTag().toString("base64"),
    data: encrypted.toString("base64"),
  };
}

function decryptConnection(payload: EncryptedMetaConnection): MetaConnection {
  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), Buffer.from(payload.iv, "base64"));
  decipher.setAuthTag(Buffer.from(payload.tag, "base64"));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(payload.data, "base64")),
    decipher.final(),
  ]);
  return JSON.parse(decrypted.toString("utf8")) as MetaConnection;
}

async function ensureStorage() {
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

export async function readMetaConnection(ownerId: string): Promise<MetaConnection | null> {
  const admin = await ensureStorage();
  const { data, error } = await admin.storage.from(CLIENT_GARDEN_BUCKET).download(`${ownerId}/${META_CONNECTION_FILE}`);
  if (error) {
    const message = error.message.toLowerCase();
    if (message.includes("not found") || message.includes("object not found")) return null;
    throw error;
  }
  const payload = JSON.parse(await data.text()) as MetaConnection | EncryptedMetaConnection;
  if ("v" in payload && payload.v === 1) return decryptConnection(payload);
  return payload as MetaConnection;
}

export async function writeMetaConnection(ownerId: string, connection: MetaConnection) {
  const admin = await ensureStorage();
  const { error } = await admin.storage.from(CLIENT_GARDEN_BUCKET).upload(
    `${ownerId}/${META_CONNECTION_FILE}`,
    JSON.stringify(encryptConnection(connection)),
    { contentType: "application/json", upsert: true, cacheControl: "0" },
  );
  if (error) throw error;
}

export async function deleteMetaConnection(ownerId: string) {
  const admin = await ensureStorage();
  const { error } = await admin.storage.from(CLIENT_GARDEN_BUCKET).remove([`${ownerId}/${META_CONNECTION_FILE}`]);
  if (error) throw error;
}

export async function metaJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...options, cache: "no-store" });
  const body = await response.json();
  if (!response.ok || body.error) throw new Error(body.error?.message || "Meta returned an unexpected response.");
  return body as T;
}
