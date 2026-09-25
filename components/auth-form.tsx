"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    const supabase = createClient();
    if (mode === "sign-up") {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name.trim() },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/members`,
        },
      });
      if (signUpError) setError(signUpError.message);
      else setMessage("Check your email to confirm your account, then return to the Member Garden.");
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) setError("That email or password did not work. Please try again or reset your password.");
      else {
        router.push(searchParams.get("next") || "/members");
        router.refresh();
      }
    }
    setBusy(false);
  }

  return (
    <section className="auth-card garden-surface">
      <span className="auth-sprout">🌱</span>
      <p className="eyebrow">The Member Garden</p>
      <h1>{mode === "sign-up" ? "Create your account" : "Welcome back"}</h1>
      <p>{mode === "sign-up" ? "Create a free account to access your programs and resources." : "Sign in to continue growing at your own pace."}</p>
      <form onSubmit={submit}>
        {mode === "sign-up" && <label>First name<input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} /></label>}
        <label>Email address<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <label>Password<input required minLength={8} type="password" autoComplete={mode === "sign-up" ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} /></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        {message && <p className="form-success" role="status">{message}</p>}
        <button className="button button-primary button-wide" disabled={busy}>{busy ? "Please wait…" : mode === "sign-up" ? "Create account" : "Sign in"}</button>
      </form>
      <div className="auth-links">
        {mode === "sign-in" ? <><Link href="/forgot-password">Forgot password?</Link><span>New here? <Link href="/sign-up">Create an account</Link></span></> : <span>Already have an account? <Link href="/sign-in">Sign in</Link></span>}
      </div>
    </section>
  );
}
