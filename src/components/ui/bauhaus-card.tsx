"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BauhausCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  accentColor?: string;
}

export function BauhausCard({
  icon,
  title,
  description,
  className,
  accentColor = "#2ECC71",
}: BauhausCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-2xl border border-border bg-card p-8 relative overflow-hidden",
        className
      )}
      whileHover={{
        scale: 1.02,
        boxShadow:
          "0 20px 40px -12px rgba(0, 0, 0, 0.18), 0 8px 16px -8px rgba(0, 0, 0, 0.12)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 24,
      }}
    >
      {/* Large circle decoration — top-right corner */}
      <div
        className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-15"
        style={{ backgroundColor: accentColor }}
      />

      {/* Medium arc ring — offset from large circle for depth */}
      <div
        className="pointer-events-none absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-10 border-[6px]"
        style={{ borderColor: accentColor, backgroundColor: "transparent" }}
      />

      {/* Small rotated square accent */}
      <div
        className="pointer-events-none absolute top-8 right-8 w-6 h-6 rotate-45 opacity-25"
        style={{ backgroundColor: accentColor }}
      />

      {/* Tiny dot for geometric rhythm */}
      <div
        className="pointer-events-none absolute bottom-6 right-10 w-2 h-2 rounded-full opacity-30"
        style={{ backgroundColor: accentColor }}
      />

      {/* Icon area */}
      <div
        className="relative z-10 mb-5 inline-flex items-center justify-center w-12 h-12 rounded-full shrink-0"
        style={{ backgroundColor: `${accentColor}26` /* ~15% opacity */ }}
      >
        <span
          className="flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5"
          style={{ color: accentColor }}
        >
          {icon}
        </span>
      </div>

      {/* Title */}
      <h3 className="relative z-10 font-display text-xl font-bold text-foreground leading-snug mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
