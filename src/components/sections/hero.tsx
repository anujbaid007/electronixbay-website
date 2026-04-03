"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ShaderBackground } from "@/components/ui/shader-hero";
import { MessageCircle, Laptop } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Shader background */}
      {mounted && <ShaderBackground isDark={resolvedTheme === "dark"} />}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background pointer-events-none z-[2]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/60 backdrop-blur-sm mb-8"
        >
          <Laptop className="h-4 w-4 text-exb-green" />
          <span className="text-xs sm:text-sm font-medium text-foreground/80 whitespace-nowrap">
            India&apos;s Trusted Refurbished Laptop Partner
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="text-foreground">Smart Technology,</span>
          <br />
          <span className="bg-gradient-to-r from-exb-green to-exb-green-dark bg-clip-text text-transparent">
            Better Value.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Premium refurbished Dell, HP & Lenovo laptops at up to{" "}
          <span className="font-semibold text-exb-green">70% less</span>.
          Enterprise-grade quality. Certified & warranty-backed. Delivered across India.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-exb-green to-exb-green-dark rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-exb-green/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-exb-green-dark to-exb-green opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10">Request a Quote</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <a
              href="https://wa.me/919XXXXXXXXX?text=Hi%2C%20I%20need%20a%20quote%20for%20refurbished%20laptops."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-foreground border-2 border-border rounded-2xl hover:bg-muted transition-colors duration-300"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
          </motion.div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-exb-green" />
            <span>500+ Businesses</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-exb-green-dark" />
            <span>10,000+ Laptops</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-exb-green" />
            <span>6-Month Warranty</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
