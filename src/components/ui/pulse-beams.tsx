"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BeamNode {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface PulseBeamsProps {
  nodes: BeamNode[];
  className?: string;
  beamColor?: string;
}

function HorizontalBeam({
  beamColor,
  delay,
}: {
  beamColor: string;
  delay: number;
}) {
  return (
    <div className="relative flex-1 h-0.5 mx-4 hidden md:block overflow-hidden">
      <div className="absolute inset-0 bg-border" />
      <motion.div
        className="absolute inset-y-0 left-0 w-1/3 rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${beamColor}, transparent)`,
        }}
        animate={{ x: ["0%", "200%"] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
      />
    </div>
  );
}

function VerticalBeam({
  beamColor,
  delay,
}: {
  beamColor: string;
  delay: number;
}) {
  return (
    <div className="relative w-0.5 h-8 mx-auto md:hidden overflow-hidden">
      <div className="absolute inset-0 bg-border" />
      <motion.div
        className="absolute inset-x-0 top-0 h-1/3 rounded-full"
        style={{
          background: `linear-gradient(180deg, transparent, ${beamColor}, transparent)`,
        }}
        animate={{ y: ["0%", "200%"] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
      />
    </div>
  );
}

export function PulseBeams({
  nodes,
  className,
  beamColor = "#2ECC71",
}: PulseBeamsProps) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-center justify-center w-full",
        className
      )}
    >
      {nodes.map((node, index) => (
        <React.Fragment key={node.id}>
          {/* Node */}
          <div className="flex flex-col items-center text-center gap-3 flex-shrink-0">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${beamColor}15` }}
            >
              <span style={{ color: beamColor }}>{node.icon}</span>
            </div>
            <h3 className="font-display text-lg font-semibold">{node.label}</h3>
            <p className="text-sm text-muted-foreground max-w-[180px]">
              {node.description}
            </p>
          </div>

          {/* Beam connector between adjacent nodes */}
          {index < nodes.length - 1 && (
            <>
              <HorizontalBeam beamColor={beamColor} delay={index * 0.4} />
              <VerticalBeam beamColor={beamColor} delay={index * 0.4} />
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
