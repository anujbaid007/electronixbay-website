"use client";

import { motion } from "motion/react";
import { WorldMap } from "@/components/ui/world-map";

const sourcingRoutes = [
  {
    start: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
    end: { lat: 28.4595, lng: 77.0266, label: "Gurugram" },
  },
  {
    start: { lat: 51.5074, lng: -0.1278, label: "London" },
    end: { lat: 28.4595, lng: 77.0266, label: "Gurugram" },
  },
  {
    start: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
    end: { lat: 28.4595, lng: 77.0266, label: "Gurugram" },
  },
  {
    start: { lat: 50.1109, lng: 8.6821, label: "Frankfurt" },
    end: { lat: 28.4595, lng: 77.0266, label: "Gurugram" },
  },
];

export function GlobalSourcingSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-exb-green">
            Global Network
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Sourced Globally,{" "}
            <span className="bg-gradient-to-r from-exb-green to-exb-green-dark bg-clip-text text-transparent">
              Delivered Locally
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            We source enterprise-grade laptops from certified refurbishment channels across
            North America, Europe, and Asia — delivering them to your doorstep in India.
          </p>
        </motion.div>
        <WorldMap dots={sourcingRoutes} lineColor="#2ECC71" />
      </div>
    </section>
  );
}
