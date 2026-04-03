"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-exb-green/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-exb-green-dark/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to Upgrade{" "}
            <span className="bg-gradient-to-r from-exb-green to-exb-green-dark bg-clip-text text-transparent">
              Your Fleet?
            </span>
          </h2>
          <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
            Get a custom quote for your business. Whether you need 10 laptops or 1,000,
            we have the inventory and expertise to deliver.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-exb-green to-exb-green-dark rounded-2xl hover:shadow-2xl hover:shadow-exb-green/20 transition-all duration-300 animate-pulse-glow"
              >
                Request a Quote
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <a
                href="https://wa.me/917508807490?text=Hi%2C%20I%20need%20a%20quote%20for%20refurbished%20laptops."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white border border-white/20 rounded-2xl hover:bg-white/5 transition-all duration-300"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
