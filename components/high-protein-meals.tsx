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
    {
      title: "Blueberry Cottage Cheese Pancakes",
      description: "Blender pancakes made with oats, cottage cheese, eggs, and blueberries.",
      protein: "About 26g protein per serving",
      baseServings: 2,
      ingredients: [
        { amount: 1, unit: "cup", item: "cottage cheese" },
        { amount: 1, unit: "cup", item: "rolled oats" },
        { amount: 3, unit: "", item: "large eggs" },
        { amount: 1, unit: "cup", item: "blueberries" },
        { amount: 1, unit: "tsp", item: "cinnamon" },
      ],
    },
    {
      title: "Smoked Salmon Breakfast Toast",
      description: "Whole-grain toast with eggs, smoked salmon, cucumber, and yogurt spread.",
      protein: "About 30g protein per serving",
      baseServings: 2,
      ingredients: [
        { amount: 4, unit: "slices", item: "whole-grain bread" },
        { amount: 4, unit: "", item: "large eggs" },
        { amount: 4, unit: "oz", item: "smoked salmon" },
        { amount: 0.5, unit: "cup", item: "plain Greek yogurt" },
        { amount: 1, unit: "cup", item: "sliced cucumber" },
      ],
    },
    {
      title: "Peach Almond Overnight Oats",
      description: "Prep-ahead oats with Greek yogurt, chia seeds, peaches, and almond butter.",
      protein: "About 23g protein per serving",
      baseServings: 2,
      ingredients: [
        { amount: 1, unit: "cup", item: "rolled oats" },
        { amount: 1.5, unit: "cups", item: "plain Greek yogurt" },
        { amount: 1, unit: "cup", item: "diced peaches" },
        { amount: 2, unit: "tbsp", item: "almond butter" },
        { amount: 2, unit: "tbsp", item: "chia seeds" },
      ],
    },
    {
      title: "Ham & Vegetable Egg Muffins",
      description: "Make-ahead egg cups filled with ham, garden vegetables, and cheese.",
      protein: "About 25g protein per serving",
      baseServings: 4,
      ingredients: [
        { amount: 10, unit: "", item: "large eggs" },
        { amount: 8, unit: "oz", item: "diced ham" },
        { amount: 2, unit: "cups", item: "chopped vegetables" },
        { amount: 1, unit: "cup", item: "shredded cheese" },
        { amount: 0.5, unit: "cup", item: "milk" },
      ],
    },
    {
      title: "Banana Peanut Butter Smoothie Bowl",
      description: "A thick Greek yogurt smoothie topped with banana, peanut butter, and seeds.",
      protein: "About 27g protein per serving",
      baseServings: 1,
      ingredients: [
        { amount: 1, unit: "cup", item: "plain Greek yogurt" },
        { amount: 1, unit: "", item: "frozen banana" },
        { amount: 2, unit: "tbsp", item: "peanut butter" },
        { amount: 0.5, unit: "cup", item: "milk" },
        { amount: 1, unit: "tbsp", item: "hemp hearts" },
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
    {
      title: "Southwest Chicken & Black Bean Bowls",
      description: "Chicken, black beans, corn, salsa, and greens in an easy meal-prep bowl.",
      protein: "About 41g protein per serving",
      baseServings: 4,
      ingredients: [
        { amount: 1.5, unit: "lb", item: "cooked chicken, chopped" },
        { amount: 2, unit: "cups", item: "black beans, rinsed" },
        { amount: 2, unit: "cups", item: "cooked brown rice" },
        { amount: 1, unit: "cup", item: "corn" },
        { amount: 1, unit: "cup", item: "salsa" },
      ],
    },
    {
      title: "Salmon Chickpea Salad",
      description: "Flaked salmon, chickpeas, cucumber, and herbs with a lemon-yogurt dressing.",
      protein: "About 35g protein per serving",
      baseServings: 4,
      ingredients: [
        { amount: 1, unit: "lb", item: "cooked salmon, flaked" },
        { amount: 2, unit: "cups", item: "chickpeas, rinsed" },
        { amount: 2, unit: "cups", item: "diced cucumber and tomato" },
        { amount: 0.75, unit: "cup", item: "plain Greek yogurt" },
        { amount: 1, unit: "", item: "lemon, juiced" },
      ],
    },
    {
      title: "Turkey Taco Lettuce Boats",
      description: "Seasoned ground turkey and beans tucked into crisp lettuce leaves.",
      protein: "About 33g protein per serving",
      baseServings: 4,
      ingredients: [
        { amount: 1.5, unit: "lb", item: "lean ground turkey" },
        { amount: 1.5, unit: "cups", item: "pinto beans, rinsed" },
        { amount: 12, unit: "", item: "large lettuce leaves" },
        { amount: 1, unit: "cup", item: "diced tomatoes" },
        { amount: 0.5, unit: "cup", item: "shredded cheese" },
      ],
    },
    {
      title: "Mediterranean Lentil Chicken Salad",
      description: "A hearty cold salad with chicken, lentils, vegetables, feta, and herbs.",
      protein: "About 39g protein per serving",
      baseServings: 4,
      ingredients: [
        { amount: 1.25, unit: "lb", item: "cooked chicken, chopped" },
        { amount: 2, unit: "cups", item: "cooked lentils" },
        { amount: 2, unit: "cups", item: "chopped cucumber and tomato" },
        { amount: 0.75, unit: "cup", item: "crumbled feta" },
        { amount: 2, unit: "tbsp", item: "olive oil and lemon dressing" },
      ],
    },
    {
      title: "Egg Salad Protein Pitas",
      description: "Greek-yogurt egg salad with crunchy celery in whole-grain pita pockets.",
      protein: "About 28g protein per serving",
      baseServings: 2,
      ingredients: [
        { amount: 6, unit: "", item: "hard-boiled eggs" },
        { amount: 0.5, unit: "cup", item: "plain Greek yogurt" },
        { amount: 0.5, unit: "cup", item: "diced celery" },
        { amount: 2, unit: "", item: "whole-grain pita pockets" },
        { amount: 1, unit: "cup", item: "baby spinach" },
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
    {
      title: "Slow-Cooker Salsa Chicken",
      description: "Tender shredded chicken and beans for bowls, wraps, or salads.",
      protein: "About 42g protein per serving",
      baseServings: 6,
      ingredients: [
        { amount: 2.5, unit: "lb", item: "boneless chicken breast" },
        { amount: 2, unit: "cups", item: "black beans, rinsed" },
        { amount: 2, unit: "cups", item: "salsa" },
        { amount: 1, unit: "cup", item: "corn" },
        { amount: 1, unit: "tsp", item: "ground cumin" },
      ],
    },
    {
      title: "Herbed Pork Tenderloin Supper",
      description: "Roasted pork tenderloin with carrots, potatoes, and green vegetables.",
      protein: "About 40g protein per serving",
      baseServings: 6,
      ingredients: [
        { amount: 2.5, unit: "lb", item: "pork tenderloin" },
        { amount: 2, unit: "lb", item: "baby potatoes" },
        { amount: 4, unit: "cups", item: "carrots and green vegetables" },
        { amount: 2, unit: "tbsp", item: "olive oil" },
        { amount: 2, unit: "tbsp", item: "chopped fresh herbs" },
      ],
    },
    {
      title: "White Bean Chicken Soup",
      description: "A cozy one-pot soup with chicken, white beans, vegetables, and herbs.",
      protein: "About 36g protein per serving",
      baseServings: 6,
      ingredients: [
        { amount: 2, unit: "lb", item: "cooked chicken, shredded" },
        { amount: 3, unit: "cups", item: "white beans, rinsed" },
        { amount: 6, unit: "cups", item: "lower-sodium chicken broth" },
        { amount: 3, unit: "cups", item: "chopped vegetables" },
        { amount: 2, unit: "cups", item: "baby spinach" },
      ],
    },
    {
      title: "Stuffed Pepper Protein Boats",
      description: "Bell peppers filled with lean beef, quinoa, beans, and tomato.",
      protein: "About 34g protein per serving",
      baseServings: 4,
      ingredients: [
        { amount: 4, unit: "", item: "large bell peppers, halved" },
        { amount: 1.5, unit: "lb", item: "lean ground beef" },
        { amount: 2, unit: "cups", item: "cooked quinoa" },
        { amount: 1.5, unit: "cups", item: "beans, rinsed" },
        { amount: 1.5, unit: "cups", item: "tomato sauce" },
      ],
    },
    {
      title: "Garlic Shrimp Quinoa Skillet",
      description: "Shrimp, quinoa, peas, and garden vegetables in a bright garlic-lemon skillet.",
      protein: "About 37g protein per serving",
      baseServings: 4,
      ingredients: [
        { amount: 1.5, unit: "lb", item: "peeled shrimp" },
        { amount: 3, unit: "cups", item: "cooked quinoa" },
        { amount: 2, unit: "cups", item: "peas and chopped vegetables" },
        { amount: 2, unit: "tbsp", item: "olive oil" },
        { amount: 1, unit: "", item: "lemon, juiced" },
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
    {
      title: "Chocolate Peanut Butter Yogurt Cup",
      description: "Greek yogurt mixed with cocoa and peanut butter for a creamy snack.",
      protein: "About 22g protein per serving",
      baseServings: 1,
      ingredients: [
        { amount: 1, unit: "cup", item: "plain Greek yogurt" },
        { amount: 1, unit: "tbsp", item: "peanut butter" },
        { amount: 1, unit: "tbsp", item: "unsweetened cocoa powder" },
        { amount: 1, unit: "tsp", item: "honey, optional" },
      ],
    },
    {
      title: "No-Bake Oat Energy Bites",
      description: "Prep-ahead bites with oats, nut butter, hemp hearts, and chia seeds.",
      protein: "About 10g protein per serving",
      baseServings: 6,
      ingredients: [
        { amount: 2, unit: "cups", item: "rolled oats" },
        { amount: 1, unit: "cup", item: "peanut or almond butter" },
        { amount: 0.5, unit: "cup", item: "hemp hearts" },
        { amount: 0.25, unit: "cup", item: "chia seeds" },
        { amount: 0.33, unit: "cup", item: "honey" },
      ],
    },
    {
      title: "Edamame Garden Cups",
      description: "Shelled edamame tossed with cucumber, carrots, lemon, and seeds.",
      protein: "About 15g protein per serving",
      baseServings: 2,
      ingredients: [
        { amount: 2, unit: "cups", item: "cooked shelled edamame" },
        { amount: 1, unit: "cup", item: "diced cucumber and carrots" },
        { amount: 2, unit: "tbsp", item: "sunflower seeds" },
        { amount: 1, unit: "", item: "lemon, juiced" },
      ],
    },
    {
      title: "Mini Chicken Hummus Plates",
      description: "A balanced snack plate with chicken, hummus, vegetables, and crackers.",
      protein: "About 24g protein per serving",
      baseServings: 2,
      ingredients: [
        { amount: 6, unit: "oz", item: "cooked chicken, sliced" },
        { amount: 0.5, unit: "cup", item: "hummus" },
        { amount: 2, unit: "cups", item: "sliced vegetables" },
        { amount: 12, unit: "", item: "whole-grain crackers" },
      ],
    },
    {
      title: "Ricotta Pear Toast",
      description: "Whole-grain toast with ricotta, sliced pear, cinnamon, and walnuts.",
      protein: "About 16g protein per serving",
      baseServings: 2,
      ingredients: [
        { amount: 4, unit: "slices", item: "whole-grain bread" },
        { amount: 1, unit: "cup", item: "ricotta cheese" },
        { amount: 1, unit: "", item: "pear, thinly sliced" },
        { amount: 0.25, unit: "cup", item: "chopped walnuts" },
        { amount: 0.5, unit: "tsp", item: "cinnamon" },
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
