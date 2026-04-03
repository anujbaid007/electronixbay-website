"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "motion/react";
import { GlowCard } from "@/components/ui/glow-card";

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  { target: 500, suffix: "+", label: "Businesses Served", caption: "" },
  { target: 10000, suffix: "+", label: "Laptops\nDelivered", caption: "" },
  { target: 70, suffix: "%", label: "Max Savings", caption: "Up to" },
  { target: 6, suffix: "", label: "Month Warranty", caption: "" },
];

export function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <GlowCard
              key={stat.label}
              glowColor="green"
              className="p-6 text-center"
            >
              <div className="relative z-10">
                <div className="flex flex-col items-center justify-center">
                  {stat.caption && (
                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-1">
                      {stat.caption}
                    </span>
                  )}
                  <div
                    className="text-3xl md:text-4xl font-bold text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <AnimatedCounter
                      target={stat.target}
                      suffix={stat.suffix}
                      duration={2}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-2 whitespace-pre-line">{stat.label}</p>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
