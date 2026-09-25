"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await createClient().auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/callback?next=/update-password` });
    setMessage("If an account exists for that email, a password-reset link is on its way.");
  }
  return <main className="auth-page"><section className="auth-card garden-surface"><span className="auth-sprout">🌻</span><p className="eyebrow">Account help</p><h1>Reset your password</h1><p>Enter your email and we’ll send you a secure reset link.</p><form onSubmit={submit}><label>Email address<input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label><button className="button button-primary button-wide">Send reset link</button></form>{message && <p className="form-success">{message}</p>}<div className="auth-links"><Link href="/sign-in">Back to sign in</Link></div></section></main>;
}
