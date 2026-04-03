"use client";

import { useState, useCallback } from "react";
import { IntroScreen } from "@/components/ui/scroll-video";
import { HeroSection } from "@/components/sections/hero";
import { TrustedBrandsSection } from "@/components/sections/trusted-brands";
import { ProductShowcaseSection } from "@/components/sections/product-showcase";
import { WhyChooseSection } from "@/components/sections/why-choose";
import { HowWeWorkSection } from "@/components/sections/how-we-work";
import { StatsSection } from "@/components/sections/stats";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { GlobalSourcingSection } from "@/components/sections/global-sourcing";
import { CTASection } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export function HomeContent() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <>
      {/* Loading screen — auto-plays frame animation, then disappears */}
      <IntroScreen onComplete={handleIntroComplete} />

      {/* Main site — always rendered, just hidden behind the intro overlay */}
      <main style={{ visibility: introComplete ? "visible" : "hidden" }}>
        <HeroSection />
        <TrustedBrandsSection />
        <ProductShowcaseSection />
        <WhyChooseSection />
        <HowWeWorkSection />
        <StatsSection />
        <TestimonialsSection />
        <GlobalSourcingSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
