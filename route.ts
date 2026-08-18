import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Please sign in so the guide can be added to your member garden." }, { status: 401 });
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const client = await clerkClient();
  const record = await client.users.getUser(userId);
  const existing = Array.isArray(record.publicMetadata.programs) ? record.publicMetadata.programs.filter((value): value is string => typeof value === "string") : [];
  await client.users.updateUserMetadata(userId, { publicMetadata: { ...record.publicMetadata, programs: Array.from(new Set([...existing, "calmer-family-week"])) } });

  if (process.env.RESEND_API_KEY && email) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.DOWNLOAD_FROM_EMAIL || "downloads@updates.nourished-garden-health.com", to: ["thenourishedgardens@gmail.com"], subject: "New free guide download", text: `${user?.fullName || "A visitor"} (${email}) downloaded 5 Simple Changes for a Calmer Family Week.` }),
    });
  }
  return NextResponse.json({ url: "/downloads/calmer-family-week.txt" });
}
