import { NextResponse } from "next/server";
import { appUrl, getStripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const { data: { user } } = await (await createClient()).auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const customerId = user.user_metadata.stripeCustomerId;
  if (typeof customerId !== "string") return NextResponse.json({ error: "No Stripe customer is connected to this account yet." }, { status: 400 });
  const session = await getStripe().billingPortal.sessions.create({ customer: customerId, return_url: `${appUrl()}/members` });
  return NextResponse.json({ url: session.url });
}
