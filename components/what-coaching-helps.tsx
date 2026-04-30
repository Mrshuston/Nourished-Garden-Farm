export default function WhatCoachingHelps() {
  const helpItems = [
    "Eating healthier on a budget",
    "Meal recipes and simple food swaps",
    "Picky eating support",
    "ADHD, ADD, and Autism-friendly routines",
    "Family wellness and structure",
    "Stress, sleep, and energy habits",
    "Weight and wellness goals",
    "Healthy habits for kids",
    "Accountability and encouragement",
  ];

  return (
    <section className="bg-accent px-6 py-16 text-accent-foreground">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          What coaching can help with
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {helpItems.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl bg-accent-foreground/10 p-4"
            >
              <svg
                className="h-5 w-5 shrink-0"
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
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
