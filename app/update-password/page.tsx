"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { error: updateError } = await createClient().auth.updateUser({ password });
    if (updateError) setError(updateError.message); else { router.push("/members"); router.refresh(); }
  }
  return <main className="auth-page"><section className="auth-card garden-surface"><p className="eyebrow">Account help</p><h1>Choose a new password</h1><form onSubmit={submit}><label>New password<input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>{error && <p className="form-error">{error}</p>}<button className="button button-primary button-wide">Update password</button></form></section></main>;
}
