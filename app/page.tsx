import Link from "next/link";
import { ProgramCard } from "@/components/program-card";
import { programs } from "@/lib/programs";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Whole-person wellness for real family life</p>
          <h1>Small steps.<br/><em>Deeper roots.</em><br/>A healthier home.</h1>
          <p className="hero-lede">Practical coaching for whole-food nutrition, calmer routines, gardening, healthy habits, and family wellness—with thoughtful support for ADHD, ADD, and autism.</p>
          <div className="button-row"><Link className="button button-primary" href="/programs">Explore programs</Link><a className="button button-secondary" href="https://calendly.com/thenourishedgardens/calm-call" target="_blank" rel="noreferrer">Book a free call</a></div>
          <p className="trust-line">🌿 Simple · Personal · Family-centered</p>
        </div>
        <div className="garden-scene" aria-label="A peaceful illustrated garden and farm scene">
          <div className="sun"/><span className="cloud cloud-one">☁</span><span className="cloud cloud-two">☁</span>
          <div className="garden-sign">Nourish your body<br/>Grow your life</div>
          <div className="garden-beds">🌱 🌿 🥕 🌱 🥬 🌿</div><div className="chickens">🐓 &nbsp; 🐔 &nbsp; 🐥</div>
        </div>
      </section>

      <section id="about" className="split-section">
        <div><p className="eyebrow">A gentler path forward</p><h2>Wellness that grows with your life</h2></div>
        <div><p>Health coaching can help you turn good intentions into steady, realistic habits. Together, we focus on food, rest, movement, stress, home rhythms, and the practical skills that make healthy living feel possible.</p><p>This is not about perfection or one rigid plan. It is about finding the next useful step for you and your family.</p></div>
      </section>

      <section id="coaching" className="values-section">
        <div className="section-heading"><p className="eyebrow">What we nurture</p><h2>From the soil to the soul</h2></div>
        <div className="value-grid">
          <article><span>🥕</span><h3>Whole-food confidence</h3><p>Simple shopping, cooking, and meal rhythms that work in everyday life.</p></article>
          <article><span>🧠</span><h3>Calmer family systems</h3><p>Supportive routines designed with neurodivergent needs and family connection in mind.</p></article>
          <article><span>🌱</span><h3>Garden-grown skills</h3><p>Hands-on ways to grow food, build confidence, and reconnect with nature.</p></article>
          <article><span>🕯️</span><h3>Rest and resilience</h3><p>Small habits for sleep, stress support, mindset, and a more grounded week.</p></article>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading"><p className="eyebrow">Start where you are</p><h2>Programs for your next season</h2><p>Choose a self-paced path or book a free conversation if you are unsure where to begin.</p></div>
        <div className="program-grid">{programs.slice(0, 3).map((program) => <ProgramCard key={program.slug} program={program}/>)}</div>
        <div className="center"><Link className="button button-secondary" href="/programs">See all programs</Link></div>
      </section>

      <section className="cta-section"><div><p className="eyebrow light">You do not have to change everything today</p><h2>Let’s find your next nourishing step.</h2></div><a className="button button-gold" href="https://calendly.com/thenourishedgardens/calm-call" target="_blank" rel="noreferrer">Book your free call</a></section>
    </main>
  );
}
