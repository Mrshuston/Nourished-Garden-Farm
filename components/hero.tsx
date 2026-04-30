"use client";

import { useState } from "react";
import BookingModal from "./booking-modal";

export default function Hero() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <section className="px-6 py-20 text-center md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Health coaching for real life
          </p>
          <h1 className="text-balance text-4xl font-bold leading-tight text-foreground md:text-6xl">
            Affordable health coaching for women, men, kids, and families.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-secondary-foreground">
            The Nourished Garden & Farm helps people of all ages build healthier
            lives with simple routines, affordable meal recipes, family support,
            and realistic coaching that meets you where you are.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book Your Free Health Call
            </button>
            <a
              href="#plans"
              className="rounded-full border border-primary px-8 py-4 font-semibold text-accent transition-colors hover:bg-secondary"
            >
              View Affordable Plans
            </a>
          </div>
        </div>
      </section>
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
}
