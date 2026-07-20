"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <span className="relative inline-block">
      <span className="text-ink/15">{children}</span>
      <motion.span style={{ opacity, y }} className="absolute left-0 top-0">
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Word-by-word "scroll scrub" heading — words fade from faint to full color
 * as the heading crosses the viewport, tied to actual scroll progress.
 */
export function ScrollRevealHeading({
  text,
  highlight,
  className = "",
}: {
  text: string;
  highlight?: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });

  const words = text.split(" ");
  const highlightWords = highlight ? highlight.split(" ") : [];
  const all = [...words, ...highlightWords];

  if (reduceMotion) {
    return (
      <h2 ref={ref} className={className}>
        {text} {highlight && <span className="text-primary-700">{highlight}</span>}
      </h2>
    );
  }

  return (
    <h2 ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <Word progress={scrollYProgress} range={[i / all.length, (i + 1) / all.length]}>
            {w}
          </Word>{" "}
        </span>
      ))}
      {highlightWords.map((w, i) => {
        const idx = words.length + i;
        return (
          <span key={`h-${w}-${i}`} className="text-primary-700">
            <Word progress={scrollYProgress} range={[idx / all.length, (idx + 1) / all.length]}>
              {w}
            </Word>{" "}
          </span>
        );
      })}
    </h2>
  );
}
