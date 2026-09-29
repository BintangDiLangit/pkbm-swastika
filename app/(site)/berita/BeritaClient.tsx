"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Newspaper, UserRound } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientHeading } from "@/components/ui/GradientHeading";
import { Reveal } from "@/components/ui/Reveal";
import { EASE, VIEWPORT } from "@/lib/motion";

interface Berita {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image: string;
  date: string;
}

export default function BeritaClient() {
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBerita();
  }, []);

  const fetchBerita = async () => {
    try {
      const response = await fetch("/api/berita");
      const data = await response.json();
      if (data.success) {
        setBeritaList(data.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data berita:", error);
    } finally {
      setLoading(false);
    }
  };

  const hero = (
    <PageHero
      label="Berita"
      title="Berita &"
      highlight="Pengumuman"
      description="Informasi terkini seputar kegiatan, pengumuman, dan prestasi PKBM SWASTIKA."
      image="/images/juara.jpg"
    />
  );

  if (loading) {
    return (
      <>
        {hero}
        <section className="section-padding bg-slate-50/60">
          <div className="container-premium grid gap-8 md:grid-cols-3" aria-busy="true" aria-label="Memuat berita">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-3xl bg-slate-200" />
            ))}
          </div>
        </section>
      </>
    );
  }

  const [featured, ...rest] = beritaList;

  return (
    <>
      {hero}

      {!featured ? (
        <section className="section-padding bg-slate-50/60">
          <div className="container-premium">
            <div className="mx-auto max-w-md rounded-[2rem] bg-white p-10 text-center shadow-card">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-gold">
                <Newspaper className="h-7 w-7" aria-hidden />
              </span>
              <h2 className="mt-6 text-2xl font-bold text-navy">Belum Ada Berita</h2>
              <p className="mt-3 text-slate-500">
                Berita dan pengumuman akan ditampilkan di sini. Tunggu update terbaru dari kami!
              </p>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* berita terbaru */}
          <section className="section-padding bg-white">
            <div className="container-premium">
              <Reveal className="group grid overflow-hidden rounded-[2rem] bg-white shadow-card transition-shadow duration-500 hover:shadow-card-hover md:grid-cols-2">
                <div className="relative min-h-[18rem] overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-gold px-4 py-1.5 text-xs font-bold text-navy">Terbaru</span>
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gold" aria-hidden />
                      {featured.date}
                    </span>
                    <span className="rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white">{featured.category}</span>
                  </div>
                  <h2 className="mt-5 text-3xl font-bold leading-tight text-navy md:text-4xl">{featured.title}</h2>
                  <p className="mt-4 leading-relaxed text-slate-500">{featured.excerpt}</p>
                  <div className="mt-8 flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 text-sm text-slate-500">
                      <UserRound className="h-4 w-4 text-gold" aria-hidden />
                      {featured.author}
                    </span>
                    <Link
                      href={`/berita/${featured.id}`}
                      className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-navy-800"
                    >
                      Baca Selengkapnya
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {rest.length > 0 && (
            <section className="section-padding bg-slate-50/60">
              <div className="container-premium">
                <div className="mx-auto mb-16 max-w-2xl text-center">
                  <Reveal>
                    <SectionLabel>Arsip</SectionLabel>
                  </Reveal>
                  <GradientHeading className="mt-5">Berita Lainnya</GradientHeading>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((news, index) => (
                    <motion.article
                      key={news.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={VIEWPORT}
                      transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.15 }}
                      whileHover={{ y: -8 }}
                      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-shadow duration-500 hover:shadow-card-hover"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={news.image}
                          alt={news.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
                        />
                        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-navy backdrop-blur">
                          {news.category}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-7">
                        <p className="mb-3 flex items-center gap-2 text-sm text-slate-500">
                          <Clock className="h-4 w-4 text-gold" aria-hidden />
                          {news.date}
                        </p>
                        <h3 className="mb-3 line-clamp-2 text-xl font-bold leading-snug text-navy transition-colors duration-300 group-hover:text-gold-dark">
                          <Link href={`/berita/${news.id}`} className="after:absolute after:inset-0">
                            {news.title}
                          </Link>
                        </h3>
                        <p className="line-clamp-2 text-slate-500">{news.excerpt}</p>
                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy">
                          Baca selengkapnya
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
