import type { Transition, Variants } from "framer-motion";

/** Easing premium yang dipakai di semua animasi halaman utama. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Konfigurasi `viewport` bersama untuk animasi whileInView. */
export const VIEWPORT = { once: true, amount: 0.2 } as const;

export const baseTransition: Transition = { duration: 0.7, ease: EASE };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...baseTransition, delay },
  }),
};

export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});
