// Base AttractWell URL that drives every signup button across the site.
export const ATTRACTWELL_BASE_URL = "https://AttractWell.com/nourishedgardenfarm";

// Build a signup link for a specific program by appending its slug.
export function programSignupUrl(slug: string): string {
  return `${ATTRACTWELL_BASE_URL}/programs/${slug}`;
}

export type Program = {
  name: string;
  slug: string;
  price: string;
  description: string;
  audience: string;
  features: string[];
  popular?: boolean;
};

export const programs: Program[] = [
  {
    name: "Steady & Strong",
    slug: "insulin-resistance-support-60",
    price: "$97",
    description:
      "Gentle, sustainable support for blood sugar balance and steady energy in your 60s and beyond.",
    audience: "Adults 60+ navigating insulin resistance",
    features: [
      "Blood sugar friendly meal guidance",
      "Simple daily movement routines",
      "Budget-friendly grocery lists",
      "Steady, sustainable habit building",
    ],
  },
  {
    name: "Soil to Soul",
    slug: "clean-eating-reset",
    price: "$297",
    description:
      "A whole-foods reset that clears out the clutter and rebuilds healthy eating from the ground up.",
    audience: "Anyone ready for a clean eating reset",
    features: [
      "Whole-foods meal framework",
      "Weekly coaching support",
      "Affordable seasonal recipes",
      "Lasting lifestyle routines",
    ],
    popular: true,
  },
  {
    name: "Strong as Rocks",
    slug: "animal-based-wellness",
    price: "$597+",
    description:
      "A nutrient-dense, animal-based approach to building strength, resilience, and lasting wellness.",
    audience: "Those building strength with animal-based nutrition",
    features: [
      "Animal-based nutrition plan",
      "8-week coaching program",
      "Strength and recovery support",
      "Full wellness roadmap",
    ],
  },
];
