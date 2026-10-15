import type { Metadata } from "next";
import Link from "next/link";
import { ProgramCard } from "@/components/program-card";
import { programs } from "@/lib/programs";

export const metadata: Metadata = { title: "Programs", description: "Browse holistic health coaching programs for families, children, adults, healthy aging, clean eating, gardening, stress support, and everyday wellness." };

const startPrograms = programs.filter((program) => program.level === "start");
const learnPrograms = programs.filter((program) => program.level === "learn");
const growPrograms = programs.filter((program) => program.level === "grow");

function ProgramSection({ step, title, price, description, items }: { step: string; title: string; price: string; description: string; items: typeof programs }) {
  return <section className="program-level-section"><div className="program-level-heading"><div><p className="eyebrow">{step}</p><h2>{title}</h2><p>{description}</p></div><strong>{price}</strong></div><div className="program-grid">{items.map((program) => <ProgramCard key={program.slug} program={program}/>)}</div></section>;
}

export default function ProgramsPage() {
  return <main><section className="page-hero"><p className="eyebrow">Four clear ways to begin</p><h1>Choose the support that fits you now</h1><p>Start free, learn independently, grow with a live group, or receive private one-on-one support.</p><div className="button-row"><Link className="button button-primary" href="/program-finder">Take the Program Finder quiz</Link></div></section><div className="content-section program-levels"><ProgramSection step="1 · Start" title="Begin with a free guide" price="Free" description="Try one practical resource and experience our approach without pressure." items={startPrograms}/><ProgramSection step="2 · Learn" title="Move at your own pace" price="$39–$97" description="Use practical lessons, worksheets, and tools whenever they fit your schedule." items={learnPrograms}/><ProgramSection step="3 · Grow Together" title="Join live group coaching" price="$597–$797" description="Receive live coaching, shared encouragement, and accountability in a supportive small group." items={growPrograms}/><section className="program-level-section private-support-section"><div className="program-level-heading"><div><p className="eyebrow">4 · Personal Support</p><h2>Private coaching built around you</h2><p>Receive personalized one-on-one support for your routines, goals, schedule, and family needs.</p></div><strong>$1,497–$2,500</strong></div><div className="private-support-card"><div><h3>Your personal coaching path</h3><p>We will choose the right length and level of support during a free wellness call. Payment options may be available.</p></div><a className="button button-primary" href="https://calendly.com/thenourishedgardens/calm-call" target="_blank" rel="noreferrer">Book a free wellness call</a></div></section></div></main>;
}
