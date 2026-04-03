"use client";

import { motion } from "motion/react";
import { IndianRupee, ShieldCheck, Leaf, Cpu } from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";

// ─── Card data ───────────────────────────────────────────────────────────────

const cards = [
  {
    id: "cost",
    icon: <IndianRupee className="size-6" />,
    title: "Save 30–70% on IT Hardware",
    description:
      "Enterprise-grade laptops at a fraction of new prices. India's refurbished laptop market is projected to reach $769M by 2033 — businesses are switching to smarter procurement.",
    stat: "70%",
    statLabel: "Cost savings",
  },
  {
    id: "quality",
    icon: <ShieldCheck className="size-6" />,
    title: "Multi-Point Certified Inspection",
    description:
      "Every laptop undergoes rigorous hardware and software testing. Fresh OS installation, professional cleaning, and performance benchmarking before it reaches you.",
    stat: "42+",
    statLabel: "Quality checkpoints",
  },
  {
    id: "eco",
    icon: <Leaf className="size-6" />,
    title: "Reduce E-Waste, Build Responsibly",
    description:
      "India generates 1.75 million metric tonnes of e-waste annually. Each refurbished laptop saves up to 300 kg of CO₂ and keeps electronics out of landfills.",
    stat: "300kg",
    statLabel: "CO₂ saved per unit",
  },
  {
    id: "performance",
    icon: <Cpu className="size-6" />,
    title: "Enterprise-Series Durability",
    description:
      "ThinkPads, EliteBooks, and Latitudes are built for 5–7 year lifecycles with MIL-STD testing. Business-class laptops outperform and outlast consumer models.",
    stat: "7yr",
    statLabel: "Average lifespan",
  },
];

// ─── Section ─────────────────────────────────────────────────────────────────

export function WhyChooseSection() {
  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            className="text-xs font-semibold uppercase tracking-widest text-exb-green mb-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Why Refurbished?
          </motion.p>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Why Choose{" "}
            <span className="bg-gradient-to-r from-exb-green to-exb-green-dark bg-clip-text text-transparent">
              Refurbished?
            </span>
          </motion.h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <GlowCard glowColor="green" className="h-full p-8">
                <div className="relative z-10 flex flex-col gap-4 h-full">
                  {/* Top row: icon + stat */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-exb-green/10 text-exb-green">
                      {card.icon}
                    </div>
                    <div className="text-right">
                      <div
                        className="text-2xl md:text-3xl font-bold text-exb-green"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {card.stat}
                      </div>
                      <div className="text-[11px] uppercase tracking-wider text-gray-500">
                        {card.statLabel}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg md:text-xl font-bold text-white mt-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
