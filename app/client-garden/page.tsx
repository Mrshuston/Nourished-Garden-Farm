import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { isOwnerEmail } from "@/lib/client-garden";
import { ClientGardenDashboard } from "@/components/client-garden-dashboard";
import { MetaConnectionCard } from "@/components/meta-connection-card";

export const metadata: Metadata = { title: "Nourished Client Garden" };

export default async function ClientGardenPage() {
  const { data: { user } } = await (await createClient()).auth.getUser();
  if (!user) redirect("/sign-in?next=/client-garden");
  if (!isOwnerEmail(user.email)) redirect("/members");

  return (
    <main className="client-garden-page">
      <section className="client-garden-hero">
        <div>
          <p className="eyebrow">Private business dashboard</p>
          <h1>Nourished Client Garden</h1>
          <p>Plant new leads, nurture conversations, plan your content and grow your monthly coaching revenue.</p>
        </div>
        <span aria-hidden="true">🌱</span>
      </section>
      <MetaConnectionCard />
      <ClientGardenDashboard />
    </main>
  );
}
