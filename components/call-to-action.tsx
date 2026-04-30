"use client";

import { useState } from "react";
import BookingModal from "./booking-modal";

export default function CallToAction() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <section className="bg-secondary px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            This is not about perfection.
          </h2>
          <p className="mt-5 text-lg leading-8 text-secondary-foreground">
            This is about helping you take small, steady steps toward better
            health. Whether you are a parent, a busy adult, or caring for a
            child with unique needs, you deserve support that feels simple,
            affordable, and doable.
          </p>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="mt-8 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Book Your Free Call
          </button>
        </div>
      </section>
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
}
