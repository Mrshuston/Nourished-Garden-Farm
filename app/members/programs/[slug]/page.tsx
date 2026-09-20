import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { getProgram } from "@/lib/programs";

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

export default async function MemberProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const user = await currentUser();
  const access = Array.isArray(user?.publicMetadata.programs) ? user.publicMetadata.programs : [];
  if (!access.includes(slug)) redirect(`/programs/${slug}`);

  const isRootedRadiant = slug === "rooted-radiant";

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

        {!isRootedRadiant && (
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
