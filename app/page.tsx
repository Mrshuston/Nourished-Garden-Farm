"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Heart,
  Leaf,
  CheckCircle,
  Sun,
  MessageCircle,
  Star,
  Apple,
  Users,
  Baby,
  Dumbbell,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookingModal } from "@/components/booking-modal"

export default function NourishedGardenHealthWebsite() {
  const [activeTab, setActiveTab] = useState("women")
  const [bookingOpen, setBookingOpen] = useState(false)

  const tabs = {
    women: {
      label: "Women",
      icon: Heart,
      title: "Affordable wellness for busy women",
      subtitle:
        "Simple meals, steady energy, hormone-friendly habits, and realistic routines that fit into real life.",
      points: [
        "Budget-friendly high-protein meals",
        "Energy support without expensive supplements",
        "Simple grocery lists and meal prep",
        "Stress, sleep, and nervous system support",
        "Healthy habits for moms and working women",
      ],
    },
    men: {
      label: "Men",
      icon: Dumbbell,
      title: "Simple health habits for men",
      subtitle:
        "Practical coaching for strength, energy, weight goals, better meals, and healthier routines without complicated plans.",
      points: [
        "Easy protein-focused meals",
        "Strength and movement habits",
        "Meal prep that is simple and filling",
        "Energy, sleep, and stress support",
        "Affordable grocery swaps that work",
      ],
    },
    kids: {
      label: "ADHD Kids",
      icon: Baby,
      title: "Nourishing support for ADHD kids",
      subtitle:
        "Realistic food, rhythm, and routine support for parents who want calmer days and better focus at home.",
      points: [
        "Protein-first breakfasts and snacks",
        "Picky-eater friendly swaps",
        "Simple routines for mornings and bedtime",
        "Meltdown and nervous system support",
        "Screen, sleep, and movement rhythms",
      ],
    },
  }

  const plans = [
    "Budget grocery planning",
    "Simple meal building",
    "Healthy snack swaps",
    "Family routines",
    "Movement made easy",
    "Low-cost pantry staples",
    "ADHD-friendly food support",
    "Weekly accountability",
  ]

  const services = [
    {
      title: "Family Health Reset",
      price: "Starting at $297",
      description:
        "A simple coaching package for families who want to eat better, spend less, and create healthier routines.",
      includes: [
        "Healthy meal recipes",
        "Budget grocery list",
        "Family routine plan",
        "Weekly coaching support",
      ],
    },
    {
      title: "ADHD Family Support",
      price: "Starting at $597",
      description:
        "An 8-week coaching program for parents of ADHD kids who want calmer routines, better snacks, and more support.",
      includes: [
        "8 coaching sessions",
        "Printable workbook",
        "Food and routine support",
        "Meltdown plan",
      ],
    },
    {
      title: "Healthy on a Budget Plan",
      price: "Starting at $97",
      description:
        "A one-time custom plan with budget-friendly meals, snacks, and simple health habits for your household.",
      includes: [
        "Custom grocery list",
        "Healthy Meal Recipes",
        "Healthy swaps",
        "Simple action steps",
      ],
    },
  ]

  const faqs = [
    {
      q: "Do I need to buy expensive health foods?",
      a: "No. This approach is built around affordable grocery staples, simple meals, and realistic swaps you can find at regular stores.",
    },
    {
      q: "Is this only for parents of ADHD kids?",
      a: "No. The Nourished Garden & Farm supports women, men, and families, with special support available for parents raising ADHD kids.",
    },
    {
      q: "Is this medical advice?",
      a: "No. Health coaching is educational and supportive. It does not diagnose, treat, or replace medical or mental health care.",
    },
    {
      q: "Can this work for picky eaters?",
      a: "Yes. The goal is small, realistic changes, not perfect eating. We focus on simple swaps and foods your family can actually use.",
    },
  ]

  const ActiveIcon = tabs[activeTab as keyof typeof tabs].icon

  return (
    <div className="min-h-screen bg-[#f8f3ea] text-[#3e352b]">
      <header className="sticky top-0 z-50 border-b border-[#dfd0bd] bg-[#f8f3ea]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-[#8b9b72] p-2 text-white">
              <Leaf size={20} />
            </div>
            <div>
              <p className="font-serif text-lg font-semibold leading-tight">
                The Nourished Garden & Farm
              </p>
              <p className="text-xs uppercase tracking-[0.25em] text-[#766c5d]">
                Nourish your body - Grow your Life
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a href="#who" className="hover:text-[#8b9b72]">
              Who I Help
            </a>
            <a href="#budget" className="hover:text-[#8b9b72]">
              Healthy Cheaply
            </a>
            <a href="#services" className="hover:text-[#8b9b72]">
              Services
            </a>
            <a href="#faq" className="hover:text-[#8b9b72]">
              FAQ
            </a>
          </nav>
          <Button 
            onClick={() => setBookingOpen(true)}
            className="rounded-full bg-[#8b9b72] px-5 text-white hover:bg-[#73845e]"
          >
            Book a Free Call
          </Button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-6 py-20 md:py-28">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#d9b88f]/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-[#8b9b72]/20 blur-3xl" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d5c1aa] bg-white/60 px-4 py-2 text-sm text-[#766c5d] shadow-sm">
                <Wallet size={16} /> Healthy living does not have to be
                expensive
              </div>
              <h1 className="font-serif text-4xl font-bold leading-tight md:text-6xl text-balance">
                Learn how to be healthy cheaply — with simple plans for women,
                men, and ADHD kids.
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#5d5144]">
                Affordable health coaching for real families using simple meals,
                budget groceries, natural routines, and small habits that
                actually fit your life.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button 
                  onClick={() => setBookingOpen(true)}
                  className="rounded-full bg-[#8b9b72] px-8 py-6 text-base text-white hover:bg-[#73845e]"
                >
                  Book a Free Health Strategy Call
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-[#8b9b72] px-8 py-6 text-base text-[#5d6b45] hover:bg-[#eef0e7]"
                >
                  View Coaching Options
                </Button>
              </div>
              <p className="mt-5 text-sm text-[#766c5d]">
                Healthy Recipes • Budget groceries • Family routines • ADHD kid
                support • Simple healthy habits
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <Card className="rounded-[2rem] border-[#dfd0bd] bg-white/75 shadow-xl">
                <CardContent className="p-8">
                  <div className="rounded-[1.5rem] bg-[#efe3d3] p-6">
                    <div className="mb-5 flex items-center gap-3">
                      <Sun className="text-[#b98654]" />
                      <p className="font-serif text-2xl font-semibold">
                        The Healthy Cheaply Method™
                      </p>
                    </div>
                    <p className="text-[#5d5144]">
                      A simple coaching approach that teaches you how to eat
                      better, spend less, and build healthy routines one small
                      step at a time.
                    </p>
                  </div>
                  <div className="mt-6 space-y-4">
                    {[
                      "Affordable meals from regular grocery stores",
                      "Healthy swaps for picky eaters and busy adults",
                      "Simple weekly plans for women, men, and kids",
                      "Realistic routines that do not require perfection",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle
                          className="mt-1 shrink-0 text-[#8b9b72]"
                          size={20}
                        />
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="bg-[#efe3d3] px-6 py-16">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
            {(
              [
                [
                  Apple,
                  "Eat better for less",
                  "Build meals from affordable proteins, produce, pantry staples, and simple swaps.",
                ],
                [
                  Users,
                  "Support the whole family",
                  "Plans for women, men, children, and parents who need realistic help.",
                ],
                [
                  Leaf,
                  "Small steps matter",
                  "No extreme diets. No shame. Just simple habits you can keep.",
                ],
              ] as const
            ).map(([Icon, title, text]) => (
              <Card
                key={title}
                className="rounded-3xl border-none bg-white/70 shadow-sm"
              >
                <CardContent className="p-7">
                  <Icon className="mb-4 text-[#8b9b72]" size={30} />
                  <h3 className="font-serif text-2xl font-semibold">{title}</h3>
                  <p className="mt-3 text-[#5d5144]">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="who" className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#8b9b72]">
                Who I help
              </p>
              <h2 className="font-serif text-4xl font-bold md:text-5xl text-balance">
                Choose the path that fits your household.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#5d5144]">
                Every family is different. That is why this coaching approach
                includes practical support for women, men, and ADHD kids.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {Object.entries(tabs).map(([key, tab]) => {
                const Icon = tab.icon
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                      activeTab === key
                        ? "bg-[#8b9b72] text-white"
                        : "bg-white text-[#5d5144] hover:bg-[#eef0e7]"
                    }`}
                  >
                    <Icon size={18} /> {tab.label}
                  </button>
                )
              })}
            </div>

            <Card className="mt-8 rounded-[2rem] border-[#dfd0bd] bg-white/75 shadow-lg">
              <CardContent className="grid gap-8 p-8 md:grid-cols-[0.8fr_1.2fr] md:p-10">
                <div className="flex min-h-64 items-center justify-center rounded-[1.5rem] bg-[#efe3d3]">
                  <ActiveIcon className="text-[#8b9b72]" size={90} />
                </div>
                <div>
                  <h3 className="font-serif text-3xl font-bold">
                    {tabs[activeTab as keyof typeof tabs].title}
                  </h3>
                  <p className="mt-4 text-lg leading-8 text-[#5d5144]">
                    {tabs[activeTab as keyof typeof tabs].subtitle}
                  </p>
                  <div className="mt-6 grid gap-3">
                    {tabs[activeTab as keyof typeof tabs].points.map(
                      (point) => (
                        <div key={point} className="flex items-start gap-3">
                          <CheckCircle
                            className="mt-1 shrink-0 text-[#8b9b72]"
                            size={20}
                          />
                          <p>{point}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="budget" className="bg-[#3f4a32] px-6 py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#d9c6aa]">
                Healthy cheaply
              </p>
              <h2 className="font-serif text-4xl font-bold md:text-5xl text-balance">
                Health coaching that respects your budget.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#eee6dc]">
                You do not need fancy powders, expensive stores, or complicated
                meal plans to get healthier. You need simple food, structure,
                support, and a plan you can repeat.
              </p>
            </div>
            <div className="grid gap-4">
              {plans.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-white/10 p-4"
                >
                  <CheckCircle
                    className="mt-1 shrink-0 text-[#d9c6aa]"
                    size={20}
                  />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="px-6 py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
            <div className="rounded-[2rem] bg-[#e7d5bf] p-8 md:p-12">
              <div className="flex h-72 items-center justify-center rounded-[1.5rem] border border-dashed border-[#9a866e] bg-[#f8f3ea] text-center text-[#766c5d]">
                Add your photo, farm photo, family table photo, or garden image
                here
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#8b9b72]">
                Meet your coach
              </p>
              <h2 className="font-serif text-4xl font-bold md:text-5xl text-balance">
                A realistic way to build a healthier home.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#5d5144]">
                The Nourished Garden & Farm was created to help everyday people
                and families get healthier without feeling overwhelmed or
                spending a fortune.
              </p>
              <p className="mt-4 text-lg leading-8 text-[#5d5144]">
                My approach is simple: affordable food, realistic habits, calm
                routines, and support that meets you where you are.
              </p>
            </div>
          </div>
        </section>

        <section id="services" className="bg-[#efe3d3] px-6 py-20">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#8b9b72]">
              Coaching options
            </p>
            <h2 className="font-serif text-4xl font-bold md:text-5xl text-balance">
              Simple support for your next healthy step.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#5d5144]">
              Start with the support level that fits your family, your goals,
              and your budget.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-3">
            {services.map((service) => (
              <Card
                key={service.title}
                className="rounded-[2rem] border-[#dfd0bd] bg-white shadow-lg"
              >
                <CardContent className="p-8">
                  <h3 className="font-serif text-3xl font-bold">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-2xl font-semibold text-[#8b9b72]">
                    {service.price}
                  </p>
                  <p className="mt-4 leading-7 text-[#5d5144]">
                    {service.description}
                  </p>
                  <div className="mt-6 space-y-3">
                    {service.includes.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle
                          className="mt-1 shrink-0 text-[#8b9b72]"
                          size={20}
                        />
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                  <Button className="mt-8 w-full rounded-full bg-[#8b9b72] py-6 text-base text-white hover:bg-[#73845e]">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#8b9b72]">
                Client love
              </p>
              <h2 className="font-serif text-4xl font-bold md:text-5xl">
                Healthy can feel simple again.
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                "I finally learned how to make healthy meals without spending too much.",
                "The plan felt realistic for my family and our budget.",
                "I stopped feeling overwhelmed and started taking small steps that worked.",
              ].map((quote) => (
                <Card
                  key={quote}
                  className="rounded-3xl border-[#dfd0bd] bg-white/75 shadow-sm"
                >
                  <CardContent className="p-7">
                    <div className="mb-4 flex gap-1 text-[#b98654]">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} size={18} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-lg leading-7 text-[#5d5144]">
                      &quot;{quote}&quot;
                    </p>
                    <p className="mt-5 text-sm font-semibold text-[#766c5d]">
                      Client
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#f4eadc] px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.25em] text-[#8b9b72]">
              FAQ
            </p>
            <h2 className="text-center font-serif text-4xl font-bold md:text-5xl">
              Questions people ask.
            </h2>
            <div className="mt-10 space-y-4">
              {faqs.map((faq) => (
                <Card
                  key={faq.q}
                  className="rounded-3xl border-[#dfd0bd] bg-white/75 shadow-sm"
                >
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl font-semibold">
                      {faq.q}
                    </h3>
                    <p className="mt-3 leading-7 text-[#5d5144]">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#8b9b72] p-10 text-center text-white shadow-xl md:p-16">
            <MessageCircle className="mx-auto mb-5" size={40} />
            <h2 className="font-serif text-4xl font-bold md:text-5xl text-balance">
              Ready to get healthy without overspending?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#f7f2e9]">
              Book a free Health Strategy Call and we&apos;ll talk through your
              goals, your budget, and your first simple steps.
            </p>
            <Button 
              onClick={() => setBookingOpen(true)}
              className="mt-8 rounded-full bg-white px-8 py-6 text-base text-[#5d6b45] hover:bg-[#f4eadc]"
            >
              Book Your Free Call
            </Button>
          </div>
        </section>
      </main>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />

      <footer className="border-t border-[#dfd0bd] px-6 py-8 text-center text-sm text-[#766c5d]">
        <p>
          © {new Date().getFullYear()} The Nourished Garden & Farm. Affordable
          health coaching for women, men, and families.
        </p>
        <p className="mt-2">
          Disclaimer: Coaching is educational and supportive. It does not
          diagnose, treat, cure, or replace medical or mental health care.
        </p>
      </footer>
    </div>
  )
}
