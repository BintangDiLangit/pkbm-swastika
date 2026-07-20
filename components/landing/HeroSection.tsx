"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { FaArrowRight, FaUserPlus, FaPlay } from "react-icons/fa";

type Props = {
  title: string;
  subtitle: string;
  image: string;
};

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

function HeroHeadline({ text }: { text: string }) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) {
    return (
      <h1 className="mt-4 max-w-5xl text-balance text-5xl font-bold leading-[1.02] text-white sm:text-7xl md:text-8xl">
        {text}
      </h1>
    );
  }

  return (
    <h1 className="mt-4 max-w-5xl text-balance text-5xl font-bold leading-[1.02] text-white sm:text-7xl md:text-8xl">
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-top">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: EXPO_OUT }}
            className="inline-block"
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export function HeroSection({ title, subtitle, image }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1.08, 1.18]);

  return (
    <section ref={sectionRef} className="relative -mt-[68px] bg-white px-2 pb-2 sm:px-3 sm:pb-3">
      {/* Thursina-style framed hero: rounded card with thin white gutter */}
      <div className="relative isolate min-h-[100vh] overflow-hidden rounded-b-[2rem] sm:rounded-b-[2.5rem]">
        {/* full-bleed background photo, parallax on scroll */}
        <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
          <Image
            src={image}
            alt="PKBM Swastika"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/45 to-ink/80" />

        <div className="container relative flex min-h-[100vh] flex-col items-center justify-center pb-24 pt-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EXPO_OUT }}
            className="text-xs font-bold uppercase tracking-[0.35em] text-accent-400 sm:text-sm"
          >
            Selamat Datang di
          </motion.div>

          <HeroHeadline text={title.split(" - ")[0]} />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: EXPO_OUT }}
            className="mt-4 text-xl font-semibold text-accent-300 sm:text-2xl"
          >
            {title.split(" - ")[1] ?? "Pendidikan untuk Semua"}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EXPO_OUT }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: EXPO_OUT }}
            className="mt-9 flex flex-wrap justify-center gap-3"
          >
            <Link href="/pendaftaran" className="btn-accent">
              <FaUserPlus />
              Daftar Sekarang
              <FaArrowRight className="text-xs" />
            </Link>
            <Link
              href="#program"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <FaPlay className="text-xs" />
              Lihat Program
            </Link>
          </motion.div>

          {/* trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: EXPO_OUT }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/80"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-accent-300">✓</span>
              <span className="font-semibold text-white">Terakreditasi BAN PAUD & PNF</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-accent-300">✓</span>
              <span className="font-semibold text-white">Ijazah resmi Kemendikbud</span>
            </div>
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 sm:flex"
        >
          <span className="text-[10px] font-semibold uppercase tracking-widest">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-5 rounded-full border border-white/40"
          />
        </motion.div>
      </div>
    </section>
  );
}
