import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { getProgram } from "@/lib/programs";

export default async function MemberProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();
  const user = await currentUser();
  const access = Array.isArray(user?.publicMetadata.programs) ? user.publicMetadata.programs : [];
  if (!access.includes(slug)) redirect(`/programs/${slug}`);
  return <main><section className="lesson-page"><p className="eyebrow">Member program</p><h1>{program.title}</h1><p className="hero-lede">{program.outcome}</p><div className="lesson-list">{program.lessons.map((lesson, index) => <article key={lesson}><span>{String(index + 1).padStart(2,"0")}</span><div><h2>{lesson}</h2><p>Your lesson materials, worksheets, and video links can be added here as the curriculum is finalized.</p></div></article>)}</div></section></main>;
}
