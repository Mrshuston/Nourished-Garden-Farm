import { programs, ATTRACTWELL_BASE_URL } from "@/lib/programs";

export default function PricingPlans() {
  return (
    <section id="plans" className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Coaching programs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-secondary-foreground">
            Choose the program that fits your goals, your stage of life, and
            your budget. Sign up securely through AttractWell.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {programs.map((program) => (
            <div
              key={program.slug}
              className={`relative rounded-3xl border bg-background p-7 shadow-sm ${
                program.popular ? "border-primary" : "border-border"
              }`}
            >
              {program.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground">
                {program.name}
              </h3>
              <p className="mt-1 text-sm font-medium uppercase tracking-wide text-muted">
                {program.audience}
              </p>
              <p className="mt-3 text-3xl font-bold text-primary">
                {program.price}
              </p>
              <p className="mt-4 text-secondary-foreground">
                {program.description}
              </p>
              <ul className="mt-6 space-y-3 text-foreground">
                {program.features.map((feature) => (
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
              <a
                href={ATTRACTWELL_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block w-full rounded-full bg-primary px-6 py-3 text-center font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Sign Up
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
