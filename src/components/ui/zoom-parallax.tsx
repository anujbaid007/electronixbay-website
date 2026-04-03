"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface ZoomLayer {
  content: React.ReactNode;
  scale: [number, number];
  opacity?: [number, number];
  zIndex?: number;
}

interface ZoomParallaxProps {
  layers: ZoomLayer[];
  className?: string;
  height?: string;
}

function ZoomLayerItem({
  layer,
  index,
  scrollYProgress,
}: {
  layer: ZoomLayer;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const scale = useTransform(scrollYProgress, [0, 1], layer.scale);
  const opacity = layer.opacity
    ? useTransform(scrollYProgress, [0, 1], layer.opacity)
    : undefined;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ scale, opacity, zIndex: layer.zIndex ?? index }}
    >
      {layer.content}
    </motion.div>
  );
}

export function ZoomParallax({
  layers,
  className,
  height = "300vh",
}: ZoomParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className={cn("relative", className)} style={{ height }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {layers.map((layer, i) => (
          <ZoomLayerItem
            key={i}
            layer={layer}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}
