import { clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

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
    const userId = session.metadata?.clerkUserId;
    const programSlug = session.metadata?.programSlug;
    if (userId && programSlug) {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      const currentPrograms = Array.isArray(user.publicMetadata.programs) ? user.publicMetadata.programs.filter((value): value is string => typeof value === "string") : [];
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          ...user.publicMetadata,
          programs: Array.from(new Set([...currentPrograms, programSlug])),
          stripeCustomerId: typeof session.customer === "string" ? session.customer : undefined,
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}
