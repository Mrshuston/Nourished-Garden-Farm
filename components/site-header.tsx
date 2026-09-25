"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { SignOutButton } from "@/components/sign-out-button";

export function SiteHeader() {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setSignedIn(Boolean(data.user)));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(Boolean(session?.user)));
    return () => data.subscription.unsubscribe();
  }, []);
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="The Nourished Garden and Farm home">
        <span className="brand-mark">🌻</span>
        <span><strong>The Nourished Garden</strong><small>&amp; Farm</small></span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/#about">About</Link>
        <Link href="/programs">Programs</Link>
        <Link href="/program-finder">Find my program</Link>
        <Link href="/#coaching">Coaching</Link>
        <Link href="/members">Member Garden</Link>
      </nav>
      <div className="header-actions">
        {!signedIn && <Link className="button button-ghost" href="/sign-in">Sign in</Link>}
        {signedIn && <><Link className="button button-ghost" href="/members">My programs</Link><SignOutButton /></>}
        <a className="button button-primary" href="https://calendly.com/thenourishedgardens/calm-call" target="_blank" rel="noreferrer">Book a free call</a>
      </div>
    </header>
  );
}
