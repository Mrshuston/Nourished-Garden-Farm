import { ATTRACTWELL_BASE_URL } from "@/lib/programs";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div>
          <p className="text-lg font-bold text-foreground">
            The Nourished Garden & Farm
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Affordable Health Coaching
          </p>
        </div>
        <a
          href={ATTRACTWELL_BASE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Get Started
        </a>
      </div>
    </header>
  );
}
