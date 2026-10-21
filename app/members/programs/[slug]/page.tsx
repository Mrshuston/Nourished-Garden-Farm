import { notFound, redirect } from "next/navigation";
import { getProgram } from "@/lib/programs";
import { createClient } from "@/lib/supabase/server";

const rootedRadiantDetails = [
  {
    title: "Week 1: Calm the Chaos",
    body: "Create predictable morning and evening rhythms. Begin a simple wellness journal and track sleep, stress, energy, and skin changes. Add comfortable slow breathing and daily outdoor time.",
  },
  {
    title: "Week 2: Nourish From Within",
    body: "Build balanced meals around protein, produce, fiber-rich carbohydrates, healthy fats, and hydration. The focus is nourishment and consistency rather than a restrictive 'cortisol diet.'",
  },
  {
    title: "Week 3: Create Your Skin-Supportive Routine",
    body: "Keep skin care gentle and simple: cleanse as needed, moisturize, use broad-spectrum sunscreen, and avoid introducing several new products at once. Track how your skin responds.",
  },
  {
    title: "Week 4: Sleep & Recovery",
    body: "Build a consistent wind-down routine with dimmer light, less stimulation, preparation for tomorrow, gentle stretching, reading, or slow breathing. Work toward consistent sleep and wake times.",
  },
  {
    title: "Week 5: Move Stress Out of the Body",
    body: "Use walking, mobility, gardening, stretching, and appropriate strength training to make movement a regular part of your stress-management routine.",
  },
  {
    title: "Week 6: Build Your Soil to Soul Lifestyle",
    body: "Review what supported your energy, stress, sleep, and skin. Choose five realistic habits you want to continue after the program.",
  },
];

const rootedRegulatedDetails = [
  { title: "Week 1: Understand Your Family's Wiring", body: "Map strengths, stressors, sensory preferences, capacity, and the recurring moments that create the most friction." },
  { title: "Week 2: Regulate Before You Organize", body: "Create realistic regulation menus and a parent or adult reset plan to use before problem-solving." },
  { title: "Week 3: Build One Anchor Routine", body: "Turn the hardest part of the day into a short, visible sequence with fewer decisions and reminders." },
  { title: "Week 4: Make Transitions Easier", body: "Experiment with previews, timers, visual supports, choices, processing time, and recovery space." },
  { title: "Week 5: Nourish Without Perfection", body: "Build practical meal rhythms, hydration cues, balanced options, and low-pressure food routines." },
  { title: "Week 6: Create a Sleep-Friendly Evening", body: "Design a predictable wind-down rhythm that reduces unnecessary stimulation and prepares the household for rest." },
  { title: "Week 7: Work With Executive Function", body: "Externalize reminders, shrink starting steps, and build supports for planning, time, and follow-through." },
  { title: "Week 8: Build a Brain-Supportive Home", body: "Create simple landing zones, visible storage, and low-friction systems that are easier to maintain." },
  { title: "Week 9: Communicate With Less Conflict", body: "Practice direct language, processing time, collaborative problem-solving, boundaries, and repair." },
  { title: "Week 10: Support Movement and Sensory Needs", body: "Build an individualized menu of indoor, outdoor, movement, and nature-based options." },
  { title: "Week 11: Protect the Parent's Capacity", body: "Clarify limits, recovery needs, realistic expectations, and the support required to sustain change." },
  { title: "Week 12: Complete Your Rooted Family Blueprint", body: "Document what works and create a manageable 90-day continuation plan for your household." },
];

export default async function MemberProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const { data: { user } } = await (await createClient()).auth.getUser();
  if (!user) redirect(`/sign-in?next=/members/programs/${slug}`);
  const access = Array.isArray(user.user_metadata.programs) ? user.user_metadata.programs : [];
  if (!access.includes(slug)) redirect(`/programs/${slug}`);

  const isRootedRadiant = slug === "rooted-radiant";
  const isRootedRegulated = slug === "rooted-regulated-private";

  return (
    <main>
      <section className="lesson-page">
        <p className="eyebrow">Member program</p>
        <h1>{program.title}</h1>
        <p className="hero-lede">{program.outcome}</p>

        {isRootedRadiant && (
          <>
            <div className="outcome-box">
              <strong>Your daily Rooted & Radiant rhythm</strong>
              <p>
                Pair your red-light session with quiet breathing, then add gentle movement and the daily wellness foundations.
                Use red light only according to your specific device instructions; 15 minutes is appropriate only when it matches
                the manufacturer's directions.
              </p>
            </div>
            <div className="lesson-list">
              {rootedRadiantDetails.map((lesson, index) => (
                <article key={lesson.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h2>{lesson.title}</h2>
                    <p>{lesson.body}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="outcome-box">
              <strong>Daily tracker</strong>
              <p>Track sleep, stress, energy, skin, hydration, movement, whole-food meals, outdoor time, breathing, and your red-light session when scheduled.</p>
            </div>
            <p className="fine-print">
              This program provides lifestyle and wellness education and does not diagnose, treat, or cure high cortisol, acne,
              hormonal disorders, or other medical conditions. Persistent or severe skin concerns, sudden skin changes, or
              symptoms of a hormonal or medical condition should be evaluated by an appropriate licensed healthcare professional.
              Follow your red-light device instructions and discuss light therapy with a dermatologist or other qualified clinician
              if you have a photosensitive condition, use photosensitizing medication, or are unsure whether it is appropriate for you.
            </p>
          </>
        )}

        {isRootedRegulated && (
          <>
            <div className="outcome-box"><strong>Your private coaching path</strong><p>Your Family Mapping Session determines whether the Parent Path, Adult Path, or Whole-Family Path best fits your goals. Your routines and tools are personalized throughout the program.</p></div>
            <div className="lesson-list">
              {rootedRegulatedDetails.map((lesson, index) => <article key={lesson.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{lesson.title}</h2><p>{lesson.body}</p></div></article>)}
            </div>
            <p className="fine-print">Rooted &amp; Regulated provides educational coaching and family habit support. It does not diagnose, treat, or cure ADHD, autism, anxiety, or any medical or mental-health condition, and it does not replace care from qualified professionals. Strategies may or may not help, and individual results vary.</p>
          </>
        )}

        {!isRootedRadiant && !isRootedRegulated && (
          <div className="lesson-list">
            {program.lessons.map((lesson, index) => (
              <article key={lesson}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{lesson}</h2>
                  <p>Your lesson materials, worksheets, and video links can be added here as the curriculum is finalized.</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
