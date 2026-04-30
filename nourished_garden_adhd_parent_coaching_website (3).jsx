"use client";

import React, { useState } from "react";

export default function NourishedGardenWebsite() {
  const [activeTab, setActiveTab] = useState("women");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const calendlyLink = "https://calendly.com/thenourishedgardens/calm-call";

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
  };

  const plans = [
    {
      name: "Starter Health Plan",
      price: "$97",
      description: "A simple starting point for individuals or families who need direction.",
      features: ["Health goals review", "Simple habit plan", "Budget-friendly meal recipes", "Next-step checklist"],
    },
    {
      name: "Monthly Coaching Plan",
      price: "$297",
      description: "Ongoing support for women, men, kids, or families who want accountability.",
      features: ["Weekly coaching support", "Custom routines", "Affordable grocery guidance", "Meal and lifestyle support"],
    },
    {
      name: "Family Wellness Program",
      price: "$597+",
      description: "A deeper program for families who want a complete health reset.",
      features: ["8-week coaching plan", "Support for kids and adults", "ADHD / ADD / Autism-friendly routines", "Family wellness plan"],
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8f3ea] text-[#3e352b]">
      <header className="sticky top-0 z-40 border-b border-[#dfd0bd] bg-[#f8f3ea]/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold">The Nourished Garden & Farm</p>
            <p className="text-xs uppercase tracking-[0.2em] text-[#766c5d]">Affordable Health Coaching</p>
          </div>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="rounded-full bg-[#7f9464] px-5 py-3 text-sm font-semibold text-white hover:bg-[#687b51]"
          >
            Book a Free Call
          </button>
        </div>
      </header>

      <section className="px-6 py-20 text-center md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#7f9464]">Health coaching for real life</p>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Affordable health coaching for women, men, kids, and families.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5d5144]">
            The Nourished Garden & Farm helps people of all ages build healthier lives with simple routines, affordable meal recipes, family support, and realistic coaching that meets you where you are.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="rounded-full bg-[#7f9464] px-8 py-4 font-semibold text-white hover:bg-[#687b51]"
            >
              Book Your Free Health Call
            </button>
            <a href="#plans" className="rounded-full border border-[#7f9464] px-8 py-4 font-semibold text-[#5d6b45] hover:bg-[#efe3d3]">
              View Affordable Plans
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#efe3d3] px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">What does a health coach do?</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5d5144]">
            A health coach helps you create better habits around food, movement, sleep, stress, routines, and family wellness. Instead of giving you a strict diet or making you feel judged, health coaching gives you support, accountability, and a step-by-step plan that fits your real life and budget.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold">Simple Food Support</h3>
              <p className="mt-3 text-[#5d5144]">Budget-friendly meal recipes, healthy swaps, grocery ideas, and realistic meal routines.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold">Healthy Routines</h3>
              <p className="mt-3 text-[#5d5144]">Support with mornings, bedtime, school days, family schedules, movement, and consistency.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold">Accountability</h3>
              <p className="mt-3 text-[#5d5144]">Encouragement, check-ins, and simple next steps so you do not have to figure it out alone.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Who I help</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#5d5144]">
              Coaching is available for everyone — women, men, children with and without ADHD, ADD, or Autism, and full families who want a healthier home.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {Object.entries(groups).map(([key, group]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  activeTab === key ? "bg-[#7f9464] text-white" : "bg-white text-[#3e352b] shadow-sm hover:bg-[#efe3d3]"
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-[#dfd0bd] bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-bold">{groups[activeTab].title}</h3>
            <p className="mt-4 text-lg leading-8 text-[#5d5144]">{groups[activeTab].description}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#3f4a32] px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold md:text-4xl">What coaching can help with</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Eating healthier on a budget",
              "Meal recipes and simple food swaps",
              "Picky eating support",
              "ADHD, ADD, and Autism-friendly routines",
              "Family wellness and structure",
              "Stress, sleep, and energy habits",
              "Weight and wellness goals",
              "Healthy habits for kids",
              "Accountability and encouragement",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-white/10 p-4">
                <p>✓ {item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Affordable coaching plans</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#5d5144]">
              Choose the level of support that fits your needs, your family, and your budget.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.name} className="rounded-3xl border border-[#dfd0bd] bg-white p-7 shadow-sm">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="mt-2 text-3xl font-bold text-[#7f9464]">{plan.price}</p>
                <p className="mt-4 text-[#5d5144]">{plan.description}</p>
                <ul className="mt-6 space-y-3 text-[#3e352b]">
                  {plan.features.map((feature) => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="mt-8 w-full rounded-full bg-[#7f9464] px-6 py-3 font-semibold text-white hover:bg-[#687b51]"
                >
                  Book a Free Call
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#efe3d3] px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">This is not about perfection.</h2>
          <p className="mt-5 text-lg leading-8 text-[#5d5144]">
            This is about helping you take small, steady steps toward better health. Whether you are a parent, a busy adult, or caring for a child with unique needs, you deserve support that feels simple, affordable, and doable.
          </p>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="mt-8 rounded-full bg-[#7f9464] px-8 py-4 font-semibold text-white hover:bg-[#687b51]"
          >
            Book Your Free Call
          </button>
        </div>
      </section>

      <footer className="px-6 py-8 text-center text-sm text-[#766c5d]">
        <p>© {new Date().getFullYear()} The Nourished Garden & Farm. Affordable health coaching for women, men, kids, and families.</p>
        <p className="mx-auto mt-2 max-w-3xl">
          Disclaimer: Health coaching is educational and supportive. It does not diagnose, treat, cure, or replace medical, nutritional, developmental, or mental health care.
        </p>
      </footer>

      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
          <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-[#f8f3ea] p-6 shadow-2xl">
            <button
              onClick={() => setIsBookingOpen(false)}
              className="absolute right-4 top-4 rounded-full bg-white px-3 py-2 text-xl shadow hover:bg-[#efe3d3]"
              aria-label="Close booking popup"
            >
              ×
            </button>
            <div className="mb-6">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#efe3d3] px-4 py-2 text-sm">
                📅 Free Health Coaching Call
              </div>
              <h2 className="text-3xl font-bold">Book your free call</h2>
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
