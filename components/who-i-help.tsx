"use client";

import { useState } from "react";

const groups = {
  women: {
    label: "Women",
    title: "Health Coaching for Women",
    description:
      "Support for energy, stress, weight goals, hormones, meal routines, sleep, and building habits that work in every season of life.",
  },
  men: {
    label: "Men",
    title: "Health Coaching for Men",
    description:
      "Simple support for strength, energy, better meals, weight goals, movement, sleep, and realistic daily routines.",
  },
  kids: {
    label: "Kids",
    title: "Health Coaching for Kids",
    description:
      "Gentle support for picky eating, balanced meals, routines, sleep, movement, and helping kids build healthy habits early.",
  },
  adhd: {
    label: "ADHD / ADD",
    title: "Support for Kids with ADHD or ADD",
    description:
      "Affordable support with food routines, protein-rich meals, screen-time rhythm, movement breaks, emotional regulation, and calmer family structure.",
  },
  autism: {
    label: "Autism",
    title: "Support for Kids with Autism",
    description:
      "Gentle, respectful support for routines, sensory-friendly meals, food preferences, structure, calm transitions, and family wellness.",
  },
  families: {
    label: "Families",
    title: "Health Coaching for Families",
    description:
      "Whole-family support to make healthy living easier, affordable, and less overwhelming with simple meals, routines, and realistic goals.",
  },
} as const;

type GroupKey = keyof typeof groups;

export default function WhoIHelp() {
  const [activeTab, setActiveTab] = useState<GroupKey>("women");

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Who I help
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-secondary-foreground">
            Coaching is available for everyone — women, men, children with and
            without ADHD, ADD, or Autism, and full families who want a healthier
            home.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {(Object.entries(groups) as [GroupKey, (typeof groups)[GroupKey]][]).map(
            ([key, group]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                  activeTab === key
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground shadow-sm hover:bg-secondary"
                }`}
              >
                {group.label}
              </button>
            )
          )}
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-border bg-background p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-foreground">
            {groups[activeTab].title}
          </h3>
          <p className="mt-4 text-lg leading-8 text-secondary-foreground">
            {groups[activeTab].description}
          </p>
        </div>
      </div>
    </section>
  );
}
