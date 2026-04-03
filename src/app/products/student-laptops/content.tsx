"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  GraduationCap,
  Battery,
  Feather,
  BookOpen,
  Users,
  Package,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { BauhausCard } from "@/components/ui/bauhaus-card";
import { CTASection } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

const highlights = [
  {
    icon: <Battery />,
    title: "All-Day Battery",
    description:
      "Lightweight models with battery life that lasts the entire school day \u2014 no charger needed in class.",
  },
  {
    icon: <Feather />,
    title: "Ultra-Lightweight",
    description:
      "Compact, lightweight designs under 1.8kg that students can carry comfortably in their backpacks.",
  },
  {
    icon: <BookOpen />,
    title: "Online Learning Ready",
    description:
      "Built-in webcams, microphones, and strong Wi-Fi for seamless video classes and collaboration.",
  },
  {
    icon: <Users />,
    title: "Bulk Orders",
    description:
      "We supply institutions with bulk orders from 20 to 200+ units with consistent quality across every device.",
  },
  {
    icon: <Package />,
    title: "Uniform Specs",
    description:
      "Every device in your batch configured identically \u2014 same RAM, storage, and OS build for easy IT management.",
  },
  {
    icon: <GraduationCap />,
    title: "Student-Friendly Pricing",
    description:
      "Enterprise-quality machines at education-friendly prices. Save up to 70% vs. buying new.",
  },
];

const useCases = [
  {
    title: "Computer Labs",
    description:
      "Equip your school or college lab with reliable, uniform machines. We deliver pre-configured batches ready for deployment.",
    units: "20\u2013200+ units",
    stat: "200+",
    statLabel: "Max batch size",
  },
  {
    title: "Student Personal Use",
    description:
      "Affordable laptops for online learning, assignments, coding practice, and everyday student tasks.",
    units: "1\u201320 units",
    stat: "70%",
    statLabel: "Avg. savings",
  },
  {
    title: "Coaching Institutes",
    description:
      "Perfect for coaching centres and test-prep platforms that need reliable devices for practice tests and online sessions.",
    units: "10\u2013100+ units",
    stat: "100+",
    statLabel: "Institutes served",
  },
];

export function StudentLaptopsContent() {
  return (
    <main>
      {/* Hero \u2014 warm, approachable gradient */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-sky-50 via-background to-background dark:from-sky-950/20 dark:via-background overflow-hidden">
        {/* Soft decorative circles */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-sky-200/20 dark:bg-sky-800/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-exb-green/10 rounded-full blur-[60px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-exb-green transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> All Products
            </Link>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
                Student Laptops
              </span>
            </div>
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Affordable Laptops
              <br />
              <span className="bg-gradient-to-r from-exb-green to-exb-green-dark bg-clip-text text-transparent">
                for Education
              </span>
            </h1>
            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Reliable, lightweight machines perfect for schools, colleges, and
              coaching institutes. Bulk orders with consistent quality at
              education-friendly prices.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?category=student"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-exb-green to-exb-green-dark rounded-2xl hover:shadow-lg hover:shadow-exb-green/25 transition-all duration-300"
              >
                Request Bulk Quote
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-foreground border border-border rounded-2xl hover:bg-muted transition-all duration-300"
              >
                View All Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases \u2014 cards with stats */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-exb-green">
              Ideal For
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-4 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Who We Serve
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="rounded-2xl border border-border bg-card p-8 flex flex-col h-full hover:shadow-lg hover:shadow-black/5 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-exb-green uppercase tracking-wide">
                      <CheckCircle2 className="w-4 h-4" /> {uc.units}
                    </div>
                    <div className="text-right">
                      <div
                        className="text-2xl font-bold text-exb-green"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {uc.stat}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {uc.statLabel}
                      </div>
                    </div>
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {uc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {uc.description}
                  </p>
                  <Link
                    href="/contact?category=student"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-exb-green hover:underline"
                  >
                    Get bulk pricing <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features \u2014 BauhausCards on muted bg */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-exb-green">
              Key Features
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-4 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Built for{" "}
              <span className="bg-gradient-to-r from-exb-green to-exb-green-dark bg-clip-text text-transparent">
                Learning
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((feat, i) => (
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

      <CTASection />
      <Footer />
    </main>
  );
}
