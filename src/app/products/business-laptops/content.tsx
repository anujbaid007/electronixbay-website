"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  Shield,
  Monitor,
  Battery,
  Wifi,
  HardDrive,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";
import { CTASection } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

const highlights = [
  {
    icon: Shield,
    title: "MIL-STD Certified",
    description:
      "Enterprise-grade durability tested to military standards for drop, shock, and vibration resistance.",
  },
  {
    icon: Monitor,
    title: "Anti-Glare Displays",
    description:
      "Professional matte displays that reduce eye strain during long work hours in any lighting condition.",
  },
  {
    icon: Battery,
    title: "Extended Battery Life",
    description:
      "Hot-swappable batteries and power management optimized for 8\u201312 hours of continuous work.",
  },
  {
    icon: Wifi,
    title: "Enterprise Connectivity",
    description:
      "Built-in 4G LTE options, Wi-Fi 6, and Bluetooth 5.0 for seamless connectivity anywhere.",
  },
  {
    icon: HardDrive,
    title: "SSD Upgrades",
    description:
      "Fast NVMe SSDs for instant boot times, rapid file access, and smooth multitasking performance.",
  },
  {
    icon: Briefcase,
    title: "Docking Ready",
    description:
      "USB-C / Thunderbolt docking support for instant multi-monitor desk setups in your office.",
  },
];

const models = [
  {
    brand: "Dell",
    series: "Latitude",
    models: [
      "Latitude 5420",
      "Latitude 5520",
      "Latitude 7420",
      "Latitude 7520",
    ],
    logo: "/brands/dell.png",
  },
  {
    brand: "HP",
    series: "EliteBook",
    models: [
      "EliteBook 840 G7",
      "EliteBook 840 G8",
      "EliteBook 850 G7",
      "ProBook 450 G8",
    ],
    logo: "/brands/hp.png",
  },
  {
    brand: "Lenovo",
    series: "ThinkPad",
    models: [
      "ThinkPad T14",
      "ThinkPad T15",
      "ThinkPad L14",
      "ThinkPad X1 Carbon",
    ],
    logo: "/brands/lenovo.png",
  },
];

export function BusinessLaptopsContent() {
  return (
    <main>
      {/* Hero \u2014 dark, premium feel */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0a0a0a] text-white overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Green glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-exb-green/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-exb-green transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> All Products
            </Link>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-exb-green/15 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-exb-green" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-exb-green">
                Business Laptops
              </span>
            </div>
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Enterprise-Grade Laptops
              <br />
              <span className="bg-gradient-to-r from-exb-green to-exb-green-dark bg-clip-text text-transparent">
                for Your Business
              </span>
            </h1>
            <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Dell Latitude, HP EliteBook, and Lenovo ThinkPad — built for the
              boardroom and beyond. Robust, reliable, refurbished to near-new.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?category=business"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-exb-green to-exb-green-dark rounded-2xl hover:shadow-lg hover:shadow-exb-green/25 transition-all duration-300"
              >
                Request Quote for Business
              </Link>
              <a
                href="https://wa.me/917508807490?text=Hi%2C%20I%20need%20business%20laptops."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white border border-white/20 rounded-2xl hover:bg-white/5 transition-all duration-300"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Available Models */}
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
              Available Models
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-4 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Popular Business Series
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {models.map((m, i) => (
              <motion.div
                key={m.brand}
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
                  <Image
                    src={m.logo}
                    alt={m.brand}
                    width={120}
                    height={60}
                    className="h-8 w-auto object-contain mb-6 opacity-80"
                    unoptimized
                  />
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {m.brand} {m.series}
                  </h3>
                  <ul className="mt-4 space-y-2.5 flex-1">
                    {m.models.map((model) => (
                      <li
                        key={model}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 text-exb-green shrink-0" />
                        {model}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?category=business&brand=${m.brand.toLowerCase()}`}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-exb-green hover:underline"
                  >
                    Get pricing <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features \u2014 dark with GlowCards */}
      <section className="py-20 md:py-28 bg-[#0a0a0a] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-exb-green">
              Why Business Laptops?
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-4 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Built for{" "}
              <span className="bg-gradient-to-r from-exb-green to-exb-green-dark bg-clip-text text-transparent">
                Productivity
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((feat, i) => {
              const Icon = feat.icon;
              return (
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
                  <GlowCard glowColor="green" className="h-full p-6">
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-12 h-12 rounded-xl bg-exb-green/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-exb-green" />
                      </div>
                      <h3
                        className="text-lg font-bold text-white mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {feat.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
