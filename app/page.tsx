import Link from "next/link";
import "./home.css";

const selfPacedPrograms = [
  { title: "Rooted & Radiant · 6 weeks", price: "$1 now", slug: "rooted-radiant" },
  { title: "Clean Eating Made Simple", price: "$59", slug: "clean-eating-made-simple" },
  { title: "Garden to Wellness", price: "$79", slug: "garden-to-wellness" },
  { title: "Red Light Foundations", price: "$39", slug: "red-light-foundations" },
];

export default function HomePage() {
  return (
    <main className="new-home">
      <section className="new-hero"><div className="home-wrap">
        <p className="eyebrow">Online holistic health coaching</p>
        <h1>Calmer homes and steadier habits, grown one small step at a time.</h1>
        <p className="new-lede">Health coaching for busy families and women who want simple routines that last. Start with a free guide, then go as deep as you need.</p>
        <div className="button-row"><Link className="button button-gold" href="/program-finder">Find my program in 2 minutes</Link><Link className="button button-secondary" href="/programs/calmer-family-week">Get the free 7-day guide</Link></div>
        <p className="trust-line">🌿 Small habits · Strong roots · Healthier lives</p>
      </div></section>

      <section id="programs" className="program-ladder-section"><div className="home-wrap">
        <p className="eyebrow">A path that grows with you</p><h2>Start where you are. Go deeper when you&apos;re ready.</h2>
        <p className="new-lede">Choose the level of education, accountability, and personal support that fits your season of life.</p>
        <div className="program-ladder">
          <article className="ladder-step ladder-free"><div><h3>Free guide</h3><p>5 Simple Changes for a Calmer Family Week—a gentle seven-day starting point.</p></div><strong className="ladder-price">Free</strong><Link className="ladder-link" href="/programs/calmer-family-week">Get the guide →</Link></article>
          <article className="ladder-step ladder-guides">
            <div><h3>Self-paced programs</h3><p>Practical education you can use on your own schedule, without pressure.</p></div><strong className="ladder-price">$39–$79</strong>
            <div className="program-mini-grid">{selfPacedPrograms.map((program) => <Link key={program.slug} href={`/programs/${program.slug}`}><span>{program.title}</span><b>{program.price}</b></Link>)}</div>
            <p className="launch-note">Rooted &amp; Radiant is $1 through October 20, 2026, then $98.</p>
          </article>
          <article className="ladder-step ladder-group"><div><h3>Group coaching</h3><p>Live calls, a small supportive group, and a plan built for your current season.</p></div><strong className="ladder-price">$597–$697</strong><a className="ladder-link" href="https://calendly.com/thenourishedgardens/calm-call" target="_blank" rel="noreferrer">Ask about the next group →</a></article>
          <article className="ladder-step ladder-membership"><div><h3>Member Garden</h3><p>Monthly encouragement, recipes, routines, check-ins, and tools that keep you moving forward.</p></div><strong className="ladder-price">$39 <small>per month</small></strong><Link className="ladder-link" href="/members">Visit the Member Garden →</Link></article>
          <article className="ladder-step ladder-private"><div><h3>Private coaching</h3><p>Personalized one-on-one support built around your family, schedule, and wellness goals.</p></div><strong className="ladder-price">From $2,500</strong><a className="ladder-link" href="https://calendly.com/thenourishedgardens/calm-call" target="_blank" rel="noreferrer">Apply with a free call →</a></article>
        </div>
      </div></section>

      <section id="coaching" className="flagship-section"><div className="home-wrap">
        <p className="eyebrow">Live group coaching</p><h2>Built for two kinds of busy.</h2>
        <div className="flagship-grid">
          <article className="flagship-card"><p className="card-kicker">For parents and families</p><h3>Calm &amp; Capable Kids</h3><p className="card-meta">12 weeks · Live group calls · $697</p><ul><li>Create calmer mornings, transitions, and bedtimes.</li><li>Build supportive routines around your child&apos;s strengths.</li><li>Gain education, accountability, and parent encouragement.</li></ul><Link className="button button-primary" href="/programs/adhd-parent-roadmap">See the program</Link></article>
          <article className="flagship-card"><p className="card-kicker">For women over 40</p><h3>Rooted &amp; Renewed</h3><p className="card-meta">12 weeks · Live group calls · $597</p><ul><li>Build steadier habits for nourishment, movement, and rest.</li><li>Create routines that work with a full family schedule.</li><li>Focus on consistent progress without a rigid plan.</li></ul><Link className="button button-primary" href="/programs/rooted-renewed">See the program</Link></article>
        </div>
        <p className="choice-note">Not sure which fits? <Link href="/program-finder">Take the two-minute quiz</Link> or <a href="https://calendly.com/thenourishedgardens/calm-call" target="_blank" rel="noreferrer">book a free call</a>.</p>
      </div></section>

      <section id="about" className="about-home-section"><div className="home-wrap about-home-grid">
        <div className="about-symbol" aria-hidden="true">🌻</div><div><p className="eyebrow">Why this work matters</p><h2>Nourishing the body from the soil to the soul.</h2><p>Kassandra created The Nourished Garden &amp; Farm after 11 years in the medical field and her own experience searching for realistic ways to support her family.</p><p>Her approach turns overwhelming wellness goals into manageable habits involving food, rest, movement, family routines, organization, and practical garden-grown skills. Coaching is compassionate, educational, and designed to work alongside—not replace—licensed healthcare.</p></div>
      </div></section>

      <section id="faq" className="faq-section"><div className="home-wrap">
        <p className="eyebrow">Common questions</p><h2>Before you begin</h2>
        <div className="faq-list"><details><summary>Is this medical advice?</summary><p>No. These programs provide educational health coaching, not medical advice, diagnosis, or treatment. Individual experiences and results vary.</p></details><details><summary>Will coaching replace my doctor or therapist?</summary><p>No. Coaching is designed to complement appropriate medical and mental-health care. Continue following your care team&apos;s guidance and consult them before making health-related changes.</p></details><details><summary>How do live group calls work?</summary><p>Call dates and times are shared before enrollment. Participants receive live coaching, practical weekly steps, and information about any available replay.</p></details><details><summary>Which program should I choose?</summary><p>Take the two-minute Program Finder Quiz, or book a free wellness call and we can talk through your goals.</p></details></div>
      </div></section>

      <section className="new-final-cta"><div className="home-wrap"><h2>Ready for a calmer week?</h2><p>Begin with the free guide, or talk with Kassandra about what fits you or your family.</p><div className="button-row centered-buttons"><Link className="button button-gold" href="/programs/calmer-family-week">Get the free guide</Link><a className="button button-light-outline" href="https://calendly.com/thenourishedgardens/calm-call" target="_blank" rel="noreferrer">Book a free call</a></div></div></section>
    </main>
  );
}
