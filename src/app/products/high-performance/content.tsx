"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  Zap,
  Cpu,
  MemoryStick,
  HardDrive,
  MonitorPlay,
  Gauge,
  Code,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";
import { CTASection } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

const highlights = [
  {
    icon: Cpu,
    title: "Multi-Core Processors",
    stat: "i7/i9",
    description:
      "Intel Core i7 / i9 and AMD Ryzen 7 / 9 processors for heavy-duty multitasking, compiling, and rendering.",
  },
  {
    icon: MemoryStick,
    title: "16\u201364 GB RAM",
    stat: "64GB",
    description:
      "Upgraded memory configurations for seamless Docker, VM, and multi-tab workflows without slowdowns.",
  },
  {
    icon: HardDrive,
    title: "NVMe SSD Storage",
    stat: "2TB",
    description:
      "500GB to 2TB fast NVMe SSDs for instant boot, rapid file access, and smooth project builds.",
  },
  {
    icon: MonitorPlay,
    title: "Dedicated GPUs",
    stat: "NVIDIA",
    description:
      "NVIDIA Quadro and GeForce GPUs for hardware-accelerated design, video editing, and 3D rendering.",
  },
  {
    icon: Gauge,
    title: "Thermal Management",
    stat: "24/7",
    description:
      "Enterprise-grade cooling systems that keep performance consistent under sustained heavy workloads.",
  },
  {
    icon: Code,
    title: "Developer Ready",
    stat: "Linux",
    description:
      "Pre-configured for development workflows \u2014 Linux compatible, high-res displays, and excellent keyboards.",
  },
];

const workloads = [
  {
    title: "Design & Creative",
    description:
      "Figma, Adobe Creative Suite, Blender, and After Effects run smoothly on dedicated GPU configurations.",
    tools: ["Figma", "Photoshop", "Premiere Pro", "Blender"],
    gradient: "from-purple-500/20 to-pink-500/10",
  },
  {
    title: "Development & DevOps",
    description:
      "Run Docker containers, multiple VMs, and heavy IDEs without performance bottlenecks.",
    tools: ["Docker", "VS Code", "IntelliJ", "WSL2"],
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    title: "Data & Analytics",
    description:
      "Data science notebooks, ML model training, and large dataset processing on capable hardware.",
    tools: ["Python/Jupyter", "R Studio", "Power BI", "Tableau"],
    gradient: "from-amber-500/20 to-orange-500/10",
  },
];

export function HighPerformanceContent() {
  return (
    <main>
      {/* Hero \u2014 dark with energy feel */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0a0a0a] text-white overflow-hidden">
        {/* Angled gradient streaks */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/8 to-orange-600/5 rounded-full blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-exb-green/8 to-emerald-500/5 rounded-full blur-[100px]" />
        </div>
        {/* Subtle noise grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

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
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                High Performance
              </span>
            </div>
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Serious Power for
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Demanding Work
              </span>
            </h1>
            <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Higher-spec configurations with upgraded RAM, fast SSDs, and
              dedicated GPUs for design teams, developers, and power users.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?category=performance"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-exb-green to-exb-green-dark rounded-2xl hover:shadow-lg hover:shadow-exb-green/25 transition-all duration-300"
              >
                Request Quote for Performance
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white border border-white/20 rounded-2xl hover:bg-white/5 transition-all duration-300"
              >
                View All Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workload Cards \u2014 with gradient accents */}
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
              Optimized For
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-4 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your Workload, Handled
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workloads.map((wl, i) => (
              <motion.div
                key={wl.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="relative rounded-2xl border border-border bg-card overflow-hidden p-8 flex flex-col h-full hover:shadow-lg hover:shadow-black/5 transition-all duration-300 group">
                  {/* Gradient accent */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${wl.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative z-10">
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {wl.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                      {wl.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {wl.tools.map((tool) => (
                        <span
                          key={tool}
                          className="inline-flex items-center px-3 py-1 text-xs font-medium bg-exb-green/10 text-exb-green rounded-full"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="/contact?category=performance"
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-exb-green hover:underline"
                    >
                      Get pricing <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Specs \u2014 dark with GlowCards + stats */}
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
              Key Specifications
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-4 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Built for{" "}
              <span className="bg-gradient-to-r from-exb-green to-exb-green-dark bg-clip-text text-transparent">
                Performance
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
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-exb-green/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-exb-green" />
                        </div>
                        <span
                          className="text-xl font-bold text-exb-green/80"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {feat.stat}
                        </span>
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
