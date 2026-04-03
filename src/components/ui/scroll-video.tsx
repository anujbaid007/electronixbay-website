"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 192;
const KEYFRAME_STEP = 8;

export function ScrollVideo({ onComplete }: { onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null)
  );
  const currentFrameRef = useRef(0);
  const drawFrameRef = useRef<(index: number) => void>(undefined);
  const completedRef = useRef(false);

  const [progress, setProgress] = useState(0);

  const nearestFrame = useCallback((idx: number): number => {
    if (framesRef.current[idx]) return idx;
    for (let d = 1; d < TOTAL_FRAMES; d++) {
      if (idx - d >= 0 && framesRef.current[idx - d]) return idx - d;
      if (idx + d < TOTAL_FRAMES && framesRef.current[idx + d]) return idx + d;
    }
    return 0;
  }, []);

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

  drawFrameRef.current = drawFrame;

  // Two-phase frame loading
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
        if (keyframeCount === 1) {
          drawFrameRef.current?.(currentFrameRef.current);
        }
        if (keyframeCount >= totalKeyframes) startPhase2();
      };
      img.onerror = () => {
        if (cancelled) return;
        keyframeCount++;
        if (keyframeCount >= totalKeyframes) startPhase2();
      };
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      drawFrameRef.current?.(currentFrameRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Scroll-driven playback
  useEffect(() => {
    const FRAME_SPEED = 1.18;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) { ticking = false; return; }

        const rect = container.getBoundingClientRect();
        const scrollable = container.scrollHeight - window.innerHeight;
        const scrolled = -rect.top;
        const rawProgress = Math.max(0, Math.min(1, scrolled / scrollable));
        const boosted = Math.min(1, rawProgress * FRAME_SPEED);

        setProgress(boosted);

        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(boosted * (TOTAL_FRAMES - 1))
        );

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrameRef.current?.(frameIndex);
        }

        // Fire completion callback when animation reaches the end
        if (boosted >= 0.99 && !completedRef.current) {
          completedRef.current = true;
          onComplete?.();
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onComplete]);

  return (
    <div ref={containerRef} style={{ height: "300vh" }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Subtle vignette overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />

        {/* Scroll indicator — fades out as user scrolls */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500"
          style={{ opacity: progress > 0.1 ? 0 : 1 }}
        >
          <span className="text-white/40 text-xs uppercase tracking-widest">
            Scroll to explore
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>

        {/* Progress bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-exb-green to-exb-green-dark transition-all duration-100 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
