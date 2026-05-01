"use client";

import React, { useState } from "react";

export default function NourishedGardenWebsite() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const calendlyLink = "https://calendly.com/thenourishedgardens/calm-call";

  const groups = [
    {
      icon: "👩",
      title: "Women",
      text: "Hormone balance, energy, weight support, stress management & more.",
    },
    {
      icon: "👨",
      title: "Men",
      text: "Build strength, boost energy, improve nutrition & daily habits.",
    },
    {
      icon: "😊",
      title: "Kids",
      text: "Better nutrition, healthy routines, picky eating support & more.",
    },
    {
      icon: "🧠",
      title: "ADHD / ADD",
      text: "Nutrition & lifestyle strategies for focus, behavior & calm.",
    },
    {
      icon: "🧩",
      title: "Autism",
      text: "Gentle, practical support for nutrition, routines & sensory needs.",
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Families",
      text: "Support for the whole family to create a healthier, happier home.",
    },
  ];

  const plans = [
    {
      title: "Starter Plan",
      price: "$49",
      term: "/month",
      features: ["Basic nutrition guidance", "Healthy habits guide", "Email support"],
      button: "Get Started",
    },
    {
      title: "Coaching Plan",
      price: "$97",
      term: "/month",
      features: ["Weekly coaching calls", "Personalized plan", "Habit & mindset support", "Priority email support"],
      button: "Choose This Plan",
      popular: true,
    },
    {
      title: "Family Plan",
      price: "$147",
      term: "/month",
      features: ["Coaching for the whole family", "Meal & routine support", "Kids support (ADHD/ADD/Autism)", "Priority support"],
      button: "Choose This Plan",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fbf7ee] text-[#1f2f16]">
      <header className="sticky top-0 z-40 border-b border-[#e5dbc8] bg-[#fbf7ee]/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <a href="#home" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="The Nourished Garden & Farm logo"
              className="h-20 w-auto object-contain"
            />
          </a>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#2d381f] md:flex">
            <a className="border-b-2 border-[#4d642d] pb-1 text-[#4d642d]" href="#home">Home</a>
            <a className="hover:text-[#4d642d]" href="#about">About</a>
            <a className="hover:text-[#4d642d]" href="#coaching">Coaching</a>
            <a className="hover:text-[#4d642d]" href="#plans">Plans & Pricing</a>
            <a className="hover:text-[#4d642d]" href="#resources">Resources</a>
            <a className="hover:text-[#4d642d]" href="#contact">Contact</a>
          </nav>

          <button
            onClick={() => setIsBookingOpen(true)}
            className="rounded-lg bg-[#38551f] px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-[#2d4319]"
          >
            📅 Book a Free Call
          </button>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden border-b border-[#e5dbc8]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 80% 35%, rgba(127,148,100,0.25), transparent 35%), linear-gradient(90deg, #fbf7ee 0%, #fbf7ee 46%, rgba(251,247,238,0.35) 65%, rgba(251,247,238,0) 100%)",
          }}
        />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-[0.95fr_1.05fr] md:py-24">
          <div className="relative z-10">
            <h1 className="font-serif text-5xl font-bold leading-tight text-[#2e4a23] md:text-7xl">
              Health Coaching
              <span className="block italic">for Everyone. ♡</span>
            </h1>
            <p className="mt-8 max-w-xl text-xl leading-8 text-[#2f3328]">
              Simple, affordable support for women, men, kids with and without ADHD, ADD, Autism, and families of all ages.
            </p>
            <p className="mt-4 text-lg font-medium text-[#2f3328]">
              Better health. Less stress. A life that feels good.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="rounded-lg bg-[#38551f] px-8 py-4 font-bold text-white shadow-md hover:bg-[#2d4319]"
              >
                📅 Book Your Free Call
              </button>
              <a
                href="#about"
                className="rounded-lg border border-[#a99a80] bg-[#fbf7ee] px-8 py-4 text-center font-bold text-[#38551f] hover:bg-[#efe3d3]"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="relative z-10 min-h-[420px] overflow-hidden rounded-[2rem] bg-[#d8c7a8] shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#e9ddc5] via-[#c9d4a7] to-[#6f8a4e]" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#466331] to-transparent" />
            <div className="absolute left-10 top-12 max-w-xs rounded-3xl bg-white/70 p-5 shadow-lg backdrop-blur">
              <p className="font-serif text-2xl font-bold text-[#2e4a23]">A healthier home starts with small steps.</p>
            </div>
            <div className="absolute bottom-10 right-8 rounded-2xl border border-white/50 bg-[#5c452b]/80 p-5 text-center text-xl font-bold uppercase leading-7 text-white shadow-lg">
              Nourish<br />Your Body<br />Grow Your<br />Life
            </div>
            <div className="absolute bottom-8 left-8 right-44 rounded-full bg-[#fbf7ee]/80 p-4 shadow-lg">
              <p className="text-center font-serif text-2xl font-bold text-[#2e4a23]">Women • Men • Kids • Families</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-b border-[#e5dbc8] bg-[#f4ecdc] px-6 py-12">
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[0.8fr_1.2fr_1fr]">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-3xl font-bold italic text-[#2e4a23] md:text-4xl">
              What is<br />Health Coaching?
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-32 bg-[#647b45] md:mx-0" />
          </div>

          <div className="text-base leading-8 text-[#2f3328]">
            <p>
              Health coaching helps you build simple, sustainable habits around nutrition, movement, sleep, stress, and mindset.
            </p>
            <p className="mt-3">
              No strict diets. No quick fixes. Just real-life strategies that work for you and your family.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center text-sm font-semibold md:grid-cols-4">
            {[
              ["🌿", "Nutrition\nGuidance"],
              ["🧘", "Healthy\nHabits"],
              ["🧠", "Mindset &\nStress Support"],
              ["👨‍👩‍👧‍👦", "Whole Family\nWellness"],
            ].map(([icon, label]) => (
              <div key={label} className="border-l border-[#d8cbb7] px-3">
                <div className="text-4xl">{icon}</div>
                <p className="mt-2 whitespace-pre-line">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="coaching" className="px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="font-serif text-4xl font-bold text-[#2e4a23]">Who We Help</h2>
          <div className="mx-auto mt-3 h-[2px] w-28 bg-[#647b45]" />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {groups.map((group) => (
              <div key={group.title} className="rounded-xl border border-[#e1d7c5] bg-[#fffdf8] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="text-5xl">{group.icon}</div>
                <h3 className="mt-4 font-serif text-2xl font-bold text-[#2e4a23]">{group.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#2f3328]">{group.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="px-6 pb-16">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-serif text-4xl font-bold text-[#2e4a23]">Affordable Coaching Plans</h2>
          <p className="mt-3 text-lg text-[#2f3328]">Choose the plan that fits your needs and your budget.</p>

          <div className="mt-10 grid gap-7 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.title}
                className={`relative rounded-xl border bg-[#fffdf8] p-8 text-left shadow-sm ${
                  plan.popular ? "border-[#38551f] shadow-lg" : "border-[#e1d7c5]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute right-0 top-0 rounded-bl-xl rounded-tr-xl bg-[#38551f] px-4 py-2 text-xs font-bold uppercase text-white">
                    Most Popular
                  </div>
                )}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#8ca16f] text-2xl">🌿</div>
                <h3 className="font-serif text-2xl font-bold text-[#2e4a23]">{plan.title}</h3>
                <p className="mt-1 text-3xl font-bold text-[#1f2f16]">
                  {plan.price}<span className="text-base font-normal text-[#5d5144]"> {plan.term}</span>
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-6">
                  {plan.features.map((feature) => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="mt-8 w-full rounded-md bg-[#38551f] px-5 py-3 text-sm font-bold text-white hover:bg-[#2d4319]"
                >
                  {plan.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#38551f] px-6 py-10 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-serif text-3xl font-bold">Ready to Take the First Step?</h2>
            <p className="mt-2 text-[#f1eadc]">Book a free call and let&apos;s create a simple plan to help you and your family thrive.</p>
          </div>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="rounded-lg bg-[#c4a05d] px-8 py-4 font-bold text-white shadow-md hover:bg-[#af8d4f]"
          >
            📅 Book Your Free Call
          </button>
        </div>
      </section>

      <footer className="bg-[#fbf7ee] px-6 py-5 text-center text-xs text-[#5d5144]">
        <p>Health coaching is not intended to diagnose, treat, cure, or prevent any disease. Results vary for each individual.</p>
        <p className="mt-2">© {new Date().getFullYear()} The Nourished Garden & Farm</p>
      </footer>

      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
          <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-[#fbf7ee] p-6 shadow-2xl">
            <button
              onClick={() => setIsBookingOpen(false)}
              className="absolute right-4 top-4 rounded-full bg-white px-3 py-2 text-xl shadow hover:bg-[#efe3d3]"
              aria-label="Close booking popup"
            >
              ×
            </button>
            <div className="mb-6">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#efe3d3] px-4 py-2 text-sm font-semibold text-[#38551f]">
                📅 Free Health Coaching Call
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#2e4a23]">Book your free call</h2>
              <p className="mt-3 text-[#5d5144]">Choose a time that works for you using the calendar below.</p>
            </div>
            <iframe
              title="Calendly booking calendar"
              src={calendlyLink}
              width="100%"
              height="700"
              frameBorder="0"
              className="rounded-2xl bg-white"
            />
          </div>
        </div>
      )}
    </main>
  );
}
            <a className="hover:text-[#4d642d]" href="#coaching">Coaching</a>
            <a className="hover:text-[#4d642d]" href="#plans">Plans & Pricing</a>
            <a className="hover:text-[#4d642d]" href="#resources">Resources</a>
            <a className="hover:text-[#4d642d]" href="#contact">Contact</a>
          </nav>

          <button
            onClick={() => setIsBookingOpen(true)}
            className="rounded-lg bg-[#38551f] px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-[#2d4319]"
          >
            📅 Book a Free Call
          </button>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden border-b border-[#e5dbc8]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_35%,rgba(127,148,100,0.25),transparent_35%),linear-gradient(90deg,#fbf7ee_0%,#fbf7ee_46%,rgba(251,247,238,0.35)_65%,rgba(251,247,238,0)_100%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-[0.95fr_1.05fr] md:py-24">
          <div className="relative z-10">
            <h1 className="font-serif text-5xl font-bold leading-tight text-[#2e4a23] md:text-7xl">
              Health Coaching
              <span className="block italic">for Everyone. ♡</span>
            </h1>
            <p className="mt-8 max-w-xl text-xl leading-8 text-[#2f3328]">
              Simple, affordable support for women, men, kids with and without ADHD, ADD, Autism, and families of all ages.
            </p>
            <p className="mt-4 text-lg font-medium text-[#2f3328]">
              Better health. Less stress. A life that feels good.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="rounded-lg bg-[#38551f] px-8 py-4 font-bold text-white shadow-md hover:bg-[#2d4319]"
              >
                📅 Book Your Free Call
              </button>
              <a
                href="#about"
                className="rounded-lg border border-[#a99a80] bg-[#fbf7ee] px-8 py-4 text-center font-bold text-[#38551f] hover:bg-[#efe3d3]"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="relative z-10 min-h-[420px] overflow-hidden rounded-[2rem] bg-[#d8c7a8] shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#e9ddc5] via-[#c9d4a7] to-[#6f8a4e]" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#466331] to-transparent" />
            <div className="absolute left-10 top-12 max-w-xs rounded-3xl bg-white/70 p-5 shadow-lg backdrop-blur">
              <p className="font-serif text-2xl font-bold text-[#2e4a23]">A healthier home starts with small steps.</p>
            </div>
            <div className="absolute bottom-10 right-8 rounded-2xl border border-white/50 bg-[#5c452b]/80 p-5 text-center text-xl font-bold uppercase leading-7 text-white shadow-lg">
              Nourish<br />Your Body<br />Grow Your<br />Life
            </div>
            <div className="absolute bottom-8 left-8 right-44 rounded-full bg-[#fbf7ee]/80 p-4 shadow-lg">
              <p className="text-center font-serif text-2xl font-bold text-[#2e4a23]">Women • Men • Kids • Families</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-b border-[#e5dbc8] bg-[#f4ecdc] px-6 py-12">
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[0.8fr_1.2fr_1fr]">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-3xl font-bold italic text-[#2e4a23] md:text-4xl">
              What is<br />Health Coaching?
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-32 bg-[#647b45] md:mx-0" />
          </div>

          <div className="text-base leading-8 text-[#2f3328]">
            <p>
              Health coaching helps you build simple, sustainable habits around nutrition, movement, sleep, stress, and mindset.
            </p>
            <p className="mt-3">
              No strict diets. No quick fixes. Just real-life strategies that work for you and your family.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center text-sm font-semibold md:grid-cols-4">
            {[
              ["🌿", "Nutrition\nGuidance"],
              ["🧘", "Healthy\nHabits"],
              ["🧠", "Mindset &\nStress Support"],
              ["👨‍👩‍👧‍👦", "Whole Family\nWellness"],
            ].map(([icon, label]) => (
              <div key={label} className="border-l border-[#d8cbb7] px-3">
                <div className="text-4xl">{icon}</div>
                <p className="mt-2 whitespace-pre-line">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="coaching" className="px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="font-serif text-4xl font-bold text-[#2e4a23]">Who We Help</h2>
          <div className="mx-auto mt-3 h-[2px] w-28 bg-[#647b45]" />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {groups.map((group) => (
              <div key={group.title} className="rounded-xl border border-[#e1d7c5] bg-[#fffdf8] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="text-5xl">{group.icon}</div>
                <h3 className="mt-4 font-serif text-2xl font-bold text-[#2e4a23]">{group.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#2f3328]">{group.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="px-6 pb-16">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-serif text-4xl font-bold text-[#2e4a23]">Affordable Coaching Plans</h2>
          <p className="mt-3 text-lg text-[#2f3328]">Choose the plan that fits your needs and your budget.</p>

          <div className="mt-10 grid gap-7 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.title}
                className={`relative rounded-xl border bg-[#fffdf8] p-8 text-left shadow-sm ${
                  plan.popular ? "border-[#38551f] shadow-lg" : "border-[#e1d7c5]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute right-0 top-0 rounded-bl-xl rounded-tr-xl bg-[#38551f] px-4 py-2 text-xs font-bold uppercase text-white">
                    Most Popular
                  </div>
                )}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#8ca16f] text-2xl">🌿</div>
                <h3 className="font-serif text-2xl font-bold text-[#2e4a23]">{plan.title}</h3>
                <p className="mt-1 text-3xl font-bold text-[#1f2f16]">
                  {plan.price}<span className="text-base font-normal text-[#5d5144]"> {plan.term}</span>
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-6">
                  {plan.features.map((feature) => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="mt-8 w-full rounded-md bg-[#38551f] px-5 py-3 text-sm font-bold text-white hover:bg-[#2d4319]"
                >
                  {plan.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#38551f] px-6 py-10 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-serif text-3xl font-bold">Ready to Take the First Step?</h2>
            <p className="mt-2 text-[#f1eadc]">Book a free call and let&apos;s create a simple plan to help you and your family thrive.</p>
          </div>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="rounded-lg bg-[#c4a05d] px-8 py-4 font-bold text-white shadow-md hover:bg-[#af8d4f]"
          >
            📅 Book Your Free Call
          </button>
        </div>
      </section>

      <footer className="bg-[#fbf7ee] px-6 py-5 text-center text-xs text-[#5d5144]">
        <p>Health coaching is not intended to diagnose, treat, cure, or prevent any disease. Results vary for each individual.</p>
        <p className="mt-2">© {new Date().getFullYear()} The Nourished Garden & Farm</p>
      </footer>

      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
          <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-[#fbf7ee] p-6 shadow-2xl">
            <button
              onClick={() => setIsBookingOpen(false)}
              className="absolute right-4 top-4 rounded-full bg-white px-3 py-2 text-xl shadow hover:bg-[#efe3d3]"
              aria-label="Close booking popup"
            >
              ×
            </button>
            <div className="mb-6">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#efe3d3] px-4 py-2 text-sm font-semibold text-[#38551f]">
                📅 Free Health Coaching Call
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#2e4a23]">Book your free call</h2>
              <p className="mt-3 text-[#5d5144]">Choose a time that works for you using the calendar below.</p>
            </div>
            <iframe
              title="Calendly booking calendar"
              src={calendlyLink}
              width="100%"
              height="700"
              frameBorder="0"
              className="rounded-2xl bg-white"
            />
          </div>
        </div>
      )}
    </main>
  );
}
