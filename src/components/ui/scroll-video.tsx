"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 192;
const KEYFRAME_STEP = 8; // Phase 1: load every 8th frame → ~24 keyframes for full coverage

interface TextSection {
  enter: number;
  leave: number;
  label: string;
  heading: string;
  body: string;
  isCTA?: boolean;
}

const sections: TextSection[] = [
  {
    enter: 0.0,
    leave: 0.2,
    label: "001 / The Challenge",
    heading: "IT Hardware Costs Are Crushing Growing Businesses",
    body: "New enterprise laptops drain budgets that should fuel growth. Indian businesses spend over $21 billion on IT hardware annually — most of it on overpriced new devices.",
  },
  {
    enter: 0.2,
    leave: 0.4,
    label: "002 / The Solution",
    heading: "Save Up to 70% on Enterprise-Grade Hardware",
    body: "Professionally refurbished laptops deliver the same performance at a fraction of the cost. Every device passes our rigorous multi-point inspection.",
  },
  {
    enter: 0.4,
    leave: 0.6,
    label: "003 / Trusted Brands",
    heading: "Dell. HP. Lenovo. Certified & Warranty-Backed.",
    body: "We source premium business-series models — ThinkPad, EliteBook, Latitude — built for durability and professional workloads, backed by our warranty.",
  },
  {
    enter: 0.6,
    leave: 0.8,
    label: "004 / Your Fleet",
    heading: "Upgrade Your Entire Team Without Breaking the Budget",
    body: "From 10 laptops to 1,000. Bulk pricing, dedicated account management, and fleet-ready delivery for businesses across India.",
  },
  {
    enter: 0.8,
    leave: 1.01,
    label: "",
    heading: "Smart Technology. Better Value.",
    body: "",
    isCTA: true,
  },
];

export function ScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null)
  );
  const currentFrameRef = useRef(0);
  const drawFrameRef = useRef<(index: number) => void>(undefined);

  const [scrollProgress, setScrollProgress] = useState(0);

  // ── Nearest loaded frame fallback ──
  const nearestFrame = useCallback((idx: number): number => {
    if (framesRef.current[idx]) return idx;
    for (let d = 1; d < TOTAL_FRAMES; d++) {
      if (idx - d >= 0 && framesRef.current[idx - d]) return idx - d;
      if (idx + d < TOTAL_FRAMES && framesRef.current[idx + d]) return idx + d;
    }
    return 0;
  }, []);

  // ── Draw frame to canvas ──
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const actual = nearestFrame(index);
      const img = framesRef.current[actual];
      if (!img) return;

      const dpr = window.devicePixelRatio || 1;
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    },
    [nearestFrame]
  );

  // Keep a ref to drawFrame so the loading effect can call it without re-running
  drawFrameRef.current = drawFrame;

  // ── Two-phase frame loading ──
  useEffect(() => {
    let cancelled = false;
    let keyframeCount = 0;
    let phase2Started = false;

    const keyframeIndices: number[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i += KEYFRAME_STEP)
      keyframeIndices.push(i);
    const totalKeyframes = keyframeIndices.length;
    const keyframeSet = new Set(keyframeIndices);

    const startPhase2 = () => {
      if (phase2Started) return;
      phase2Started = true;
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        if (!keyframeSet.has(i)) {
          const img = new window.Image();
          img.src = `/frames/frame_${String(i).padStart(4, "0")}.jpg`;
          img.onload = () => {
            if (!cancelled) framesRef.current[i - 1] = img;
          };
        }
      }
    };

    keyframeIndices.forEach((frameNum) => {
      const img = new window.Image();
      img.src = `/frames/frame_${String(frameNum).padStart(4, "0")}.jpg`;
      img.onload = () => {
        if (cancelled) return;
        framesRef.current[frameNum - 1] = img;
        keyframeCount++;

        // Draw current frame as soon as any keyframe loads
        if (keyframeCount === 1) {
          drawFrameRef.current?.(currentFrameRef.current);
        }

        if (keyframeCount >= totalKeyframes) {
          startPhase2();
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        keyframeCount++;
        if (keyframeCount >= totalKeyframes) {
          startPhase2();
        }
      };
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // ── Canvas sizing ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [drawFrame]);

  // ── Scroll handler ──
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerTop = -rect.top;
      const containerHeight = container.scrollHeight - window.innerHeight;
      const sp = Math.max(0, Math.min(1, containerTop / containerHeight));
      setScrollProgress(sp);

      const FRAME_SPEED = 1.18;
      const accelerated = Math.min(sp * FRAME_SPEED, 1);
      const frameIndex = Math.min(
        Math.floor(accelerated * TOTAL_FRAMES),
        TOTAL_FRAMES - 1
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        requestAnimationFrame(() => drawFrame(frameIndex));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [drawFrame]);

  // Active section index
  const activeIdx = sections.findIndex(
    (s) => scrollProgress >= s.enter && scrollProgress < s.leave
  );

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
      {/* ═══ Sticky viewport ═══ */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center bg-[#0a0a0a]">
        {/* Glassmorphism background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-exb-green/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-exb-green-dark/15 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-exb-green/10 rounded-full blur-[100px]" />
        </div>

        <div className="flex w-full h-full relative">
          {/* Left 35% — Video */}
          <div className="relative w-full lg:w-[35%] h-full bg-[#0a0a0a] overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full" />
            {/* Subtle gradient overlay on right edge to blend into glass panel */}
            <div className="hidden lg:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/60 to-transparent" />

            {/* Mobile text overlays — shown below lg */}
            <div className="lg:hidden absolute inset-0 pointer-events-none">
              <MobileOverlays scrollProgress={scrollProgress} />
            </div>
          </div>

          {/* Right 65% — Glass text panel (desktop only) */}
          <div className="hidden lg:flex w-[65%] h-full backdrop-blur-2xl bg-white/[0.04] border-l border-white/[0.08] flex-col justify-center px-12 xl:px-20 relative">
            {/* Decorative vertical line */}
            <div className="absolute left-0 top-[15%] bottom-[15%] w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

            {/* Inner glass glow reflection at top */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Progress indicator dots — glassy pill */}
            <div className="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col gap-4 px-2 py-3 rounded-full backdrop-blur-sm bg-white/[0.04] border border-white/[0.08]">
              {sections.map((_, i) => (
                <div key={i} className="relative flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      i === activeIdx
                        ? "bg-exb-green scale-125 shadow-[0_0_10px_rgba(46,204,113,0.6)]"
                        : i < activeIdx
                        ? "bg-white/40"
                        : "bg-white/10"
                    }`}
                  />
                  {i === activeIdx && (
                    <div className="absolute left-0 w-2 h-2 rounded-full bg-exb-green animate-ping opacity-50" />
                  )}
                </div>
              ))}
            </div>

            {/* Text content — needs explicit height for absolute children */}
            <div className="relative pl-8 flex-1">
              {sections.map((section, idx) => {
                const isActive = idx === activeIdx;
                const isPast = idx < activeIdx;

                // Calculate local progress within this section
                let localProgress = 0;
                if (isActive) {
                  localProgress =
                    (scrollProgress - section.enter) /
                    (section.leave - section.enter);
                }

                return (
                  <div
                    key={idx}
                    className="absolute inset-0 flex flex-col justify-center pl-8 transition-all duration-700 ease-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? "translateY(0)"
                        : isPast
                        ? "translateY(-30px)"
                        : "translateY(30px)",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    {section.label && (
                      <span className="inline-flex items-center w-fit px-3 py-1 mb-5 rounded-full backdrop-blur-sm bg-exb-green/10 border border-exb-green/25 text-xs font-semibold uppercase tracking-[0.25em] text-exb-green">
                        {section.label}
                      </span>
                    )}

                    <h2
                      className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white leading-[1.15] tracking-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {section.heading}
                    </h2>

                    {section.body && (
                      <p className="mt-5 text-white/55 text-base xl:text-lg leading-relaxed max-w-sm">
                        {section.body}
                      </p>
                    )}

                    {section.isCTA && (
                      <div className="flex flex-col sm:flex-row gap-3 mt-8">
                        <a
                          href="/contact"
                          className="pointer-events-auto inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-exb-green to-exb-green-dark rounded-2xl hover:shadow-2xl hover:shadow-exb-green/20 transition-all duration-300 hover:scale-[1.03] w-fit cursor-pointer"
                        >
                          Request a Quote
                        </a>
                        <a
                          href="https://wa.me/919XXXXXXXXX?text=Hi%2C%20I%20need%20a%20quote%20for%20refurbished%20laptops."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pointer-events-auto inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white border border-white/20 rounded-2xl hover:bg-white/5 transition-all duration-300 w-fit cursor-pointer"
                        >
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          WhatsApp Us
                        </a>
                      </div>
                    )}

                    {/* Glass progress bar for active section */}
                    {isActive && !section.isCTA && (
                      <div className="mt-8 w-32 h-[3px] bg-white/[0.08] backdrop-blur-sm rounded-full overflow-hidden border border-white/[0.06]">
                        <div
                          className="h-full bg-gradient-to-r from-exb-green to-exb-green-dark transition-all duration-100 rounded-full"
                          style={{ width: `${localProgress * 100}%` }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile: text overlay on top of canvas */
function MobileOverlays({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      {sections.map((section, idx) => {
        const fadeIn =
          scrollProgress >= section.enter &&
          scrollProgress < section.enter + 0.04;
        const visible =
          scrollProgress >= section.enter + 0.04 &&
          scrollProgress < section.leave - 0.04;
        // Last section (CTA) never fades out — there's no further scroll to trigger it
        const isLast = section.leave >= 1.0;
        const fadeOut =
          !isLast &&
          scrollProgress >= section.leave - 0.04 &&
          scrollProgress < section.leave;
        const show =
          fadeIn ||
          visible ||
          fadeOut ||
          (isLast && scrollProgress >= section.enter + 0.04);

        let opacity = 0;
        if (fadeIn) opacity = (scrollProgress - section.enter) / 0.04;
        else if (visible || (isLast && scrollProgress >= section.enter + 0.04))
          opacity = 1;
        else if (fadeOut)
          opacity = 1 - (scrollProgress - (section.leave - 0.04)) / 0.04;

        const translateY = fadeIn ? (1 - opacity) * 30 : 0;

        return (
          <div
            key={idx}
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/95 to-transparent"
            style={{
              paddingTop: "7rem",
              opacity: show ? opacity : 0,
              transform: `translateY(${translateY}px)`,
              pointerEvents: show ? "auto" : "none",
            }}
          >
            <div className="px-6 pb-10">
              {section.label && (
                <span className="inline-flex items-center px-2.5 py-0.5 mb-3 rounded-full bg-exb-green/15 border border-exb-green/30 text-[10px] font-semibold uppercase tracking-[0.25em] text-exb-green block w-fit">
                  {section.label}
                </span>
              )}
              <h2
                className="text-2xl md:text-3xl font-bold text-white leading-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  textShadow: "0 2px 12px rgba(0,0,0,0.8)",
                }}
              >
                {section.heading}
              </h2>
              {section.body && (
                <p
                  className="mt-2 text-white/75 text-sm leading-relaxed max-w-xs"
                  style={{ textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}
                >
                  {section.body}
                </p>
              )}
              {section.isCTA && (
                <div className="flex flex-col gap-3 mt-4">
                  <a
                    href="/contact"
                    className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-exb-green to-exb-green-dark rounded-xl cursor-pointer min-h-[44px]"
                  >
                    Request a Quote
                  </a>
                  <a
                    href="https://wa.me/919XXXXXXXXX?text=Hi%2C%20I%20need%20a%20quote%20for%20refurbished%20laptops."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white border border-white/20 rounded-xl cursor-pointer min-h-[44px]"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp Us
                  </a>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
