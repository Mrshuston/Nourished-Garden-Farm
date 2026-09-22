"use client";

import { useState } from "react";
import Link from "next/link";

type Focus = "family" | "food" | "routines" | "rest" | "garden" | "personal";
type Choice = { label: string; focus: Focus };

const questions: { title: string; choices: Choice[] }[] = [
  { title: "What would you most like help with right now?", choices: [
    { label: "Making family days feel calmer", focus: "family" }, { label: "Eating more whole foods", focus: "food" },
    { label: "Creating predictable routines for my family", focus: "routines" }, { label: "Improving rest and stress habits", focus: "rest" },
    { label: "Growing some of our food", focus: "garden" }, { label: "Several goals at once", focus: "personal" },
  ] },
  { title: "Which part of the day feels hardest?", choices: [
    { label: "Mornings or bedtimes with the family", focus: "family" }, { label: "Planning, shopping, or preparing meals", focus: "food" },
    { label: "Transitions and staying on track", focus: "routines" }, { label: "Winding down and resting", focus: "rest" },
    { label: "Finding time or space to grow food", focus: "garden" }, { label: "It varies from day to day", focus: "personal" },
  ] },
  { title: "What would feel like a meaningful first win?", choices: [
    { label: "A calmer routine at home", focus: "family" }, { label: "A few easy whole-food meals", focus: "food" },
    { label: "A clear visual plan for daily tasks", focus: "routines" }, { label: "A more consistent evening routine", focus: "rest" },
    { label: "Harvesting herbs or vegetables", focus: "garden" }, { label: "A plan tailored to my priorities", focus: "personal" },
  ] },
  { title: "Which support sounds most useful?", choices: [
    { label: "Family checklists and accountability", focus: "family" }, { label: "Meal ideas and food habit guidance", focus: "food" },
    { label: "Step-by-step routines and transitions", focus: "routines" }, { label: "Sleep and stress habit planning", focus: "rest" },
    { label: "Beginner gardening guidance", focus: "garden" }, { label: "Private coaching across multiple areas", focus: "personal" },
  ] },
  { title: "How would you describe your current routine?", choices: [
    { label: "Our household needs a simpler rhythm", focus: "family" }, { label: "Meals are the main challenge", focus: "food" },
    { label: "Predictability is hard to maintain", focus: "routines" }, { label: "I need more time to rest and reset", focus: "rest" },
    { label: "I want to make growing food part of life", focus: "garden" }, { label: "I am unsure where to begin", focus: "personal" },
  ] },
  { title: "What fits your life best this month?", choices: [
    { label: "Small changes for the whole family", focus: "family" }, { label: "One food habit at a time", focus: "food" },
    { label: "Consistent cues and daily structure", focus: "routines" }, { label: "A few minutes to slow down daily", focus: "rest" },
    { label: "A small garden or hydroponic project", focus: "garden" }, { label: "A personal conversation first", focus: "personal" },
  ] },
];

const matches: Record<Focus, { title: string; slug: string; description: string; firstStep: string }> = {
  family: { title: "Calmer Family Reset", slug: "calmer-family-reset", description: "Practical routines, whole-food foundations, and stress-supportive habits for busy homes.", firstStep: "Choose one morning or evening routine to simplify this week." },
  food: { title: "Clean Eating Made Simple", slug: "clean-eating-made-simple", description: "A realistic starting point for building confidence with whole foods, labels, and everyday meals.", firstStep: "Choose one meal or snack swap you could repeat this week." },
  routines: { title: "ADHD Parent Roadmap", slug: "adhd-parent-roadmap", description: "Support for parents building routines and connection with neurodivergent children.", firstStep: "Choose one daily transition and write down the next two steps." },
  rest: { title: "Family Wellness Reset", slug: "family-wellness-reset", description: "A shared plan for nourishment, movement, rest, organization, and connection.", firstStep: "Try one calming wind-down habit that fits your evening." },
  garden: { title: "Garden to Wellness", slug: "garden-to-wellness", description: "Start growing food at your own pace, including in a small space or with hydroponics.", firstStep: "Pick one herb or vegetable you would enjoy growing." },
  personal: { title: "Family Wellness Reset", slug: "family-wellness-reset", description: "A broader starting point when several wellness goals matter at once.", firstStep: "Choose two small goals to discuss on your free call." },
};

export function ProgramFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(Focus | null)[]>(Array(questions.length).fill(null));
  const finished = step === questions.length;
  const scores: Record<Focus, number> = { family: 0, food: 0, routines: 0, rest: 0, garden: 0, personal: 0 };
  answers.forEach((answer) => { if (answer) scores[answer] += 1; });
  const highest = Math.max(...Object.values(scores));
  const leaders = (Object.keys(scores) as Focus[]).filter((focus) => scores[focus] === highest);
  const match = matches[leaders.length === 1 ? leaders[0] : "personal"];

  function choose(focus: Focus) {
    setAnswers((current) => current.map((answer, index) => index === step ? focus : answer));
  }

  return <main className="finder-page"><div className="finder-shell garden-surface">
    <p className="eyebrow">The Nourished Garden &amp; Farm</p>
    <h1>Find your next healthy step</h1>
    <p className="finder-intro">Answer six quick questions to find a coaching program that fits your goals and routines right now.</p>
    {finished ? <div className="finder-result" aria-live="polite">
      <p className="finder-kicker">Your suggested program</p>
      <h2>{match.title}</h2><p>{match.description}</p>
      <div className="finder-tip"><strong>A gentle first step:</strong> {match.firstStep}</div>
      <p>Your result is a starting point. We can talk about your needs and decide together what fits.</p>
      <div className="button-row"><Link className="button button-primary" href={`/programs/${match.slug}`}>Explore this program</Link><a className="button button-secondary" href="https://calendly.com/thenourishedgardens/calm-call" target="_blank" rel="noopener noreferrer">Book a free 20-minute call</a></div>
      <button className="finder-text-button" onClick={() => { setStep(0); setAnswers(Array(questions.length).fill(null)); }}>Start again</button>
      <p className="fine-print">Health coaching provides educational and lifestyle support, not medical advice, diagnosis, or treatment. It does not replace care from a qualified healthcare professional. Individual results vary.</p>
    </div> : <div className="finder-question">
      <p className="finder-count">Question {step + 1} of {questions.length}</p><div className="finder-progress" role="progressbar" aria-label="Quiz progress" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={questions.length}><span style={{ width: `${(step + 1) / questions.length * 100}%` }} /></div>
      <h2>{questions[step].title}</h2>
      <div className="finder-options">{questions[step].choices.map((choice) => <button key={choice.label} type="button" className={`finder-option ${answers[step] === choice.focus ? "selected" : ""}`} aria-pressed={answers[step] === choice.focus} onClick={() => choose(choice.focus)}>{choice.label}</button>)}</div>
      <div className="finder-controls"><button className="button button-secondary" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button><button className="button button-primary" disabled={!answers[step]} onClick={() => setStep(step + 1)}>{step === questions.length - 1 ? "See my match" : "Next"}</button></div>
    </div>}
  </div></main>;
}
