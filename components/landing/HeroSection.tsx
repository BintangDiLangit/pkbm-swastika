"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaUserPlus, FaPlay } from "react-icons/fa";

type Props = {
  title: string;
  subtitle: string;
  image: string;
};

export function HeroSection({ title, subtitle, image }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 animate-blob rounded-full bg-primary-200/40 blur-3xl" />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 animate-blob rounded-full bg-accent-200/50 blur-3xl"
        style={{ animationDelay: "3s" }}
      />
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="container relative grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:py-28">
        {/* left content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-100 bg-white/80 px-4 py-1.5 text-xs font-semibold text-primary-700 shadow-soft backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent-400" />
            Pendaftaran tahun ajaran baru dibuka
          </div>

          <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.1] text-ink sm:text-5xl md:text-6xl">
            {title.split(" - ")[0]}
            <span className="mt-2 block bg-gradient-to-r from-primary-700 via-primary-600 to-accent-500 bg-clip-text text-transparent">
              {title.split(" - ")[1] ?? "Pendidikan untuk Semua"}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/pendaftaran" className="btn-primary">
              <FaUserPlus />
              Daftar Sekarang
              <FaArrowRight className="text-xs" />
            </Link>
            <Link href="#program" className="btn-ghost">
              <FaPlay className="text-xs text-primary-600" />
              Lihat Program
            </Link>
          </div>

          {/* trust strip */}
          <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-ink-soft">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700">✓</span>
              <span className="font-semibold text-ink">Terakreditasi BAN PAUD & PNF</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-100 text-accent-600">✓</span>
              <span className="font-semibold text-ink">Ijazah resmi Kemendikbud</span>
            </div>
          </div>
        </motion.div>

        {/* right image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative lg:col-span-5"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary-200/60 to-accent-200/60 blur-2xl" />
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] border-4 border-white shadow-glow">
              <Image src={image} alt="PKBM Swastika" fill className="object-cover" priority sizes="(min-width: 1024px) 40vw, 90vw" />
            </div>

            {/* floating cards */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -left-6 top-10 hidden rounded-2xl border border-soft-200 bg-white/95 p-3 shadow-card backdrop-blur sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["1", "2", "3"].map((n) => (
                    <div
                      key={n}
                      className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-primary-400 to-primary-600"
                    />
                  ))}
                </div>
                <div>
                  <div className="text-sm font-bold text-ink">500+ alumni</div>
                  <div className="text-xs text-ink-soft">sudah lulus & berkarya</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -right-6 bottom-10 hidden rounded-2xl border border-soft-200 bg-white/95 p-3 shadow-card backdrop-blur sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-100 text-accent-600">
                  ⭐
                </div>
                <div>
                  <div className="text-sm font-bold text-ink">Tanpa batas usia</div>
                  <div className="text-xs text-ink-soft">jadwal fleksibel</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
