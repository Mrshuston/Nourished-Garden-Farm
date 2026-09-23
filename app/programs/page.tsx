import type { Metadata } from "next";
import Link from "next/link";
import { ProgramCard } from "@/components/program-card";
import { programs } from "@/lib/programs";

export const metadata: Metadata = { title: "Programs", description: "Browse holistic health coaching programs for families, children, adults, healthy aging, clean eating, gardening, stress support, and everyday wellness." };

export default function ProgramsPage() {
  return <main><section className="page-hero"><p className="eyebrow">Your resource garden</p><h1>Programs for calmer, healthier living</h1><p>Browse every program, read what is included, and choose the support that fits your family’s current season.</p><div className="button-row"><Link className="button button-primary" href="/program-finder">Take the Program Finder quiz</Link></div></section><section className="content-section"><div className="program-grid">{programs.map((program) => <ProgramCard key={program.slug} program={program}/>)}</div></section></main>;
}
