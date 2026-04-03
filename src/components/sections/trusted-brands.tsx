"use client";

import { motion } from "motion/react";
import Image from "next/image";

// ─── Brand list ──────────────────────────────────────────────────────────────

const brands = [
  { id: "dell", name: "Dell", src: "/brands/dell.png", size: "h-14 md:h-16" },
  { id: "lenovo", name: "Lenovo", src: "/brands/lenovo.png", size: "h-10 md:h-12" },
  { id: "hp", name: "HP", src: "/brands/hp.png", size: "h-14 md:h-16" },
];

// ─── Section ─────────────────────────────────────────────────────────────────

export function TrustedBrandsSection() {
  return (
    <motion.section
      className="py-16 md:py-20 bg-[#0a0a0a]"
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
            className="text-3xl md:text-4xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Powering Businesses with Trusted Brands
          </h2>
        </div>

        {/* Logo row */}
        <div className="flex flex-row items-center justify-center gap-14 md:gap-20">
          {brands.map(({ id, name, src, size }, i) => (
            <motion.div
              key={id}
              className="opacity-70 hover:opacity-100 transition-all duration-300 cursor-default brightness-0 invert hover:brightness-100 hover:invert-0"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 0.7, y: 0 }}
              whileHover={{ opacity: 1, scale: 1.06 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              aria-label={name}
            >
              <Image
                src={src}
                alt={name}
                width={200}
                height={200}
                className={`${size} w-auto object-contain`}
                unoptimized
              />
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center text-sm text-gray-500">
          Trusted by 500+ businesses across India
        </p>
      </div>
    </motion.section>
  );
}
