"use client";

import { useState } from "react";
import BookingModal from "./booking-modal";

const plans = [
  {
    name: "Starter Health Plan",
    price: "$97",
    description:
      "A simple starting point for individuals or families who need direction.",
    features: [
      "Health goals review",
      "Simple habit plan",
      "Budget-friendly meal recipes",
      "Next-step checklist",
    ],
  },
  {
    name: "Monthly Coaching Plan",
    price: "$297",
    description:
      "Ongoing support for women, men, kids, or families who want accountability.",
    features: [
      "Weekly coaching support",
      "Custom routines",
      "Affordable grocery guidance",
      "Meal and lifestyle support",
    ],
    popular: true,
  },
  {
    name: "Family Wellness Program",
    price: "$597+",
    description:
      "A deeper program for families who want a complete health reset.",
    features: [
      "8-week coaching plan",
      "Support for kids and adults",
      "ADHD / ADD / Autism-friendly routines",
      "Family wellness plan",
    ],
  },
];

export default function PricingPlans() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <section id="plans" className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Affordable coaching plans
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-secondary-foreground">
              Choose the level of support that fits your needs, your family, and
              your budget.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-3xl border bg-background p-7 shadow-sm ${
                  plan.popular ? "border-primary" : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-foreground">
                  {plan.name}
                </h3>
                <p className="mt-2 text-3xl font-bold text-primary">
                  {plan.price}
                </p>
                <p className="mt-4 text-secondary-foreground">
                  {plan.description}
                </p>
                <ul className="mt-6 space-y-3 text-foreground">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 shrink-0 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="mt-8 w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Book a Free Call
                </button>
              </div>
            ))}
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
