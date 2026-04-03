"use client";

import { cn } from "@/lib/utils";

interface ShineBorderProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Border stroke width in pixels.
   * @default 1
   */
  borderWidth?: number;
  /**
   * Full rotation cycle duration in seconds.
   * @default 8
   */
  duration?: number;
  /**
   * One or more CSS color values used to build the shine gradient.
   * @default ["#2ECC71", "#27AE60"]
   */
  color?: string | string[];
  /**
   * Border radius in pixels applied to the outer container.
   * @default 16
   */
  borderRadius?: number;
}

/**
 * ShineBorder
 *
 * A container component that renders an animated conic-gradient shine effect
 * along its border. No framer-motion — pure CSS keyframe animation.
 *
 * The outer div is relative + overflow-hidden and acts as the border "frame".
 * A sizeable pseudo-layer with the spinning conic gradient sits behind the
 * inner content div, which has a matching bg-card fill to mask the gradient
 * everywhere except at the border edge.
 */
export function ShineBorder({
  children,
  className,
  borderWidth = 1,
  duration = 8,
  color = ["#2ECC71", "#27AE60"],
  borderRadius = 16,
}: ShineBorderProps) {
  const colors = Array.isArray(color) ? color : [color];
  // Build a conic gradient that fades in, holds the color band, then fades out
  const colorStops = [
    "transparent 0deg",
    ...colors.map((c, i) => {
      const start = 60 + (i / colors.length) * 60;
      const end = 60 + ((i + 1) / colors.length) * 60;
      return `${c} ${start}deg, ${c} ${end}deg`;
    }),
    "transparent 135deg",
    "transparent 360deg",
  ].join(", ");

  const innerRadius = Math.max(0, borderRadius - borderWidth);
  const animationName = `shine-spin-${duration}`;

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ borderRadius: `${borderRadius}px`, padding: `${borderWidth}px` }}
    >
      {/* Spinning gradient layer — oversized so the beam reaches all corners */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          // Extend well beyond the container so the conic sweep covers corners
          inset: "-100%",
          background: `conic-gradient(${colorStops})`,
          animation: `${animationName} ${duration}s linear infinite`,
        }}
      />

      {/* Inner content surface — masks gradient except at the border gap */}
      <div
        className="relative z-10 h-full w-full bg-card text-card-foreground"
        style={{ borderRadius: `${innerRadius}px` }}
      >
        {children}
      </div>

      <style>{`
        @keyframes ${animationName} {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
