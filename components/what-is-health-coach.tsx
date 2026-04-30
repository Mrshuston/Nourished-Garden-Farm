export default function WhatIsHealthCoach() {
  const features = [
    {
      title: "Simple Food Support",
      description:
        "Budget-friendly meal recipes, healthy swaps, grocery ideas, and realistic meal routines.",
    },
    {
      title: "Healthy Routines",
      description:
        "Support with mornings, bedtime, school days, family schedules, movement, and consistency.",
    },
    {
      title: "Accountability",
      description:
        "Encouragement, check-ins, and simple next steps so you do not have to figure it out alone.",
    },
  ];

  return (
    <section className="bg-secondary px-6 py-16">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">
          What does a health coach do?
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-secondary-foreground">
          A health coach helps you create better habits around food, movement,
          sleep, stress, routines, and family wellness. Instead of giving you a
          strict diet or making you feel judged, health coaching gives you
          support, accountability, and a step-by-step plan that fits your real
          life and budget.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl bg-background p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 text-secondary-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
