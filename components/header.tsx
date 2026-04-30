"use client";

import { useState } from "react";
import BookingModal from "./booking-modal";

export default function Header() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
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
          <button
            onClick={() => setIsBookingOpen(true)}
            className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Book a Free Call
          </button>
        </div>
      </header>
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
}
