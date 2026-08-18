import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckoutButton } from "@/components/checkout-button";
import { getProgram, programs } from "@/lib/programs";

export function generateStaticParams() { return programs.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const program = getProgram((await params).slug);
  return program ? { title: program.title, description: program.description } : {};
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const program = getProgram((await params).slug);
  if (!program) notFound();
  return <main><section className="program-detail"><div><Link className="back-link" href="/programs">← All programs</Link><p className="eyebrow">{program.eyebrow}</p><h1>{program.title}</h1><p className="hero-lede">{program.description}</p><div className="outcome-box"><strong>What this program helps you do</strong><p>{program.outcome}</p></div></div><aside className="purchase-card"><p className="eyebrow">Program access</p><div className="purchase-price">{program.price}</div><p>{program.length} · Self-paced</p><ul>{program.lessons.map((lesson) => <li key={lesson}>✓ {lesson}</li>)}</ul><CheckoutButton slug={program.slug} free={program.free}/><p className="fine-print">Secure payment through Stripe. Sign in is required so your purchase can be added to your member garden.</p></aside></section></main>;
}
