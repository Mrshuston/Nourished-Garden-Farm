import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { CustomerPortalButton } from "@/components/customer-portal-button";
import { programs } from "@/lib/programs";

export default async function MembersPage() {
  const user = await currentUser();
  const access = Array.isArray(user?.publicMetadata.programs) ? user.publicMetadata.programs.filter((value): value is string => typeof value === "string") : [];
  const owned = programs.filter((program) => access.includes(program.slug));
  const discover = programs.filter((program) => !access.includes(program.slug));
  return <main><section className="member-hero"><div><p className="eyebrow">Your member garden</p><h1>Welcome{user?.firstName ? `, ${user.firstName}` : ""}.</h1><p>Your purchased programs and free resources live here. Return anytime and continue at your own pace.</p></div><CustomerPortalButton /></section><section className="content-section"><h2>Your programs</h2>{owned.length ? <div className="member-grid">{owned.map((program) => <article className="member-card" key={program.slug}><span className="access-pill">Access active</span><h3>{program.title}</h3><p>{program.outcome}</p><ul>{program.lessons.map((lesson) => <li key={lesson}>{lesson}</li>)}</ul>{program.free ? <a className="button button-primary" href="/downloads/calmer-family-week.txt">Download guide</a> : <Link className="button button-primary" href={`/members/programs/${program.slug}`}>Open program</Link>}</article>)}</div> : <div className="empty-state"><span>🌱</span><h3>Your garden is ready to grow</h3><p>Choose a program and it will appear here after checkout.</p><Link className="button button-primary" href="/programs">Browse programs</Link></div>}</section>{discover.length > 0 && <section className="discover-section"><h2>Explore more support</h2><div className="mini-grid">{discover.slice(0,3).map((program) => <Link key={program.slug} href={`/programs/${program.slug}`}><span>{program.eyebrow}</span><strong>{program.title}</strong><small>{program.price}</small></Link>)}</div></section>}</main>;
}
