"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type ShootingStarsGridSpeed = "slow" | "normal" | "fast" | number;

export type ShootingStarsGridProps = {
  children?: React.ReactNode;
  starCount?: number;
  shootingStarCount?: number;
  gridSize?: number;
  speed?: ShootingStarsGridSpeed;
  glow?: boolean;
  className?: string;
  contentClassName?: string;
  showGrid?: boolean;
  showStaticStars?: boolean;
  reducedMotionFallback?: boolean;
  interactive?: boolean;
};

type StaticStar = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
};

type ShootingStar = {
  axis: "horizontal" | "vertical";
  line: number;
  start: string;
  end: string;
  length: number;
  delay: number;
  duration: number;
  repeatDelay: number;
  direction: 1 | -1;
};

const SPEED_SCALE: Record<Exclude<ShootingStarsGridSpeed, number>, number> = {
  slow: 1.25,
  normal: 1,
  fast: 0.72,
};

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 91.73 + salt * 37.11) * 10000;
  // round so SSR and client serialize style values identically (avoids hydration mismatch)
  return Math.round((value - Math.floor(value)) * 10000) / 10000;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

function createStaticStars(count: number): StaticStar[] {
  return Array.from({ length: count }, (_, index) => ({
    x: round2(seeded(index, 1) * 100),
    y: round2(seeded(index, 2) * 100),
    size: round2(1 + seeded(index, 3) * 2.4),
    opacity: round2(0.16 + seeded(index, 4) * 0.44),
    delay: round2(seeded(index, 5) * 4),
    duration: round2(2.4 + seeded(index, 6) * 3.2),
  }));
}

function createShootingStars(count: number): ShootingStar[] {
  const horizontalLines = [3, 5, 7, 9, 11, 13, 16, 19];
  const verticalLines = [2, 4, 6, 8, 11, 14, 17, 20, 23];

  return Array.from({ length: count }, (_, index) => {
    const axis: ShootingStar["axis"] = index % 3 === 1 ? "vertical" : "horizontal";
    const direction: ShootingStar["direction"] = index % 2 === 0 ? 1 : -1;
    const lanes = axis === "horizontal" ? horizontalLines : verticalLines;

    return {
      axis,
      line: lanes[index % lanes.length],
      start: direction === 1 ? "-18%" : "112%",
      end: direction === 1 ? "112%" : "-18%",
      length: round2(86 + seeded(index, 15) * 132),
      delay: round2(seeded(index, 16) * 7 + index * 0.65),
      duration: round2(1.65 + seeded(index, 17) * 1.6),
      repeatDelay: round2(4.8 + seeded(index, 18) * 6.2),
      direction,
    };
  });
}

function getSpeedScale(speed: ShootingStarsGridSpeed) {
  return typeof speed === "number" ? Math.max(0.35, speed) : SPEED_SCALE[speed];
}

function GridRunner({
  runner,
  index,
  shouldAnimate,
  speedScale,
}: {
  runner: ShootingStar;
  index: number;
  shouldAnimate: boolean;
  speedScale: number;
}) {
  const isHorizontal = runner.axis === "horizontal";
  const linePosition = `calc(var(--shooting-stars-grid-size) * ${runner.line})`;
  const gradientDirection = isHorizontal
    ? runner.direction === 1
      ? "90deg"
      : "270deg"
    : runner.direction === 1
      ? "180deg"
      : "0deg";

  return (
    <motion.span
      className={cn("absolute rounded-full", index > 4 && "max-sm:hidden")}
      style={{
        left: isHorizontal ? runner.start : linePosition,
        top: isHorizontal ? linePosition : runner.start,
        width: isHorizontal ? runner.length : 1,
        height: isHorizontal ? 1 : runner.length,
        background: `linear-gradient(${gradientDirection}, transparent 0%, rgba(250,204,21,0.14) 18%, rgba(253,224,71,0.92) 52%, rgba(255,255,255,0.96) 58%, transparent 100%)`,
        boxShadow: "0 0 16px rgba(250,204,21,0.45), 0 0 28px rgba(148,163,184,0.18)",
      }}
      initial={{ opacity: 0, scaleX: isHorizontal ? 0.35 : 1, scaleY: isHorizontal ? 1 : 0.35 }}
      animate={
        shouldAnimate
          ? {
              left: isHorizontal ? [runner.start, runner.end] : linePosition,
              top: isHorizontal ? linePosition : [runner.start, runner.end],
              opacity: [0, 1, 1, 0],
              scaleX: isHorizontal ? [0.35, 1, 1.08, 0.8] : 1,
              scaleY: isHorizontal ? 1 : [0.35, 1, 1.08, 0.8],
            }
          : { opacity: 0 }
      }
      transition={{
        duration: runner.duration * speedScale,
        delay: runner.delay,
        repeat: Infinity,
        repeatDelay: runner.repeatDelay * speedScale,
        ease: "easeOut",
      }}
    />
  );
}

export function ShootingStarsGrid({
  children,
  starCount = 48,
  shootingStarCount = 6,
  gridSize = 44,
  speed = "normal",
  glow = true,
  className,
  contentClassName,
  showGrid = true,
  showStaticStars = true,
  reducedMotionFallback = true,
  interactive = false,
}: ShootingStarsGridProps) {
  const reduceMotion = useReducedMotion() === true;
  const rootRef = React.useRef<HTMLElement>(null);
  const staticStars = React.useMemo(
    () => createStaticStars(Math.max(0, Math.min(starCount, 90))),
    [starCount],
  );
  const shootingStars = React.useMemo(
    () => createShootingStars(Math.max(0, Math.min(shootingStarCount, 10))),
    [shootingStarCount],
  );
  const speedScale = getSpeedScale(speed);

  const onPointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!interactive || reduceMotion) return;
      const node = rootRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      node.style.setProperty("--shooting-stars-glow-x", `${x}%`);
      node.style.setProperty("--shooting-stars-glow-y", `${y}%`);
    },
    [interactive, reduceMotion],
  );

  const shouldAnimate = !reduceMotion || !reducedMotionFallback;

  return (
    <section
      ref={rootRef}
      onPointerMove={onPointerMove}
      className={cn(
        "group/shooting-stars relative isolate w-full overflow-hidden bg-primary-800 text-white",
        "bg-[linear-gradient(180deg,#1E3A8A_0%,#1D4ED8_55%,#1E3A8A_100%)]",
        className,
      )}
      style={
        {
          "--shooting-stars-grid-size": `${gridSize}px`,
          "--shooting-stars-glow-x": "50%",
          "--shooting-stars-glow-y": "30%",
        } as React.CSSProperties
      }
    >
      {showGrid && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 -z-30 opacity-60",
            "[background-image:linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)]",
            "[background-size:var(--shooting-stars-grid-size)_var(--shooting-stars-grid-size)]",
          )}
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(30,58,138,0.25)_52%,rgba(30,58,138,0.85)_100%)]"
      />

      {glow && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_var(--shooting-stars-glow-x)_var(--shooting-stars-glow-y),rgba(250,204,21,0.16),transparent_34%),radial-gradient(circle_at_72%_72%,rgba(96,165,250,0.2),transparent_30%)]"
          animate={shouldAnimate ? { opacity: [0.72, 1, 0.78], scale: [1, 1.03, 1] } : undefined}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {showStaticStars && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {staticStars.map((star, index) => (
            <motion.span
              key={index}
              className={cn(
                "absolute rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.55)]",
                index > 34 && "max-sm:hidden",
              )}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
              }}
              animate={
                shouldAnimate
                  ? { opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.55], scale: [0.85, 1.16, 0.9] }
                  : undefined
              }
              transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {shootingStars.map((star, index) => (
          <GridRunner
            key={index}
            runner={star}
            index={index}
            shouldAnimate={shouldAnimate}
            speedScale={speedScale}
          />
        ))}
      </div>

      <div className={cn("relative z-10 w-full", contentClassName)}>{children}</div>
    </section>
  );
}

export default ShootingStarsGrid;
