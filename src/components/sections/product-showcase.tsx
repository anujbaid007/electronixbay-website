"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { Briefcase, GraduationCap, Zap, ArrowRight } from "lucide-react";

const categories = [
  {
    id: "business",
    icon: Briefcase,
    title: "Business Laptops",
    tagline: "Dell Latitude · HP EliteBook · Lenovo ThinkPad",
    description:
      "Enterprise-series machines with MIL-STD build quality for offices, teams, and daily professional use.",
    pageHref: "/products/business-laptops",
    stat: "Enterprise Grade",
    accent: "#10b981",
    tags: ["Dell Latitude", "HP EliteBook", "Lenovo ThinkPad"],
    image: "/corporate-computer.jpeg",
    imagePosition: "center center",
  },
  {
    id: "student",
    icon: GraduationCap,
    title: "Student Laptops",
    tagline: "Lightweight · All-day battery · Bulk-ready",
    description:
      "Affordable machines for schools, colleges, and coaching centres. Bulk orders from 20 to 200+ units.",
    pageHref: "/products/student-laptops",
    stat: "Bulk Orders Welcome",
    accent: "#38bdf8",
    tags: ["All-day Battery", "Lightweight", "Budget-Friendly"],
    image: "/students-computer.jpeg",
    imagePosition: "center center",
  },
  {
    id: "high-performance",
    icon: Zap,
    title: "High Performance",
    tagline: "Higher RAM · SSD upgrades · Dedicated GPUs",
    description:
      "Serious power for Figma, Docker, video editing, and data analysis. Upgraded specs that deliver.",
    pageHref: "/products/high-performance",
    stat: "Max Performance",
    accent: "#f59e0b",
    tags: ["16GB+ RAM", "NVMe SSD", "Dedicated GPU"],
    image: "/performance-computer.jpeg",
    imagePosition: "center center",
  },
];

export function ProductShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // 3 cards at min-w-[60vw] lg:min-w-[45vw] + pl-[10vw] + gap-8
  // Last card offset ≈ 100–130vw / total container ≈ 145–190vw → ~66%
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <section className="py-24 md:py-32">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.p
          className="text-xs font-semibold uppercase tracking-widest text-exb-green mb-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Range
        </motion.p>
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          Find Your Perfect{" "}
          <span className="bg-gradient-to-r from-exb-green to-exb-green-dark bg-clip-text text-transparent">
            Match
          </span>
        </motion.h2>
        <motion.p
          className="mt-4 text-muted-foreground max-w-xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Three categories built around how your team actually works.
        </motion.p>
      </div>

      {/* Desktop: Sticky horizontal scroll */}
      <div ref={sectionRef} className="hidden md:block h-[280vh] relative">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <motion.div style={{ x }} className="flex gap-8 pl-[10vw]">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  href={cat.pageHref}
                  className="group min-w-[60vw] lg:min-w-[45vw] h-[70vh] rounded-3xl overflow-hidden relative block shrink-0"
                >
                  {/* Background image */}
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ objectPosition: cat.imagePosition }}
                  />
                  {/* Gradient overlay — always on for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  {/* Dimmer — fades out on hover to reveal image */}
                  <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:opacity-0" />

                  {/* Icon badge */}
                  <div className="absolute top-6 left-6 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <Icon className="w-5 h-5" style={{ color: cat.accent }} />
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                    <div
                      className="text-xs font-semibold uppercase tracking-widest mb-2"
                      style={{ color: cat.accent }}
                    >
                      {cat.stat}
                    </div>
                    <h3
                      className="text-3xl md:text-4xl font-bold text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {cat.title}
                    </h3>
                    <p className="text-white/70 mt-2 max-w-sm text-sm leading-relaxed">
                      {cat.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {cat.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-white/10 text-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full text-sm font-medium text-white border border-white/30 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                      Explore Range <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Mobile: Vertical stack */}
      <div className="md:hidden px-6 space-y-6">
        {categories.map((cat, i) => {
          return (
            <motion.div
              key={cat.id}
              className="rounded-2xl overflow-hidden relative h-[50vh]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link href={cat.pageHref} className="group block w-full h-full">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: cat.imagePosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:opacity-0" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-1"
                    style={{ color: cat.accent }}
                  >
                    {cat.stat}
                  </div>
                  <h3
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {cat.title}
                  </h3>
                  <p className="text-white/70 text-sm mt-1">{cat.tagline}</p>
                  <div className="inline-flex items-center gap-1.5 mt-4 px-5 py-2 rounded-full text-sm font-medium text-white border border-white/30">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
