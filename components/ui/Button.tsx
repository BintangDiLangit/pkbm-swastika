"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

type Variant = "primary" | "secondary" | "outline";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-navy shadow-lg shadow-gold/30 hover:bg-gold-light",
  secondary: "bg-navy text-white shadow-lg shadow-navy/30 hover:bg-navy-800",
  outline: "border border-white/40 text-white backdrop-blur-sm hover:border-gold hover:text-gold",
};

const MotionLink = motion.create(Link);

/** Tombol kapsul dengan micro-interaction Framer Motion. Link internal memakai next/link. */
export function Button({
  href,
  variant = "primary",
  external = false,
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const shared = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.3, ease: EASE },
    className: `inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-heading text-sm font-bold tracking-wide transition-colors duration-300 ${variants[variant]} ${className}`,
  };

  if (external || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <motion.a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...shared}>
        {children}
      </motion.a>
    );
  }
  return (
    <MotionLink href={href} {...shared}>
      {children}
    </MotionLink>
  );
}
