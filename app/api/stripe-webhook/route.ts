import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = (await headers()).get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) return NextResponse.json({ error: "Webhook is not configured." }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(await request.text(), signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if (session.payment_status !== "paid") return NextResponse.json({ received: true });
    const userId = session.metadata?.supabaseUserId;
    const programSlug = session.metadata?.programSlug;
    if (userId && programSlug) {
      const admin = createAdminClient();
      const { data } = await admin.auth.admin.getUserById(userId);
      const user = data.user;
      if (user) {
        const currentPrograms = Array.isArray(user.user_metadata.programs) ? user.user_metadata.programs.filter((value: unknown): value is string => typeof value === "string") : [];
        await admin.auth.admin.updateUserById(userId, {
          user_metadata: {
          ...user.user_metadata,
          programs: Array.from(new Set([...currentPrograms, programSlug])),
          stripeCustomerId: typeof session.customer === "string" ? session.customer : undefined,
        },
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
