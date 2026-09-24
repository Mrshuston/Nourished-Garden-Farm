"use client";

import { useEffect, useMemo, useState } from "react";

const inspirations = [
  "Small steps, repeated with care, can grow into lasting change.",
  "You do not have to do everything today. Tend to what matters most.",
  "Progress can be quiet and still be powerful.",
  "Give yourself the same patience you would give a growing garden.",
  "A gentle beginning is still a beginning.",
  "Today is another chance to nourish what you want to grow.",
  "Your pace is allowed to be peaceful.",
  "One supportive choice can change the direction of your whole day.",
  "Rest is part of growth, not a reward for finishing everything.",
  "You are building healthier roots every time you begin again.",
  "Choose consistency over perfection and kindness over pressure.",
  "A calmer life is created one small rhythm at a time.",
  "Notice what is working, even if it feels small.",
  "You are capable of making today a little lighter.",
  "Nourish your body, protect your peace, and trust the next step.",
  "Growth does not need to be rushed to be real.",
  "Let today be simple: breathe, begin, and keep going gently.",
  "Every healthy habit starts with one ordinary choice.",
  "Your family does not need perfection; it needs connection.",
  "Make room for the habits that help you feel rooted and well.",
  "A difficult day does not erase the progress you have made.",
  "You can pause, reset, and choose your next step with care.",
  "Celebrate the effort it took to show up today.",
  "Healthy change grows best when it fits your real life.",
  "Be proud of the roots you are strengthening, even before others see the growth.",
  "You are worthy of routines that support your body and your peace.",
  "Start where you are, use what you have, and take one kind step forward.",
  "There is strength in choosing a slower, steadier way.",
  "What you practice today becomes part of tomorrow's foundation.",
  "Keep tending to yourself; meaningful growth often happens beneath the surface.",
  "A brighter tomorrow can begin with one nourishing choice today.",
];

function localDateKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function inspirationIndex(date: Date) {
  const localMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor(localMidnight.getTime() / 86_400_000) % inspirations.length;
}

export function DailyInspiration() {
  const [isOpen, setIsOpen] = useState(false);
  const today = useMemo(() => new Date(), []);
  const dateKey = localDateKey(today);
  const quote = inspirations[inspirationIndex(today)];

  useEffect(() => {
    try {
      if (window.localStorage.getItem("nourished-garden-inspiration-seen") !== dateKey) {
        setIsOpen(true);
      }
    } catch {
      setIsOpen(true);
    }
  }, [dateKey]);

  function closeInspiration() {
    try {
      window.localStorage.setItem("nourished-garden-inspiration-seen", dateKey);
    } catch {
      // The quote still works when browser storage is unavailable.
    }
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <div className="inspiration-backdrop" role="presentation" onMouseDown={closeInspiration}>
          <section
            className="inspiration-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="daily-inspiration-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <span className="inspiration-sprout" aria-hidden="true">🌱</span>
            <p className="eyebrow">A moment for your garden</p>
            <h2 id="daily-inspiration-title">Today&apos;s inspiration</h2>
            <blockquote>“{quote}”</blockquote>
            <button className="button button-primary" type="button" onClick={closeInspiration} autoFocus>
              Carry this with me
            </button>
          </section>
        </div>
      )}

      <section className="daily-inspiration-card" aria-label="Today&apos;s inspiration">
        <span aria-hidden="true">🌿</span>
        <div>
          <p className="eyebrow">Today&apos;s garden thought</p>
          <blockquote>“{quote}”</blockquote>
        </div>
      </section>
    </>
  );
}
