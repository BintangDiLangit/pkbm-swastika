"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Clock,
  GraduationCap,
  HandCoins,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { EASE, VIEWPORT, fadeUp, staggerContainer } from "@/lib/motion";

const badges: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Award, title: "Ijazah Resmi", description: "Setara SD, SMP, SMA dari Kemendikbudristek" },
  { icon: ShieldCheck, title: "Terakreditasi", description: "Lembaga resmi terakreditasi BAN PNF" },
  { icon: Clock, title: "Jadwal Fleksibel", description: "3x seminggu, sore & malam hari" },
  { icon: HandCoins, title: "Biaya Terjangkau", description: "Terjangkau untuk semua kalangan" },
  { icon: Users, title: "Tanpa Batas Usia", description: "Belajar bersama tanpa diskriminasi" },
  { icon: GraduationCap, title: "Keterampilan", description: "Pelatihan kerja & wirausaha" },
];

export function WhyUsSection({ whatsapp }: { whatsapp: string }) {
  const waLink = `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Halo PKBM Swastika, saya ingin konsultasi pendaftaran."
  )}`;

  return (
    <section id="why-us" className="section-padding overflow-hidden bg-slate-50/60">
      <div className="container-premium grid items-center gap-12 md:grid-cols-2 lg:gap-20">
        {/* kolase foto */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative pb-16 pr-10 md:pb-20 md:pr-14"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card-hover">
            <Image src="/images/kelas.jpeg" alt="Kegiatan belajar di kelas" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="absolute bottom-0 right-0 aspect-square w-1/2 overflow-hidden rounded-3xl border-8 border-white shadow-card-hover"
          >
            <Image src="/images/diskusi.jpg" alt="Diskusi peserta didik" fill sizes="25vw" className="object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
            className="absolute left-6 top-6 rounded-2xl bg-navy px-6 py-5 text-white shadow-xl"
          >
            <p className="font-heading text-4xl font-bold text-gold">B</p>
            <p className="text-xs uppercase tracking-[0.2em] text-white/80">Akreditasi BAN PNF</p>
          </motion.div>
        </motion.div>

        {/* teks */}
        <div>
          <Reveal>
            <SectionLabel>Kenapa PKBM Swastika</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 text-4xl font-bold leading-tight text-navy md:text-5xl">
              Kenapa Kami{" "}
              <span className="relative whitespace-nowrap">
                Pilihan Tepat
                <span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-gold/60" aria-hidden />
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-slate-500">
              Kami percaya setiap orang berhak atas kesempatan belajar yang setara, apapun usianya,
              latar belakangnya, atau kondisinya. Belajar dengan tenang, lulus dengan ijazah resmi.
            </p>
          </Reveal>

          <motion.ul
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {badges.map((badge) => (
              <motion.li
                key={badge.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-colors duration-300 hover:border-gold/40 hover:bg-white hover:shadow-card"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                  <badge.icon className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-heading font-semibold text-navy">{badge.title}</span>
                  <span className="block text-sm text-slate-500">{badge.description}</span>
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <Reveal delay={0.3} className="mt-10">
            <Button href={waLink} external variant="primary">
              Konsultasi Gratis <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
