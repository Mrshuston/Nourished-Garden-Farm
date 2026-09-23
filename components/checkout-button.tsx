"use client";

import { useState } from "react";

export function CheckoutButton({ slug, free = false, inquiryOnly = false }: { slug: string; free?: boolean; inquiryOnly?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function startCheckout() {
    if (free) {
      setLoading(true);
      const response = await fetch("/api/free-download", { method: "POST" });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "The guide could not be prepared.");
        setLoading(false);
        return;
      }
      window.location.assign(data.url);
      return;
    }
    setLoading(true);
    setError("");
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "Checkout could not be started.");
      setLoading(false);
      return;
    }
    window.location.assign(data.url);
  }

  if (inquiryOnly) return <a className="button button-primary button-wide" href="https://calendly.com/thenourishedgardens/calm-call" target="_blank" rel="noreferrer">Ask about this program</a>;

  return <div><button className="button button-primary button-wide" onClick={startCheckout} disabled={loading}>{loading ? free ? "Preparing your guide…" : "Opening secure checkout…" : free ? "Download the free guide" : "Buy secure access"}</button>{error && <p className="form-error" role="alert">{error}</p>}</div>;
}
