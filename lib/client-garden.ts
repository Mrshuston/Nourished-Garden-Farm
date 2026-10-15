export const CLIENT_GARDEN_BUCKET = "private-business-data";

export type LeadStatus = "New" | "Contacted" | "Call booked" | "Enrolled" | "Not now";
export type SocialStatus = "Idea" | "Draft" | "Scheduled" | "Published";

export type ClientLead = {
  id: string;
  name: string;
  email: string;
  source: string;
  interest: string;
  status: LeadStatus;
  followUpDate: string;
  value: number;
  notes: string;
  createdAt: string;
};

export type SocialPost = {
  id: string;
  platform: string;
  publishDate: string;
  topic: string;
  caption: string;
  status: SocialStatus;
  createdAt: string;
};

export type ClientGardenData = {
  leads: ClientLead[];
  posts: SocialPost[];
  updatedAt: string;
};

export const emptyClientGarden: ClientGardenData = {
  leads: [],
  posts: [],
  updatedAt: "",
};

export function isOwnerEmail(email: string | undefined | null) {
  const ownerEmail = (process.env.OWNER_EMAIL || "thenourishedgardens@gmail.com").trim().toLowerCase();
  return Boolean(email && email.toLowerCase() === ownerEmail);
}

export function sanitizeClientGarden(input: unknown): ClientGardenData {
  const raw = input && typeof input === "object" ? input as Partial<ClientGardenData> : {};
  const leads = Array.isArray(raw.leads) ? raw.leads.slice(0, 250).map((lead): ClientLead | null => {
    if (!lead || typeof lead !== "object") return null;
    const value = lead as Partial<ClientLead>;
    const statuses: LeadStatus[] = ["New", "Contacted", "Call booked", "Enrolled", "Not now"];
    return {
      id: String(value.id || crypto.randomUUID()).slice(0, 80),
      name: String(value.name || "").slice(0, 120),
      email: String(value.email || "").slice(0, 200),
      source: String(value.source || "").slice(0, 100),
      interest: String(value.interest || "").slice(0, 160),
      status: statuses.includes(value.status as LeadStatus) ? value.status as LeadStatus : "New",
      followUpDate: String(value.followUpDate || "").slice(0, 10),
      value: Number.isFinite(Number(value.value)) ? Math.max(0, Math.min(100000, Number(value.value))) : 0,
      notes: String(value.notes || "").slice(0, 1500),
      createdAt: String(value.createdAt || new Date().toISOString()).slice(0, 30),
    };
  }).filter((lead): lead is ClientLead => Boolean(lead)) : [];

  const posts = Array.isArray(raw.posts) ? raw.posts.slice(0, 250).map((post): SocialPost | null => {
    if (!post || typeof post !== "object") return null;
    const value = post as Partial<SocialPost>;
    const statuses: SocialStatus[] = ["Idea", "Draft", "Scheduled", "Published"];
    return {
      id: String(value.id || crypto.randomUUID()).slice(0, 80),
      platform: String(value.platform || "Facebook & Instagram").slice(0, 80),
      publishDate: String(value.publishDate || "").slice(0, 10),
      topic: String(value.topic || "").slice(0, 180),
      caption: String(value.caption || "").slice(0, 4000),
      status: statuses.includes(value.status as SocialStatus) ? value.status as SocialStatus : "Idea",
      createdAt: String(value.createdAt || new Date().toISOString()).slice(0, 30),
    };
  }).filter((post): post is SocialPost => Boolean(post)) : [];

  return { leads, posts, updatedAt: new Date().toISOString() };
}
