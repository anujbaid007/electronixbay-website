"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  Zap,
  ArrowRight,
  Search,
  Sparkles,
  Monitor,
  Activity,
  ShieldCheck,
  HeadphonesIcon,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BauhausCard } from "@/components/ui/bauhaus-card";
import { TrustedBrandsSection } from "@/components/sections/trusted-brands";
import { CTASection } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

// ─── Product categories ─────────────────────────────────────────────────────

const categories = [
  {
    id: "business",
    icon: Briefcase,
    title: "Business Laptops",
    audience: "For professionals, offices, and enterprise teams",
    brands: "Dell Latitude  ·  HP EliteBook  ·  Lenovo ThinkPad",
    description:
      "Built for the boardroom and beyond. These enterprise-series machines feature robust build quality, MIL-STD certifications, and long-term reliability that consumer laptops can't match. Ideal for daily office work, video conferencing, and multitasking.",
    cta: "Request Quote for Business",
    ctaHref: "/contact?category=business",
    pageHref: "/products/business-laptops",
  },
  {
    id: "student",
    icon: GraduationCap,
    title: "Student Laptops",
    audience: "For educational institutions, students, and bulk school orders",
    brands: "Lightweight models with all-day battery life",
    description:
      "Affordable, reliable machines perfect for computer labs, online learning, and daily student use. We supply institutions with bulk orders — from 20 units to 200+ — with consistent quality across every device in the batch.",
    cta: "Request Quote for Students",
    ctaHref: "/contact?category=student",
    pageHref: "/products/student-laptops",
  },
  {
    id: "high-performance",
    icon: Zap,
    title: "High Performance Laptops",
    audience: "For design teams, developers, and power users",
    brands: "Higher RAM  ·  SSD upgrades  ·  Dedicated GPUs",
    description:
      "When your team needs serious processing power — Figma, Docker, video editing, or data analysis — these machines deliver. Higher-spec configurations with upgraded RAM, fast SSDs, and strong multi-core processors.",
    cta: "Request Quote for Performance",
    ctaHref: "/contact?category=performance",
    pageHref: "/products/high-performance",
  },
];

// ─── What you get ───────────────────────────────────────────────────────────

const features = [
  {
    icon: <Search />,
    title: "Full Hardware Inspection",
    description:
      "Every component tested — processor, RAM, storage, display, battery, and all ports verified against quality benchmarks.",
  },
  {
    icon: <Sparkles />,
    title: "Professional Cleaning",
    description:
      "Complete exterior restoration and deep cleaning. Keyboards, screens, and chassis restored to near-new condition.",
  },
  {
    icon: <Monitor />,
    title: "Fresh OS Installation",
    description:
      "Clean Windows installation with essential drivers. No bloatware, no leftover data — ready to use out of the box.",
  },
  {
    icon: <Activity />,
    title: "Performance Testing",
    description:
      "Stress tests, thermal analysis, and real-world workload simulation ensure reliable performance under pressure.",
  },
  {
    icon: <ShieldCheck />,
    title: "Secure Data Removal",
    description:
      "Previous storage securely wiped to NIST standards. Your data integrity and privacy are guaranteed from day one.",
  },
  {
    icon: <HeadphonesIcon />,
    title: "Warranty & Support",
    description:
      "Every laptop ships with a minimum 6-month warranty and dedicated after-sales support via phone, email, and WhatsApp.",
  },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export function ProductsContent() {
  return (
    <main>
      {/* Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-exb-green">
              Our Range
            </span>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Refurbished Laptops for{" "}
              <span className="bg-gradient-to-r from-exb-green to-exb-green-dark bg-clip-text text-transparent">
                Every Need
              </span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
              Professional-grade laptops from Dell, HP, and Lenovo — inspected,
              certified, and ready for your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.id}
                  id={cat.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <SpotlightCard className="h-full">
                    <div className="p-8 flex flex-col h-full">
                      <div className="w-14 h-14 rounded-2xl bg-exb-green/15 flex items-center justify-center mb-6">
                        <Icon className="w-7 h-7 text-exb-green" />
                      </div>

                      <h2 className="text-2xl font-bold font-display mb-2">
                        {cat.title}
                      </h2>
                      <p className="text-sm text-exb-green font-medium mb-3">
                        {cat.audience}
                      </p>
                      <p className="text-xs text-muted-foreground font-semibold tracking-wide uppercase mb-4">
                        {cat.brands}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1">
                        {cat.description}
                      </p>

                      <div className="flex flex-col gap-3">
                        <Link
                          href={cat.ctaHref}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-exb-green to-exb-green-dark rounded-xl hover:shadow-lg hover:shadow-exb-green/20 transition-all duration-300"
                        >
                          {cat.cta}
                        </Link>
                        <Link
                          href={cat.pageHref}
                          className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-exb-green hover:underline"
                        >
                          Learn more <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-exb-green">
              Included
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What You Get With{" "}
              <span className="bg-gradient-to-r from-exb-green to-exb-green-dark bg-clip-text text-transparent">
                Every Laptop
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <BauhausCard
                  icon={feat.icon}
                  title={feat.title}
                  description={feat.description}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TrustedBrandsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
