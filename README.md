"use client";

import React, { useState } from "react";
import { Leaf, X, CalendarDays } from "lucide-react";

export default function NourishedGardenWebsite() {
  const [activeTab, setActiveTab] = useState("women");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const programs = {
    women: {
      label: "Women",
      title: "Women's Health Coaching",
      desc: "Support for energy, hormones, weight, stress, and simple routines that fit real life.",
    },
    men: {
      label: "Men",
      title: "Men's Health Coaching",
      desc: "Simple, effective strategies for strength, energy, nutrition, and daily habits.",
    },
    kids: {
      label: "Kids",
      title: "Kids Health Coaching",
      desc: "Support for nutrition, routines, picky eating, and overall development.",
    },
    adhd: {
      label: "ADHD / ADD",
      title: "ADHD / ADD Support",
      desc: "Nutrition, routines, and nervous system support for focus, behavior, and calm.",
    },
    autism: {
      label: "Autism",
      title: "Autism Support",
      desc: "Gentle, structured support for routines, food, and sensory-friendly living.",
    },
    family: {
      label: "Families",
      title: "Family Health Coaching",
      desc: "Whole-family support to create a healthier, calmer, more connected home.",
    },
  };

  const Button = ({ children, onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`rounded-full bg-[#8b9b72] px-6 py-3 font-semibold text-white transition hover:bg-[#73845e] ${className}`}
    >
      {children}
    </button>
  );

  const Card = ({ children }) => (
    <div className="rounded-3xl border border-[#dfd0bd] bg-white p-6 shadow-sm">{children}</div>
  );

  return (
    <div className="min-h-screen bg-[#f8f3ea] text-[#3e352b]">
      <header className="flex items-center justify-between border-b border-[#dfd0bd] px-6 py-4">
        <div className="flex items-center gap-2">
          <Leaf className="text-[#8b9b72]" />
          <h1 className="font-bold">The Nourished Garden and & Farm</h1>
        </div>
        <Button onClick={() => setIsBookingOpen(true)}>Book a Free Call</Button>
      </header>

      <main>
        <section className="px-6 py-20 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Health Coaching Made Simple for Real Life</h1>
          <p className="mx-auto max-w-2xl text-lg leading-8">
            We help women, men, kids, and families build healthier lives using simple food, routines, and support — without overwhelm or expensive programs.
          </p>
          <Button onClick={() => setIsBookingOpen(true)} className="mt-6">Book Your Free Call</Button>
        </section>

        <section className="bg-[#efe3d3] px-6 py-16">
          <h2 className="mb-6 text-center text-3xl font-bold">What is Health Coaching?</h2>
          <p className="mx-auto max-w-3xl text-center text-lg leading-8">
            Health coaching helps you create simple, sustainable habits around food, routines, stress, movement, sleep, and lifestyle. Instead of strict diets or complicated plans, we focus on what actually works for your life.
          </p>
        </section>

        <section className="px-6 py-16">
          <h2 className="mb-8 text-center text-3xl font-bold">Who We Help</h2>
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            {Object.entries(programs).map(([key, program]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`rounded-full px-4 py-2 font-semibold transition ${
                  activeTab === key ? "bg-[#8b9b72] text-white" : "bg-white text-[#3e352b] hover:bg-[#efe3d3]"
                }`}
              >
                {program.label}
              </button>
            ))}
          </div>

          <div className="mx-auto max-w-2xl">
            <Card>
              <h3 className="mb-2 text-2xl font-bold">{programs[activeTab].title}</h3>
              <p className="leading-7">{programs[activeTab].desc}</p>
            </Card>
          </div>
        </section>

        <section className="bg-[#efe3d3] px-6 py-16">
          <h2 className="mb-10 text-center text-3xl font-bold">Coaching Plans</h2>
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            <Card>
              <h3 className="text-xl font-bold">Starter Plan</h3>
              <p className="mt-2 text-2xl font-semibold text-[#8b9b72]">$97</p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>Basic Meal Recipes</li>
                <li>Healthy habits guide</li>
                <li>Simple first steps</li>
              </ul>
            </Card>

            <Card>
              <h3 className="text-xl font-bold">Coaching Plan</h3>
              <p className="mt-2 text-2xl font-semibold text-[#8b9b72]">$297</p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>Weekly coaching</li>
                <li>Custom routines</li>
                <li>Support for your goals</li>
              </ul>
            </Card>

            <Card>
              <h3 className="text-xl font-bold">Full Program</h3>
              <p className="mt-2 text-2xl font-semibold text-[#8b9b72]">$597+</p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>8-week coaching</li>
                <li>Family support</li>
                <li>Personalized health plan</li>
              </ul>
            </Card>
          </div>
        </section>

        <section className="px-6 py-20 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to get started?</h2>
          <p className="mb-6">Book a free call and we will create a simple plan for you.</p>
          <Button onClick={() => setIsBookingOpen(true)}>Book Your Free Call</Button>
        </section>
      </main>

      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
          <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-[#f8f3ea] p-6 shadow-2xl">
            <button
              onClick={() => setIsBookingOpen(false)}
              className="absolute right-4 top-4 rounded-full bg-white p-2 shadow"
              aria-label="Close booking popup"
            >
              <X size={22} />
            </button>

            <div className="mb-6">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#efe3d3] px-4 py-2 text-sm">
                <CalendarDays size={16} /> Free Health Coaching Call
              </div>
              <h2 className="text-3xl font-bold">Book your free call</h2>
              <p className="mt-3 text-[#5d5144]">Choose a time that works for you using the calendar below.</p>
            </div>

            <iframe
              title="Calendly booking calendar"
              src="https://calendly.com/thenourishedgardens/calm-call"
              width="100%"
              height="700"
              frameBorder="0"
              className="rounded-2xl bg-white"
            />
          </div>
        </div>
      )}

      <footer className="py-6 text-center text-sm">© The Nourished Garden and & Farm</footer>
    </div>
  );
}

  );
}
