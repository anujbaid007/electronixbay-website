"use client";

import { motion } from "motion/react";
import {
  Globe,
  Search,
  Sparkles,
  Monitor,
  Activity,
  Package,
  ShieldCheck,
  HeadphonesIcon,
  Award,
  Building,
} from "lucide-react";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { CTASection } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

// ─── Zoom Parallax Hero ─────────────────────────────────────────────────────

function AboutHero() {
  return (
    <ZoomParallax
      height="250vh"
      layers={[
        {
          content: (
            <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] via-[#1B2A3B] to-[#0a0a0a]" />
          ),
          scale: [1, 1.2],
          zIndex: 0,
        },
        {
          content: (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-exb-green/10 rounded-full blur-[180px]" />
              <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-exb-green-dark/8 rounded-full blur-[150px]" />
            </div>
          ),
          scale: [1, 1.6],
          opacity: [0.6, 1],
          zIndex: 1,
        },
        {
          content: (
            <div className="text-center px-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-exb-green mb-4">
                Our Story
              </p>
              <h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                About{" "}
                <span className="bg-gradient-to-r from-exb-green to-exb-green-dark bg-clip-text text-transparent">
                  ElectronixBay
                </span>
              </h1>
              <p className="mt-6 text-white/60 text-lg max-w-2xl mx-auto">
                Bridging the gap between premium technology and smart business
                spending since day one.
              </p>
            </div>
          ),
          scale: [1, 1.1],
          zIndex: 2,
        },
      ]}
    />
  );
}

// ─── Company Story ──────────────────────────────────────────────────────────

function CompanyStory() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-exb-green">
              Who We Are
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-4 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Premium Technology,{" "}
              <span className="bg-gradient-to-r from-exb-green to-exb-green-dark bg-clip-text text-transparent">
                Smarter Prices
              </span>
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                ElectronixBay was born from a simple observation: growing
                businesses in India were overpaying for IT hardware while
                perfectly capable enterprise-grade laptops were being retired
                globally after just 2–3 years of corporate use.
              </p>
              <p>
                Based in Gurugram, we source Dell Latitudes, HP EliteBooks, and
                Lenovo ThinkPads from certified global refurbishment channels
                across the US, Europe, and Asia. Every machine undergoes our
                rigorous multi-point inspection, professional restoration, and
                performance testing before reaching our customers.
              </p>
              <p>
                With India&apos;s refurbished laptop market projected to reach $769
                million by 2033, we&apos;re at the forefront of a smarter, more
                sustainable approach to IT procurement — helping businesses save
                30–70% while reducing the 1.75 million metric tonnes of e-waste
                India generates annually.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-exb-green/10 via-transparent to-exb-green-dark/10 border border-border overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 rounded-2xl bg-exb-green/15 flex items-center justify-center mx-auto mb-6">
                  <Building className="w-10 h-10 text-exb-green" />
                </div>
                <p className="text-2xl font-bold font-display">Gurugram, India</p>
                <p className="text-muted-foreground mt-2">
                  Serving 500+ businesses across the country
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Refurbishment Process ──────────────────────────────────────────────────

const processSteps = [
  {
    icon: Globe,
    title: "Global Sourcing",
    description:
      "Enterprise-grade laptops sourced from certified refurbishment channels across the US, UK, Germany, and Singapore.",
  },
  {
    icon: Search,
    title: "Hardware Inspection",
    description:
      "Every component — processor, RAM, storage, display, battery, and ports — tested against strict quality benchmarks.",
  },
  {
    icon: Sparkles,
    title: "Professional Cleaning",
    description:
      "Complete exterior restoration, keyboard deep clean, screen polish, and cosmetic grading to near-new condition.",
  },
  {
    icon: Monitor,
    title: "OS Installation",
    description:
      "Fresh Windows installation with essential drivers. Secure data wipe on all previous storage to NIST standards.",
  },
  {
    icon: Activity,
    title: "Performance Testing",
    description:
      "Stress testing, thermal analysis, battery health verification, and real-world workload simulation before approval.",
  },
  {
    icon: Package,
    title: "Warranty & Delivery",
    description:
      "Each laptop ships with a warranty card, original charger, and secure packaging. Delivered across India with tracking.",
  },
];

function RefurbishmentProcess() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-exb-green">
            Quality Assured
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Refurbishment{" "}
            <span className="bg-gradient-to-r from-exb-green to-exb-green-dark bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            A rigorous 6-step journey from global sourcing to your doorstep.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Step number circle */}
                  <div className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-exb-green/15 border-2 border-exb-green/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-exb-green" />
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-exb-green/60 uppercase tracking-wider">
                      Step {i + 1}
                    </span>
                    <h3 className="text-xl font-bold font-display mt-1">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Trust Signals ──────────────────────────────────────────────────────────

const trustCards = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Transparent Process",
    description:
      "Every laptop comes with a detailed inspection report. You know exactly what you're getting — no surprises.",
  },
  {
    icon: <HeadphonesIcon className="w-6 h-6" />,
    title: "Dedicated Support",
    description:
      "Our team is available via WhatsApp, phone, and email. From inquiry to after-sales, we're with you every step.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Reliable Warranty",
    description:
      "Every laptop ships with a minimum 6-month warranty. Hardware issues? We replace or repair — no questions asked.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Global Brands Only",
    description:
      "We exclusively stock enterprise series: ThinkPads, EliteBooks, and Latitudes. MIL-STD tested, built for 5–7 year lifecycles.",
  },
];

function TrustSignals() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-exb-green">
            Why Us
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Why Customers{" "}
            <span className="bg-gradient-to-r from-exb-green to-exb-green-dark bg-clip-text text-transparent">
              Trust Us
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trustCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <SpotlightCard className="h-full">
                <div className="p-8">
                  <div className="w-12 h-12 rounded-full bg-exb-green/15 flex items-center justify-center mb-5 text-exb-green">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold font-display mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export function AboutContent() {
  return (
    <main>
      <AboutHero />
      <CompanyStory />
      <RefurbishmentProcess />
      <TrustSignals />
      <CTASection />
      <Footer />
    </main>
  );
}
