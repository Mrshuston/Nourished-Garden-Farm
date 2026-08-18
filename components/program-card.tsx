import Link from "next/link";
import type { Program } from "@/lib/programs";

export function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="program-card">
      <p className="eyebrow">{program.eyebrow}</p>
      <h3>{program.title}</h3>
      <p>{program.description}</p>
      <div className="program-meta"><span>{program.length}</span><strong>{program.price}</strong></div>
      <Link className="text-link" href={`/programs/${program.slug}`}>View program <span aria-hidden>→</span></Link>
    </article>
  );
}
