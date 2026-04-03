"use client";

import { motion } from "motion/react";
import { Globe, Search, Wrench, Truck } from "lucide-react";
import { PulseBeams } from "@/components/ui/pulse-beams";
import type { ReactNode } from "react";

// ─── Process nodes ────────────────────────────────────────────────────────────

interface BeamNode {
  id: string;
  label: string;
  icon: ReactNode;
  description: string;
}

const processNodes: BeamNode[] = [
  {
    id: "source",
    label: "Source",
    icon: <Globe className="w-7 h-7" />,
    description:
      "Sourced from global enterprise channels across US, Europe, and Asia",
  },
  {
    id: "inspect",
    label: "Inspect",
    icon: <Search className="w-7 h-7" />,
    description:
      "Multi-point hardware and software inspection for quality assurance",
  },
  {
    id: "refurbish",
    label: "Refurbish",
    icon: <Wrench className="w-7 h-7" />,
    description:
      "Professional restoration, fresh OS, and performance tuning",
  },
  {
    id: "deliver",
    label: "Deliver",
    icon: <Truck className="w-7 h-7" />,
    description:
      "Quality-verified, warranty-backed delivery across India",
  },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export function HowWeWorkSection() {
  return (
    <motion.section
      className="bg-muted/30 py-16 md:py-24"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            className="text-xs font-semibold uppercase tracking-widest text-exb-green mb-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Our Process
          </motion.p>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            How We{" "}
            <span className="bg-gradient-to-r from-exb-green to-exb-green-dark bg-clip-text text-transparent">
              Work
            </span>
          </motion.h2>

          <motion.p
            className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            Every device goes through a rigorous 4-step process — from global
            sourcing to your doorstep, certified and ready to work.
          </motion.p>
        </div>

        {/* PulseBeams visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <PulseBeams
            nodes={processNodes}
            beamColor="#2ECC71"
            className="py-4"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
