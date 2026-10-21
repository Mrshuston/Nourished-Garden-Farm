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
  const levelLabel = program.level === "start" ? "Start" : program.level === "learn" ? "Learn" : program.level === "personal" ? "Personal Support" : "Grow Together";
  const isPrivate = program.slug === "rooted-regulated-private";
  return <main><section className="program-detail"><div><Link className="back-link" href="/programs">← All programs</Link><p className="eyebrow">{program.eyebrow}</p><h1>{program.title}</h1><p className="hero-lede">{program.description}</p><div className="outcome-box"><strong>What this program helps you do</strong><p>{program.outcome}</p></div>{isPrivate ? <div className="outcome-box"><strong>Designed for your real household</strong><p>Choose the Parent Path, Adult Path, or Whole-Family Path during your Family Mapping Session. Strategies are adjusted to your strengths, capacity, sensory preferences, schedule, and current priorities.</p></div> : null}</div><aside className="purchase-card"><p className="eyebrow">{levelLabel}</p><div className="purchase-price">{program.price}</div><p>{program.length} · {program.delivery}</p>{isPrivate ? <p><strong>Or three monthly payments of $525.</strong></p> : null}<ul>{program.lessons.map((lesson) => <li key={lesson}>✓ {lesson}</li>)}</ul><CheckoutButton slug={program.slug} free={program.free} inquiryOnly={program.inquiryOnly}/><p className="fine-print">{isPrivate ? "Book a free wellness call to discuss fit, scheduling, the founding-family rate when available, and payment options. Coaching is educational and does not diagnose or treat medical or mental-health conditions." : program.inquiryOnly ? "Book a free wellness call to discuss program fit, the next group start date, and available payment options." : program.free ? "Free member access. Sign in or create an account so the guide can be added to your Member Garden." : "Secure payment through Stripe. Sign in is required so your purchase can be added to your member garden."}</p></aside></section></main>;
}
