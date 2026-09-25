"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function finishSignIn() {
      const supabase = createClient();
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      const next = searchParams.get("next") || "/members";
      let authError: Error | null = null;

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        authError = error;
      } else {
        const hash = new URLSearchParams(window.location.hash.slice(1));
        const accessToken = hash.get("access_token");
        const refreshToken = hash.get("refresh_token");

        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          authError = error;
        } else {
          const { data } = await supabase.auth.getSession();
          if (!data.session) authError = new Error("This reset link is invalid or has expired.");
        }
      }

      if (!active) return;
      if (authError) {
        setError(authError.message);
        return;
      }

      router.replace(next);
      router.refresh();
    }

    finishSignIn();
    return () => {
      active = false;
    };
  }, [router]);

  return (
    <main className="auth-page">
      <section className="auth-card garden-surface">
        <p className="eyebrow">Account help</p>
        <h1>{error ? "Reset link problem" : "Opening your secure reset link"}</h1>
        {error ? (
          <>
            <p className="form-error">{error}</p>
            <a className="button button-primary button-wide" href="/forgot-password">
              Send a new reset link
            </a>
          </>
        ) : (
          <p>Please wait while we securely open the password page.</p>
        )}
      </section>
    </main>
  );
}
