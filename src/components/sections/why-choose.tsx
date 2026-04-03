"use client";

import { motion } from "motion/react";
import { IndianRupee, ShieldCheck, Leaf, Cpu } from "lucide-react";
import { BauhausCard } from "@/components/ui/bauhaus-card";

// ─── Card data ────────────────────────────────────────────────────────────────

const cards = [
  {
    id: "cost",
    icon: <IndianRupee />,
    title: "Save 30–70% on IT Hardware",
    description:
      "Enterprise-grade laptops at a fraction of new prices. India's refurbished laptop market is projected to reach $769M by 2033 — businesses are switching to smarter procurement.",
  },
  {
    id: "quality",
    icon: <ShieldCheck />,
    title: "Multi-Point Certified Inspection",
    description:
      "Every laptop undergoes rigorous hardware and software testing. Fresh OS installation, professional cleaning, and performance benchmarking before it reaches you.",
  },
  {
    id: "eco",
    icon: <Leaf />,
    title: "Reduce E-Waste, Build Responsibly",
    description:
      "India generates 1.75 million metric tonnes of e-waste annually. Each refurbished laptop saves up to 300 kg of CO₂ and keeps electronics out of landfills.",
  },
  {
    id: "performance",
    icon: <Cpu />,
    title: "Enterprise-Series Durability",
    description:
      "ThinkPads, EliteBooks, and Latitudes are built for 5–7 year lifecycles with MIL-STD testing. Business-class laptops outperform and outlast consumer models.",
  },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export function WhyChooseSection() {
  return (
    <section className="py-16 md:py-24">
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
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
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
              <BauhausCard
                icon={card.icon}
                title={card.title}
                description={card.description}
                accentColor="#2ECC71"
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
