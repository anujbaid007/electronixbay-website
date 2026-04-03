"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// ─── Inline SVG brand wordmarks ───────────────────────────────────────────────

function DellLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 72 28"
      className={cn("h-8 md:h-10 w-auto", className)}
      aria-label="Dell"
      fill="currentColor"
    >
      {/* Simplified Dell wordmark using geometric letterforms */}
      <text
        x="0"
        y="22"
        fontFamily="'Arial', 'Helvetica Neue', sans-serif"
        fontWeight="700"
        fontSize="26"
        letterSpacing="-0.5"
      >
        DELL
      </text>
    </svg>
  );
}

function HPLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 50 28"
      className={cn("h-8 md:h-10 w-auto", className)}
      aria-label="HP"
      fill="currentColor"
    >
      <text
        x="0"
        y="22"
        fontFamily="'Arial', 'Helvetica Neue', sans-serif"
        fontWeight="700"
        fontSize="26"
        letterSpacing="1"
      >
        hp
      </text>
    </svg>
  );
}

function LenovoLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 110 28"
      className={cn("h-8 md:h-10 w-auto", className)}
      aria-label="Lenovo"
      fill="currentColor"
    >
      <text
        x="0"
        y="22"
        fontFamily="'Arial', 'Helvetica Neue', sans-serif"
        fontWeight="700"
        fontSize="22"
        letterSpacing="2"
      >
        LENOVO
      </text>
    </svg>
  );
}

// ─── Brand list ───────────────────────────────────────────────────────────────

const brands = [
  { id: "dell", name: "Dell", Logo: DellLogo },
  { id: "hp", name: "HP", Logo: HPLogo },
  { id: "lenovo", name: "Lenovo", Logo: LenovoLogo },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export function TrustedBrandsSection() {
  return (
    <motion.section
      className="py-16 md:py-20"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-exb-green mb-4">
            Trusted Partners
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Powering Businesses with Trusted Brands
          </h2>
        </div>

        {/* Logo row */}
        <div className="flex flex-row items-center justify-center gap-12 md:gap-16">
          {brands.map(({ id, name, Logo }, i) => (
            <motion.div
              key={id}
              className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              whileHover={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              aria-label={name}
            >
              <Logo />
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Trusted by 500+ businesses across India
        </p>
      </div>
    </motion.section>
  );
}
