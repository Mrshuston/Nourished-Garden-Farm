import type { Metadata } from "next";
import { ProgramCard } from "@/components/program-card";
import { programs } from "@/lib/programs";

export const metadata: Metadata = { title: "Programs", description: "Browse self-paced family wellness, clean eating, ADHD parent, garden, and holistic health coaching programs." };

export default function ProgramsPage() {
  return <main><section className="page-hero"><p className="eyebrow">Your resource garden</p><h1>Programs for calmer, healthier living</h1><p>Browse every program, read what is included, and choose the support that fits your family’s current season.</p></section><section className="content-section"><div className="program-grid">{programs.map((program) => <ProgramCard key={program.slug} program={program}/>)}</div></section></main>;
}
