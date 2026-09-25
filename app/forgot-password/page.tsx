"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setSending(true);
    try {
      const response = await fetch("/api/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The email could not be sent.");
      setMessage(result.message);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "The email could not be sent.");
    } finally {
      setSending(false);
    }
  }
  return <main className="auth-page"><section className="auth-card garden-surface"><span className="auth-sprout">🌻</span><p className="eyebrow">Account help</p><h1>Reset your password</h1><p>Enter your email and we’ll send you a secure reset link.</p><form onSubmit={submit}><label>Email address<input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label><button className="button button-primary button-wide" disabled={sending}>{sending ? "Sending…" : "Send reset link"}</button></form>{message && <p className="form-success">{message}</p>}{error && <p className="form-error">{error}</p>}<div className="auth-links"><Link href="/sign-in">Back to sign in</Link></div></section></main>;
}
