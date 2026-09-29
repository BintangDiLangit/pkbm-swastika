"use client";

import { useEffect, useState } from "react";

/**
 * Menghitung dari 0 ke `target` selama `duration` ms (easeOutExpo).
 * Belum berjalan sampai `start` bernilai true (mis. dari useInView).
 */
export function useCountUp(target: number, duration = 2000, start = true): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let frame = 0;
    let startTime: number | null = null;
    const easeOut = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.round(easeOut(progress) * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);

  return count;
}
