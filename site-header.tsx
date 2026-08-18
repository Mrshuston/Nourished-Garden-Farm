"use client";

import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="The Nourished Garden and Farm home">
        <span className="brand-mark">🌻</span>
        <span><strong>The Nourished Garden</strong><small>&amp; Farm</small></span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/#about">About</Link>
        <Link href="/programs">Programs</Link>
        <Link href="/#coaching">Coaching</Link>
        <Link href="/members">Member Garden</Link>
      </nav>
      <div className="header-actions">
        <Show when="signed-out"><SignInButton mode="modal"><button className="button button-ghost">Sign in</button></SignInButton></Show>
        <Show when="signed-in"><Link className="button button-ghost" href="/members">My programs</Link><UserButton /></Show>
        <a className="button button-primary" href="https://calendly.com/thenourishedgardens/calm-call" target="_blank" rel="noreferrer">Book a free call</a>
      </div>
    </header>
  );
}
