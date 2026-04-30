import Header from "@/components/header";
import Hero from "@/components/hero";
import WhatIsHealthCoach from "@/components/what-is-health-coach";
import WhoIHelp from "@/components/who-i-help";
import WhatCoachingHelps from "@/components/what-coaching-helps";
import PricingPlans from "@/components/pricing-plans";
import CallToAction from "@/components/call-to-action";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <WhatIsHealthCoach />
      <WhoIHelp />
      <WhatCoachingHelps />
      <PricingPlans />
      <CallToAction />
      <Footer />
    </main>
  );
}
