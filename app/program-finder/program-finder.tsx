"use client";

import { useState } from "react";
import Link from "next/link";

type Audience = "family" | "child" | "adultAdhd" | "woman" | "man" | "older" | "general";
type Readiness = "self-paced" | "coaching" | "unsure";
type Match = { title: string; slug: string; description: string; firstStep: string };

const audiences: { label: string; value: Audience }[] = [
  { label: "My whole family", value: "family" },
  { label: "A child with ADHD", value: "child" },
  { label: "An adult with ADHD", value: "adultAdhd" },
  { label: "A busy mom or woman over 40", value: "woman" },
  { label: "A man over 40", value: "man" },
  { label: "An adult over 60", value: "older" },
  { label: "Me—I want general wellness support", value: "general" },
];

const matches: Record<string, Match> = {
  "calmer-family-week": { title: "5 Simple Changes for a Calmer Family Week", slug: "calmer-family-week", description: "A free seven-day starting point for overwhelmed families who want simpler rhythms.", firstStep: "Choose one morning or evening routine to make a little easier." },
  "calmer-family-reset": { title: "Calm Home, Connected Family — 6 Weeks", slug: "calmer-family-reset", description: "A focused family reset for practical routines, nourishment, sleep, and connection.", firstStep: "Choose one family routine you would most like to simplify." },
  "family-wellness-reset": { title: "Calm Home, Connected Family — 12 Weeks", slug: "family-wellness-reset", description: "Deeper whole-family coaching for calmer rhythms, emotional connection, and sustainable household habits.", firstStep: "Write down the three moments that create the most stress at home." },
  "clean-eating-made-simple": { title: "Clean Eating Health Coaching Program", slug: "clean-eating-made-simple", description: "A realistic whole-food program for shopping, balanced meals, and sustainable food habits.", firstStep: "Choose one meal or snack you would like to make more nourishing." },
  "adhd-parent-roadmap": { title: "Calm & Capable Kids", slug: "adhd-parent-roadmap", description: "Strength-based support for calmer routines, big feelings, food, sleep, confidence, and independence.", firstStep: "Choose one daily transition and make its next two steps visible." },
  "focused-flourishing": { title: "Focused & Flourishing", slug: "focused-flourishing", description: "Practical coaching for adults with ADHD who want less overwhelm and more workable routines.", firstStep: "Choose one daily priority and write it where you will see it." },
  "strong-nourished-mama": { title: "Strong & Nourished Mama", slug: "strong-nourished-mama", description: "Whole-person wellness support for busy moms building energy, strength, and sustainable nourishment habits.", firstStep: "Choose one meal or movement habit that can fit your busiest day." },
  "rooted-renewed": { title: "Rooted & Renewed", slug: "rooted-renewed", description: "Lifestyle coaching for women over 40 focused on nourishment, movement, sleep, and steady habits.", firstStep: "Notice which area—food, movement, sleep, or stress—needs support first." },
  "strong-roots": { title: "Strong Roots", slug: "strong-roots", description: "Practical wellness coaching for men over 40 who want more energy, strength, and consistency.", firstStep: "Choose one repeatable habit for meals, movement, or sleep." },
  "steady-strong": { title: "Steady & Strong", slug: "steady-strong", description: "Lifestyle coaching for adults over 60 managing insulin resistance alongside their medical care.", firstStep: "Ask your clinician which lifestyle goal would best support your current care plan." },
  "rooted-restored": { title: "Rooted & Restored", slug: "rooted-restored", description: "Gentle lifestyle coaching for stress, overwhelm, and emotional wellness alongside licensed care when needed.", firstStep: "Choose one five-minute calming practice you can repeat each day." },
  "garden-to-wellness": { title: "Garden to Wellness", slug: "garden-to-wellness", description: "Simple gardening and food-growing projects for nourishment, confidence, and connection.", firstStep: "Pick one herb or vegetable you would enjoy growing." },
  "red-light-foundations": { title: "Red Light Therapy Foundations", slug: "red-light-foundations", description: "Educational guidance about red-light devices, routines, questions, and safety conversations.", firstStep: "Find your device instructions and write down any safety questions for a qualified professional." },
  "rooted-radiant": { title: "Rooted & Radiant", slug: "rooted-radiant", description: "A stress-and-skin wellness reset with nourishing habits, sleep, movement, gentle skin care, and optional red-light education.", firstStep: "Choose one calming habit to pair with your existing skin-care routine." },
};

const goals: Record<Audience, { label: string; slug: string }[]> = {
  family: [
    { label: "I want a free, gentle place to begin", slug: "calmer-family-week" },
    { label: "We need a focused six-week family reset", slug: "calmer-family-reset" },
    { label: "We want deeper 12-week family support", slug: "family-wellness-reset" },
    { label: "Meals and whole-food habits are hardest", slug: "clean-eating-made-simple" },
    { label: "We want to grow food together", slug: "garden-to-wellness" },
  ],
  child: [
    { label: "Calmer routines, emotions, food, sleep, and confidence", slug: "adhd-parent-roadmap" },
    { label: "Our whole family needs a shorter reset", slug: "calmer-family-reset" },
    { label: "Our whole family needs deeper support", slug: "family-wellness-reset" },
  ],
  adultAdhd: [
    { label: "Focus, time, routines, energy, and overwhelm", slug: "focused-flourishing" },
    { label: "Food habits and easier meals", slug: "clean-eating-made-simple" },
    { label: "Stress and emotional wellness", slug: "rooted-restored" },
  ],
  woman: [
    { label: "I am a busy mom who needs sustainable habits", slug: "strong-nourished-mama" },
    { label: "I am over 40 and want steady wellness support", slug: "rooted-renewed" },
    { label: "I want help with stress and emotional wellness", slug: "rooted-restored" },
    { label: "I want a clean-eating foundation", slug: "clean-eating-made-simple" },
    { label: "I want stress and skin wellness support", slug: "rooted-radiant" },
  ],
  man: [
    { label: "Energy, strength, nourishment, and consistency", slug: "strong-roots" },
    { label: "Food habits and easier meals", slug: "clean-eating-made-simple" },
    { label: "Stress and emotional wellness", slug: "rooted-restored" },
  ],
  older: [
    { label: "Healthy aging and insulin-resistance support", slug: "steady-strong" },
    { label: "Clean eating and balanced meals", slug: "clean-eating-made-simple" },
    { label: "Gentle stress and emotional-wellness support", slug: "rooted-restored" },
    { label: "Gardening for nourishment and movement", slug: "garden-to-wellness" },
  ],
  general: [
    { label: "Whole-food nutrition", slug: "clean-eating-made-simple" },
    { label: "Stress and emotional wellness", slug: "rooted-restored" },
    { label: "Gardening and growing food", slug: "garden-to-wellness" },
    { label: "Red-light therapy education", slug: "red-light-foundations" },
    { label: "Stress and skin wellness", slug: "rooted-radiant" },
  ],
};

export function ProgramFinder() {
  const [step, setStep] = useState(0);
  const [audience, setAudience] = useState<Audience | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [readiness, setReadiness] = useState<Readiness | null>(null);
  const match = slug ? matches[slug] : null;

  function restart() { setStep(0); setAudience(null); setSlug(null); setReadiness(null); }

  return <main className="finder-page"><div className="finder-shell garden-surface">
    <p className="eyebrow">The Nourished Garden &amp; Farm</p>
    <h1>Find your next healthy step</h1>
    <p className="finder-intro">Answer three quick questions to find the program that best fits who you are supporting and what feels hardest right now.</p>
    {step === 3 && match ? <div className="finder-result" aria-live="polite">
      <p className="finder-kicker">Your suggested program</p>
      <h2>{match.title}</h2><p>{match.description}</p>
      <div className="finder-tip"><strong>A gentle first step:</strong> {match.firstStep}</div>
      <p>{readiness === "unsure" ? "You do not have to decide alone. A free call can help you talk through your needs and options." : "Your result is a starting point. You can review the program or book a free conversation before deciding."}</p>
      <div className="button-row"><Link className="button button-primary" href={`/programs/${match.slug}`}>Explore this program</Link><a className="button button-secondary" href="https://calendly.com/thenourishedgardens/calm-call" target="_blank" rel="noopener noreferrer">Book a free 20-minute call</a></div>
      <button className="finder-text-button" onClick={restart}>Start again</button>
      <p className="fine-print">Health coaching provides educational and lifestyle support, not medical advice, diagnosis, or treatment. It does not replace care from a qualified healthcare professional. Individual results vary.</p>
    </div> : <div className="finder-question">
      <p className="finder-count">Question {step + 1} of 3</p><div className="finder-progress" role="progressbar" aria-label="Quiz progress" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={3}><span style={{ width: `${(step + 1) / 3 * 100}%` }} /></div>
      {step === 0 && <><h2>Who are you looking to support?</h2><div className="finder-options">{audiences.map((item) => <button key={item.value} type="button" className={`finder-option ${audience === item.value ? "selected" : ""}`} aria-pressed={audience === item.value} onClick={() => { setAudience(item.value); setSlug(null); }}>{item.label}</button>)}</div></>}
      {step === 1 && audience && <><h2>What would make the biggest difference right now?</h2><div className="finder-options">{goals[audience].map((item) => <button key={item.slug} type="button" className={`finder-option ${slug === item.slug ? "selected" : ""}`} aria-pressed={slug === item.slug} onClick={() => setSlug(item.slug)}>{item.label}</button>)}</div></>}
      {step === 2 && <><h2>How would you like to begin?</h2><div className="finder-options">
        <button type="button" className={`finder-option ${readiness === "self-paced" ? "selected" : ""}`} aria-pressed={readiness === "self-paced"} onClick={() => setReadiness("self-paced")}>I am ready to explore a program</button>
        <button type="button" className={`finder-option ${readiness === "coaching" ? "selected" : ""}`} aria-pressed={readiness === "coaching"} onClick={() => setReadiness("coaching")}>I want coaching and accountability</button>
        <button type="button" className={`finder-option ${readiness === "unsure" ? "selected" : ""}`} aria-pressed={readiness === "unsure"} onClick={() => setReadiness("unsure")}>I would like a free conversation first</button>
      </div></>}
      <div className="finder-controls"><button className="button button-secondary" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button><button className="button button-primary" disabled={(step === 0 && !audience) || (step === 1 && !slug) || (step === 2 && !readiness)} onClick={() => setStep(step + 1)}>{step === 2 ? "See my match" : "Next"}</button></div>
    </div>}
  </div></main>;
}
