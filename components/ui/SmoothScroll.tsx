"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { MotionConfig } from "framer-motion";

/** Smooth scroll Lenis + konfigurasi Framer Motion global (menghormati reduced-motion). */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, anchors: { offset: -80 } }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
}
