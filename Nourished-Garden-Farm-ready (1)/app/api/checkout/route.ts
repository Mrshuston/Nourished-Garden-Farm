import { randomBytes } from "crypto";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { appUrl, getStripe } from "@/lib/stripe";
import { getProgram } from "@/lib/programs";
import type Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Please sign in before purchasing." }, { status: 401 });

  const { slug } = (await request.json()) as { slug?: string };
  const program = slug ? getProgram(slug) : undefined;
  if (!program || program.free || !program.priceEnv) return NextResponse.json({ error: "That program is not available for checkout." }, { status: 400 });
  const priceId = process.env[program.priceEnv];
  if (!priceId || priceId === "price_replace_me") return NextResponse.json({ error: "This program is being prepared for sale. Please book a free call for help." }, { status: 503 });

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const stripe = getStripe();
  const checkoutParams = {
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    client_reference_id: userId,
    customer_email: email,
    metadata: { clerkUserId: userId, programSlug: program.slug },
    integration_identifier: `nourished-garden-${randomBytes(4).toString("hex")}`,
    success_url: `${appUrl()}/members?purchase=success`,
    cancel_url: `${appUrl()}/programs/${program.slug}?checkout=cancelled`,
  } as Stripe.Checkout.SessionCreateParams & { integration_identifier: string };
  const session = await stripe.checkout.sessions.create(checkoutParams);

  return NextResponse.json({ url: session.url });
}
