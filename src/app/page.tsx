import { HeroSection } from "@/components/sections/hero";
import { TrustedBrandsSection } from "@/components/sections/trusted-brands";
import { WhyChooseSection } from "@/components/sections/why-choose";
import { HowWeWorkSection } from "@/components/sections/how-we-work";
import { StatsSection } from "@/components/sections/stats";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { GlobalSourcingSection } from "@/components/sections/global-sourcing";
import { CTASection } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustedBrandsSection />
      <WhyChooseSection />
      <HowWeWorkSection />
      <StatsSection />
      <TestimonialsSection />
      <GlobalSourcingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
