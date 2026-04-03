"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 163;
const KEYFRAME_STEP = 8;
const PLAYBACK_FPS = 30;
const SESSION_KEY = "exb-intro-seen";

function IntroVideo({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null)
  );
  const drawFrameRef = useRef<(index: number) => void>(undefined);
  const playbackRef = useRef<number | null>(null);

  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

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

      const scale = Math.max(cw / iw, ch / ih) * 0.85;
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
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Load frames → auto-play → fade out → signal complete
  useEffect(() => {
    let cancelled = false;
    let keyframeCount = 0;
    let phase2Started = false;
    let playbackStarted = false;

    const keyframeIndices: number[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i += KEYFRAME_STEP)
      keyframeIndices.push(i);
    const totalKeyframes = keyframeIndices.length;
    const keyframeSet = new Set(keyframeIndices);

    const startPlayback = () => {
      if (playbackStarted || cancelled) return;
      playbackStarted = true;

      let currentFrame = 0;
      const interval = 1000 / PLAYBACK_FPS;

      const play = () => {
        if (cancelled) return;

        drawFrameRef.current?.(currentFrame);
        setProgress(currentFrame / (TOTAL_FRAMES - 1));
        currentFrame++;

        if (currentFrame >= TOTAL_FRAMES) {
          setFadeOut(true);
          sessionStorage.setItem(SESSION_KEY, "1");
          setTimeout(() => {
            if (!cancelled) onComplete();
          }, 600);
          return;
        }

        playbackRef.current = window.setTimeout(play, interval);
      };

      play();
    };

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
        if (keyframeCount === 1) drawFrameRef.current?.(0);
        if (keyframeCount >= totalKeyframes) {
          startPhase2();
          startPlayback();
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        keyframeCount++;
        if (keyframeCount >= totalKeyframes) {
          startPhase2();
          startPlayback();
        }
      };
    });

    return () => {
      cancelled = true;
      if (playbackRef.current) clearTimeout(playbackRef.current);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black transition-opacity duration-500"
      style={{
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Bottom-right cover box */}
      <div className="absolute bottom-0 right-0 w-32 h-16 bg-black" />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-exb-green to-exb-green-dark transition-[width] duration-75 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Shows the intro video once per browser session.
 * On subsequent visits (same tab/session), skips directly.
 */
export function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      // Already seen this session — skip immediately
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    } else {
      setShow(true);
    }
  }, [onComplete]);

  if (!show) return null;

  return <IntroVideo onComplete={onComplete} />;
}
