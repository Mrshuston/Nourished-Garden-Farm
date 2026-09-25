import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST() {
  const { data: { user } } = await (await createClient()).auth.getUser();
  if (!user) return NextResponse.json({ error: "Please sign in so the guide can be added to your member garden." }, { status: 401 });
  const email = user.email;
  const existing = Array.isArray(user.user_metadata.programs) ? user.user_metadata.programs.filter((value: unknown): value is string => typeof value === "string") : [];
  await createAdminClient().auth.admin.updateUserById(user.id, { user_metadata: { ...user.user_metadata, programs: Array.from(new Set([...existing, "calmer-family-week"])) } });

  if (process.env.RESEND_API_KEY && email) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.DOWNLOAD_FROM_EMAIL || "downloads@updates.nourished-garden-health.com", to: ["thenourishedgardens@gmail.com"], subject: "New free guide download", text: `${user.user_metadata.full_name || "A visitor"} (${email}) downloaded 5 Simple Changes for a Calmer Family Week.` }),
    });
  }
  return NextResponse.json({ url: "/downloads/calmer-family-week.txt" });
}
