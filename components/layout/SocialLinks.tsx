"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube, type LucideIcon } from "lucide-react";
import { siteConfig, type SocialPlatform } from "@/lib/site";

const ICONS: Record<SocialPlatform, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
};

/** Ikon media sosial beranimasi (bagian klien dari Footer). */
export function SocialLinks() {
  return (
    <ul className="flex flex-wrap gap-3">
      {siteConfig.social.map(({ platform, label, href }) => {
        const Icon = ICONS[platform];
        return (
          <li key={platform}>
            <motion.a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-navy"
            >
              <Icon className="h-5 w-5" />
            </motion.a>
          </li>
        );
      })}
    </ul>
  );
}
