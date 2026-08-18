import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { appUrl, getStripe } from "@/lib/stripe";

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await currentUser();
  const customerId = user?.publicMetadata.stripeCustomerId;
  if (typeof customerId !== "string") return NextResponse.json({ error: "No Stripe customer is connected to this account yet." }, { status: 400 });
  const session = await getStripe().billingPortal.sessions.create({ customer: customerId, return_url: `${appUrl()}/members` });
  return NextResponse.json({ url: session.url });
}
