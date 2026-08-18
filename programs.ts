export type Program = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  outcome: string;
  length: string;
  price: string;
  priceEnv?: string;
  free?: boolean;
  lessons: string[];
};

export const programs: Program[] = [
  {
    slug: "calmer-family-week",
    title: "5 Simple Changes for a Calmer Family Week",
    eyebrow: "Free guide",
    description: "A gentle seven-day starting point for overwhelmed families who need simpler rhythms.",
    outcome: "Create calmer mornings, easier transitions, and a more peaceful bedtime routine.",
    length: "7 days",
    price: "Free",
    free: true,
    lessons: ["One small change each day", "Family calm checklist", "Morning and evening routine prompts"],
  },
  {
    slug: "calmer-family-reset",
    title: "Calmer Family Reset",
    eyebrow: "Family wellness",
    description: "Practical routines, whole-food foundations, and stress-lowering habits for busy homes.",
    outcome: "Move from survival mode toward a home rhythm your family can actually maintain.",
    length: "4 weeks",
    price: "$49",
    priceEnv: "STRIPE_PRICE_CALMER_FAMILY",
    lessons: ["Calm-home assessment", "Simple routines", "Meal rhythm", "Weekly family reset"],
  },
  {
    slug: "clean-eating-made-simple",
    title: "Clean Eating Made Simple",
    eyebrow: "Nutrition",
    description: "A realistic introduction to reducing ultra-processed foods without chasing perfection.",
    outcome: "Build confidence reading labels, planning meals, and making approachable food swaps.",
    length: "4 weeks",
    price: "$59",
    priceEnv: "STRIPE_PRICE_CLEAN_EATING",
    lessons: ["Pantry refresh", "Label-reading guide", "Meal recipes", "Shopping system"],
  },
  {
    slug: "adhd-parent-roadmap",
    title: "ADHD Parent Roadmap",
    eyebrow: "Parent support",
    description: "Structure, connection, and lifestyle strategies created for parents supporting neurodivergent children.",
    outcome: "Reduce daily friction while building routines that respect your child and your family.",
    length: "8 weeks",
    price: "$97",
    priceEnv: "STRIPE_PRICE_ADHD_PARENTS",
    lessons: ["Strength-based planning", "Sensory-friendly routines", "Food and sleep foundations", "Parent reset tools"],
  },
  {
    slug: "family-wellness-reset",
    title: "Family Wellness Reset",
    eyebrow: "Whole-family program",
    description: "A guided reset combining nourishment, movement, rest, organization, and connection.",
    outcome: "Give the whole family a shared plan without adding an overwhelming list of rules.",
    length: "6 weeks",
    price: "$147",
    priceEnv: "STRIPE_PRICE_FAMILY_RESET",
    lessons: ["Family wellness vision", "Weekly meal rhythm", "Movement and outdoor time", "Home organization"],
  },
  {
    slug: "garden-to-wellness",
    title: "Garden to Wellness",
    eyebrow: "Garden skills",
    description: "Use simple gardening and food-growing projects to build confidence, nourishment, and connection.",
    outcome: "Start growing food at your own pace—even with limited space or experience.",
    length: "6 weeks",
    price: "$79",
    priceEnv: "STRIPE_PRICE_GARDEN_WELLNESS",
    lessons: ["Choose your growing method", "Hydroponic basics", "Family garden jobs", "Harvest-to-table ideas"],
  },
  {
    slug: "red-light-foundations",
    title: "Red Light Therapy Foundations",
    eyebrow: "Wellness education",
    description: "An educational guide to common red-light routines, device questions, and safety conversations.",
    outcome: "Understand the basics and prepare informed questions for your licensed healthcare professional.",
    length: "Self-paced",
    price: "$39",
    priceEnv: "STRIPE_PRICE_RED_LIGHT",
    lessons: ["How red light is discussed", "Device basics", "Routine tracker", "Safety questions"],
  },
];

export function getProgram(slug: string) {
  return programs.find((program) => program.slug === slug);
}
