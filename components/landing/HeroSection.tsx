"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { EASE } from "@/lib/motion";

type Props = {
  title: string;
  subtitle: string;
  image: string;
};

export function HeroSection({ title, subtitle, image }: Props) {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // parallax hanya di layar md ke atas; di HP foto diam agar ringan
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", isDesktop ? "25%" : "0%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", isDesktop ? "40%" : "0%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // "PKBM Swastika - Pendidikan untuk Semua" → baris 1 "PKBM", baris 2 "Swastika" (emas)
  const [name, tagline] = title.split(" - ");
  const words = name.split(" ");
  const lastWord = words.pop();

  return (
    <section id="home" ref={ref} className="relative h-screen min-h-[640px] overflow-hidden bg-navy-950">
      <motion.div style={{ y: imageY }} className="absolute inset-x-0 -top-[10%] h-[120%] will-change-transform">
        {/* TODO: ganti dengan foto hero resolusi tinggi (min. 1920×1080px) — atur via Admin > Settings (hero_image) */}
        <Image src={image} alt="Gedung PKBM Swastika" fill priority sizes="100vw" className="object-cover" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 via-transparent to-transparent" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-premium relative flex h-full flex-col justify-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="mb-6 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-gold"
        >
          <span className="h-px w-10 bg-gold" aria-hidden />
          Selamat Datang di
        </motion.span>

        <h1 className="max-w-4xl font-heading text-5xl font-bold leading-[1.05] text-white md:text-7xl">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          >
            {words.join(" ")}
          </motion.span>
          <motion.span
            className="block text-gold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
          >
            {lastWord}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg"
        >
          {tagline ? `${tagline}. ` : ""}
          {subtitle}.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button href="/pendaftaran" variant="primary">
            Daftar Sekarang <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="#why-us" variant="outline">
            Kenali PKBM Swastika
          </Button>
        </motion.div>
      </motion.div>

      <motion.a
        href="#program"
        aria-label="Gulir ke konten"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/70"
      >
        Scroll
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-5 w-5 text-gold" />
        </motion.span>
      </motion.a>
    </section>
  );
}
