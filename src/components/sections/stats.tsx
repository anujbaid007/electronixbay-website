"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "motion/react";
import { ShineBorder } from "@/components/ui/shine-border";

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
  { target: 500, suffix: "+", label: "Businesses Served" },
  { target: 10000, suffix: "+", label: "Laptops Delivered" },
  { target: 70, suffix: "%", label: "Average Savings" },
  { target: 6, suffix: "", label: "Month Warranty" },
];

export function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <ShineBorder
              key={stat.label}
              borderWidth={1}
              duration={8}
              color={["#2ECC71", "#27AE60"]}
              borderRadius={16}
            >
              <div className="p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    duration={2}
                  />
                </div>
                <p className="text-sm text-white/60 mt-2">{stat.label}</p>
              </div>
            </ShineBorder>
          ))}
        </div>
      </div>
    </section>
  );
}
