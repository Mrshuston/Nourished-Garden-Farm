"use client";

import { useState } from "react";

type Ingredient = { amount: number; unit: string; item: string };
type Meal = {
  title: string;
  description: string;
  protein: string;
  baseServings: number;
  ingredients: Ingredient[];
};

const meals: Record<"Breakfast" | "Lunch" | "Dinner" | "Snacks", Meal[]> = {
  Breakfast: [
    {
      title: "Garden Egg & Cottage Cheese Scramble",
      description: "A quick skillet breakfast with spinach, tomatoes, and creamy cottage cheese.",
      protein: "About 28g protein per serving",
      baseServings: 2,
      ingredients: [
        { amount: 4, unit: "", item: "large eggs" },
        { amount: 1, unit: "cup", item: "cottage cheese" },
        { amount: 2, unit: "cups", item: "baby spinach" },
        { amount: 1, unit: "cup", item: "cherry tomatoes, halved" },
        { amount: 1, unit: "tsp", item: "olive oil" },
      ],
    },
    {
      title: "Berry Greek Yogurt Power Bowl",
      description: "Greek yogurt, berries, seeds, and oats for a no-cook morning meal.",
      protein: "About 25g protein per serving",
      baseServings: 1,
      ingredients: [
        { amount: 1, unit: "cup", item: "plain Greek yogurt" },
        { amount: 0.5, unit: "cup", item: "mixed berries" },
        { amount: 2, unit: "tbsp", item: "hemp hearts" },
        { amount: 0.25, unit: "cup", item: "rolled oats" },
        { amount: 1, unit: "tsp", item: "honey, optional" },
      ],
    },
    {
      title: "Apple Cinnamon Protein Oats",
      description: "Warm oats finished with Greek yogurt and peanut butter.",
      protein: "About 24g protein per serving",
      baseServings: 2,
      ingredients: [
        { amount: 1, unit: "cup", item: "rolled oats" },
        { amount: 2, unit: "cups", item: "milk of choice" },
        { amount: 1, unit: "cup", item: "plain Greek yogurt" },
        { amount: 2, unit: "tbsp", item: "peanut butter" },
        { amount: 1, unit: "", item: "apple, diced" },
        { amount: 1, unit: "tsp", item: "cinnamon" },
      ],
    },
    {
      title: "Turkey & Egg Breakfast Wrap",
      description: "A warm, portable breakfast with eggs, turkey, spinach, and cheese.",
      protein: "About 31g protein per serving",
      baseServings: 2,
      ingredients: [
        { amount: 4, unit: "", item: "large eggs" },
        { amount: 4, unit: "oz", item: "sliced turkey, chopped" },
        { amount: 2, unit: "", item: "whole-grain wraps" },
        { amount: 0.5, unit: "cup", item: "shredded cheese" },
        { amount: 1, unit: "cup", item: "baby spinach" },
      ],
    },
    {
      title: "Farmhouse Breakfast Sheet Pan",
      description: "Eggs, chicken sausage, potatoes, and peppers baked together for easy meal prep.",
      protein: "About 29g protein per serving",
      baseServings: 4,
      ingredients: [
        { amount: 8, unit: "", item: "large eggs" },
        { amount: 12, unit: "oz", item: "chicken sausage, sliced" },
        { amount: 1, unit: "lb", item: "baby potatoes, diced" },
        { amount: 2, unit: "cups", item: "diced peppers and onions" },
        { amount: 1, unit: "tbsp", item: "olive oil" },
      ],
    },
  ],
  Lunch: [
    {
      title: "Harvest Chicken Crunch Bowls",
      description: "Chicken, quinoa, crunchy vegetables, and a simple yogurt dressing.",
      protein: "About 38g protein per serving",
      baseServings: 4,
      ingredients: [
        { amount: 1.5, unit: "lb", item: "cooked chicken breast, sliced" },
        { amount: 2, unit: "cups", item: "cooked quinoa" },
        { amount: 4, unit: "cups", item: "chopped greens" },
        { amount: 2, unit: "cups", item: "chopped garden vegetables" },
        { amount: 1, unit: "cup", item: "plain Greek yogurt dressing" },
      ],
    },
    {
      title: "Tuna & White Bean Garden Salad",
      description: "A pantry-friendly lunch with herbs, cucumber, tomato, and lemon.",
      protein: "About 32g protein per serving",
      baseServings: 2,
      ingredients: [
        { amount: 10, unit: "oz", item: "tuna, drained" },
        { amount: 1, unit: "cup", item: "white beans, rinsed" },
        { amount: 1, unit: "cup", item: "diced cucumber and tomato" },
        { amount: 2, unit: "tbsp", item: "olive oil" },
        { amount: 1, unit: "", item: "lemon, juiced" },
      ],
    },
    {
      title: "Turkey Hummus Roll-Ups",
      description: "An easy packable lunch with turkey, hummus, vegetables, and whole-grain wraps.",
      protein: "About 30g protein per serving",
      baseServings: 2,
      ingredients: [
        { amount: 8, unit: "oz", item: "sliced turkey" },
        { amount: 2, unit: "", item: "whole-grain wraps" },
        { amount: 0.5, unit: "cup", item: "hummus" },
        { amount: 1, unit: "cup", item: "shredded lettuce and carrots" },
        { amount: 0.5, unit: "cup", item: "sliced bell pepper" },
      ],
    },
    {
      title: "Chicken Avocado Salad Cups",
      description: "Creamy chicken salad served in crisp lettuce cups or on whole-grain toast.",
      protein: "About 34g protein per serving",
      baseServings: 4,
      ingredients: [
        { amount: 1.5, unit: "lb", item: "cooked chicken, chopped" },
        { amount: 1, unit: "", item: "avocado, mashed" },
        { amount: 0.5, unit: "cup", item: "plain Greek yogurt" },
        { amount: 1, unit: "cup", item: "diced celery and grapes" },
        { amount: 8, unit: "", item: "large lettuce leaves" },
      ],
    },
    {
      title: "Cottage Cheese Garden Toast",
      description: "Whole-grain toast topped with cottage cheese, eggs, tomato, and herbs.",
      protein: "About 27g protein per serving",
      baseServings: 2,
      ingredients: [
        { amount: 4, unit: "slices", item: "whole-grain bread" },
        { amount: 1, unit: "cup", item: "cottage cheese" },
        { amount: 2, unit: "", item: "hard-boiled eggs, sliced" },
        { amount: 1, unit: "", item: "tomato, sliced" },
        { amount: 2, unit: "tbsp", item: "chopped fresh herbs" },
      ],
    },
  ],
  Dinner: [
    {
      title: "Sheet-Pan Lemon Chicken & Vegetables",
      description: "A one-pan family dinner with potatoes and colorful vegetables.",
      protein: "About 40g protein per serving",
      baseServings: 4,
      ingredients: [
        { amount: 2, unit: "lb", item: "boneless chicken breast or thighs" },
        { amount: 1.5, unit: "lb", item: "baby potatoes, halved" },
        { amount: 4, unit: "cups", item: "mixed vegetables" },
        { amount: 2, unit: "tbsp", item: "olive oil" },
        { amount: 1, unit: "", item: "lemon, juiced" },
      ],
    },
    {
      title: "Turkey & Bean Garden Chili",
      description: "A freezer-friendly pot of turkey, beans, tomatoes, and mild spices.",
      protein: "About 36g protein per serving",
      baseServings: 6,
      ingredients: [
        { amount: 2, unit: "lb", item: "lean ground turkey" },
        { amount: 3, unit: "cups", item: "beans, rinsed" },
        { amount: 28, unit: "oz", item: "crushed tomatoes" },
        { amount: 2, unit: "cups", item: "diced peppers and onions" },
        { amount: 2, unit: "tbsp", item: "mild chili seasoning" },
      ],
    },
    {
      title: "Maple Mustard Salmon Plates",
      description: "Roasted salmon with sweet potatoes and green beans.",
      protein: "About 35g protein per serving",
      baseServings: 4,
      ingredients: [
        { amount: 1.5, unit: "lb", item: "salmon fillet" },
        { amount: 2, unit: "lb", item: "sweet potatoes, cubed" },
        { amount: 4, unit: "cups", item: "green beans" },
        { amount: 2, unit: "tbsp", item: "Dijon mustard" },
        { amount: 1, unit: "tbsp", item: "maple syrup" },
      ],
    },
    {
      title: "Beef & Broccoli Garden Stir-Fry",
      description: "A fast skillet dinner with lean beef, broccoli, peppers, and brown rice.",
      protein: "About 39g protein per serving",
      baseServings: 4,
      ingredients: [
        { amount: 1.5, unit: "lb", item: "lean beef strips" },
        { amount: 4, unit: "cups", item: "broccoli florets" },
        { amount: 2, unit: "cups", item: "sliced peppers" },
        { amount: 2, unit: "cups", item: "cooked brown rice" },
        { amount: 0.33, unit: "cup", item: "lower-sodium stir-fry sauce" },
      ],
    },
    {
      title: "Chicken Meatballs & Garden Pasta",
      description: "Baked chicken meatballs with whole-grain pasta and vegetable-rich tomato sauce.",
      protein: "About 37g protein per serving",
      baseServings: 6,
      ingredients: [
        { amount: 2, unit: "lb", item: "ground chicken" },
        { amount: 1, unit: "", item: "large egg" },
        { amount: 0.75, unit: "cup", item: "whole-grain breadcrumbs" },
        { amount: 12, unit: "oz", item: "whole-grain pasta" },
        { amount: 24, unit: "oz", item: "vegetable-rich tomato sauce" },
      ],
    },
  ],
  Snacks: [
    {
      title: "Apple Peanut Butter Yogurt Dip",
      description: "A creamy dip for apple slices that comes together in two minutes.",
      protein: "About 17g protein per serving",
      baseServings: 2,
      ingredients: [
        { amount: 1, unit: "cup", item: "plain Greek yogurt" },
        { amount: 2, unit: "tbsp", item: "peanut butter" },
        { amount: 0.5, unit: "tsp", item: "cinnamon" },
        { amount: 2, unit: "", item: "apples, sliced" },
      ],
    },
    {
      title: "Cottage Cheese Berry Cups",
      description: "A naturally sweet snack with berries, cottage cheese, and crunchy seeds.",
      protein: "About 16g protein per serving",
      baseServings: 2,
      ingredients: [
        { amount: 1.5, unit: "cups", item: "cottage cheese" },
        { amount: 1, unit: "cup", item: "mixed berries" },
        { amount: 2, unit: "tbsp", item: "pumpkin or sunflower seeds" },
      ],
    },
    {
      title: "Turkey Cucumber Roll-Ups",
      description: "Crisp cucumber and cream cheese rolled inside sliced turkey.",
      protein: "About 20g protein per serving",
      baseServings: 2,
      ingredients: [
        { amount: 8, unit: "oz", item: "sliced turkey" },
        { amount: 4, unit: "tbsp", item: "cream cheese" },
        { amount: 1, unit: "", item: "cucumber, cut into strips" },
        { amount: 1, unit: "cup", item: "baby spinach" },
      ],
    },
    {
      title: "Roasted Chickpea Trail Mix",
      description: "A crunchy make-ahead snack with roasted chickpeas, nuts, and seeds.",
      protein: "About 12g protein per serving",
      baseServings: 4,
      ingredients: [
        { amount: 2, unit: "cups", item: "roasted chickpeas" },
        { amount: 1, unit: "cup", item: "mixed nuts" },
        { amount: 0.5, unit: "cup", item: "pumpkin seeds" },
        { amount: 0.5, unit: "cup", item: "unsweetened dried fruit" },
      ],
    },
    {
      title: "Egg & Veggie Snack Box",
      description: "A simple grab-and-go box with eggs, cheese, vegetables, and hummus.",
      protein: "About 22g protein per serving",
      baseServings: 2,
      ingredients: [
        { amount: 4, unit: "", item: "hard-boiled eggs" },
        { amount: 2, unit: "oz", item: "cheddar cheese" },
        { amount: 1, unit: "cup", item: "sliced vegetables" },
        { amount: 0.5, unit: "cup", item: "hummus" },
      ],
    },
  ],
};

function formatAmount(value: number) {
  const rounded = Math.round(value * 100) / 100;
  const fractions: Record<string, string> = { "0.25": "¼", "0.5": "½", "0.75": "¾" };
  if (rounded < 1 && fractions[String(rounded)]) return fractions[String(rounded)];
  const whole = Math.floor(rounded);
  const decimal = Math.round((rounded - whole) * 100) / 100;
  if (whole > 0 && fractions[String(decimal)]) return `${whole}${fractions[String(decimal)]}`;
  return String(rounded);
}

function MealCard({ meal }: { meal: Meal }) {
  const [servings, setServings] = useState(meal.baseServings);
  const factor = servings / meal.baseServings;

  return (
    <article className="meal-card">
      <div className="meal-card-heading">
        <div><h3>{meal.title}</h3><p>{meal.description}</p></div>
        <span className="protein-pill">{meal.protein}</span>
      </div>
      <div className="serving-control" aria-label={`Servings for ${meal.title}`}>
        <span>Servings</span>
        <button type="button" onClick={() => setServings(Math.max(1, servings - 1))} aria-label="Decrease servings">−</button>
        <output aria-live="polite">{servings}</output>
        <button type="button" onClick={() => setServings(Math.min(12, servings + 1))} aria-label="Increase servings">+</button>
      </div>
      <ul className="ingredient-list">
        {meal.ingredients.map((ingredient) => (
          <li key={`${ingredient.item}-${ingredient.unit}`}>
            <strong>{formatAmount(ingredient.amount * factor)} {ingredient.unit}</strong> {ingredient.item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function HighProteinMeals() {
  const [category, setCategory] = useState<keyof typeof meals>("Breakfast");
  return (
    <section className="meal-ideas-section">
      <div className="meal-ideas-intro">
        <div>
          <p className="eyebrow">Member recipe garden</p>
          <h2>High-Protein Meal Ideas</h2>
          <p>Choose breakfast, lunch, dinner, or snacks, then adjust the servings for your household. Ingredient amounts update automatically.</p>
        </div>
        <span className="meal-sprout" aria-hidden="true">🥕</span>
      </div>
      <div className="meal-tabs" role="tablist" aria-label="Meal categories">
        {(Object.keys(meals) as Array<keyof typeof meals>).map((name) => (
          <button key={name} type="button" role="tab" aria-selected={category === name} className={category === name ? "active" : ""} onClick={() => setCategory(name)}>{name}</button>
        ))}
      </div>
      <div className="meal-grid">
        {meals[category].map((meal) => <MealCard key={meal.title} meal={meal} />)}
      </div>
      <p className="meal-disclaimer">Protein amounts are estimates and vary by product and portion. Educational information only—not medical or individualized nutrition advice.</p>
    </section>
  );
}
