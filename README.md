import React, { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, X, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NourishedGardenWebsite() {
  const [activeTab, setActiveTab] = useState("women");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const programs = {
    women: {
      title: "Women's Health Coaching",
      desc: "Support for energy, hormones, weight, stress, and simple routines that fit real life.",
    },
    men: {
      title: "Men's Health Coaching",
      desc: "Simple, effective strategies for strength, energy, nutrition, and daily habits.",
    },
    kids: {
      title: "Kids Health Coaching",
      desc: "Support for nutrition, routines, picky eating, and overall development.",
    },
    adhd: {
      title: "ADHD / ADD Support",
      desc: "Nutrition, routines, and nervous system support for focus, behavior, and calm.",
    },
    autism: {
      title: "Autism Support",
      desc: "Gentle, structured support for routines, food, and sensory-friendly living.",
    },
    family: {
      title: "Family Health Coaching",
      desc: "Whole-family support to create a healthier, calmer, more connected home.",
    },
  };

  return (
    <div className="min-h-screen bg-[#f8f3ea] text-[#3e352b]">

      {/* HEADER */}
      <header className="border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Leaf />
          <h1 className="font-bold">The Nourished Garden and & Farm</h1>
        </div>
        <Button onClick={() => setIsBookingOpen(true)}>Book a Free Call</Button>
      </header>

      {/* HERO */}
      <section className="text-center px-6 py-20">
        <h1 className="text-4xl font-bold mb-6">
          Health Coaching Made Simple for Real Life
        </h1>
        <p className="max-w-2xl mx-auto text-lg">
          We help women, men, kids, and families build healthier lives using simple food, routines, and support — without overwhelm or expensive programs.
        </p>
        <Button onClick={() => setIsBookingOpen(true)} className="mt-6">Book Your Free Call</Button>
      </section>

      {/* WHAT IS HEALTH COACHING */}
      <section className="px-6 py-16 bg-[#efe3d3]">
        <h2 className="text-3xl font-bold mb-6 text-center">What is Health Coaching?</h2>
        <p className="max-w-3xl mx-auto text-center text-lg">
          Health coaching helps you create simple, sustainable habits around food, routines, stress, and lifestyle. Instead of strict diets or complicated plans, we focus on what actually works for your life.
        </p>
      </section>

      {/* WHO WE HELP */}
      <section className="px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Who We Help</h2>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.keys(programs).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-full ${activeTab === key ? "bg-green-700 text-white" : "bg-white"}`}
            >
              {key}
            </button>
          ))}
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-2">{programs[activeTab].title}</h3>
            <p>{programs[activeTab].desc}</p>
          </CardContent>
        </Card>
      </section>

      {/* SERVICES */}
      <section className="px-6 py-16 bg-[#efe3d3]">
        <h2 className="text-3xl font-bold text-center mb-10">Coaching Plans</h2>

        <div className="grid md:grid-cols-3 gap-6">

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold">Starter Plan</h3>
              <p>$97</p>
              <ul>
                <li>Basic Meal Recipes</li>
                <li>Healthy habits guide</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold">Coaching Plan</h3>
              <p>$297</p>
              <ul>
                <li>Weekly coaching</li>
                <li>Custom routines</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold">Full Program</h3>
              <p>$597+</p>
              <ul>
                <li>8-week coaching</li>
                <li>Family support</li>
              </ul>
            </CardContent>
          </Card>

        </div>
      </section>

      {/* CTA */}
      <section className="text-center px-6 py-20">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="mb-6">Book a free call and we will create a simple plan for you.</p>
        <Button onClick={() => setIsBookingOpen(true)}>Book Your Free Call</Button>
      </section>
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
              <p className="mt-3 text-[#5d5144]">
                Choose a time that works for you using the calendar below.
              </p>
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

      {/* FOOTER */}
      <footer className="text-center py-6 text-sm">
        © The Nourished Garden and & Farm
      </footer>

    </div>
  );
}
