import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_RESTRICTED_KEY;
  if (!key) throw new Error("STRIPE_RESTRICTED_KEY is not configured");
  return new Stripe(key, { apiVersion: "2026-06-24.dahlia" as Stripe.LatestApiVersion });
}

export function appUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}
