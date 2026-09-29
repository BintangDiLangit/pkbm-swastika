"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Camera, RotateCcw, X, ZoomIn } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { EASE, VIEWPORT } from "@/lib/motion";

interface GaleriItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

const categories = [
  { id: "all", name: "Semua" },
  { id: "belajar", name: "Belajar" },
  { id: "pelatihan", name: "Pelatihan" },
  { id: "acara", name: "Acara" },
  { id: "juara", name: "Pencapaian" },
  { id: "fasilitas", name: "Fasilitas" },
];

// Batas waktu request galeri. Tanpa ini, koneksi DB/proxy yang menggantung
// membuat spinner "Memuat galeri..." berputar selamanya.
const FETCH_TIMEOUT_MS = 10000;

type Status = "loading" | "error" | "ready";

function GalleryShell({ children }: { children: ReactNode }) {
  return (
    <>
      <PageHero
        label="Galeri"
        title="Galeri"
        highlight="Kegiatan"
        description="Dokumentasi kegiatan belajar, pelatihan, workshop, dan berbagai acara di PKBM SWASTIKA."
        image="/images/workshop.jpg"
      />
      <section className="section-padding min-h-[60vh] bg-slate-50/60">
        <div className="container-premium">{children}</div>
      </section>
    </>
  );
}

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Memuat galeri">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="aspect-[4/3] animate-pulse rounded-3xl bg-slate-200" />
      ))}
    </div>
  );
}

function StateCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-md rounded-[2rem] bg-white p-10 text-center shadow-card">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-gold">{icon}</span>
      <h2 className="mt-6 text-2xl font-bold text-navy">{title}</h2>
      {children}
    </div>
  );
}

export default function GalleryClient() {
  const [galleryItems, setGalleryItems] = useState<GaleriItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchGaleri = useCallback(async (signal?: AbortSignal) => {
    setStatus("loading");
    const controller = new AbortController();
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, FETCH_TIMEOUT_MS);
    signal?.addEventListener("abort", () => controller.abort());

    try {
      const response = await fetch("/api/galeri", { signal: controller.signal, cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Server merespon dengan status ${response.status}`);
      }
      const data = await response.json();
      if (!data.success || !Array.isArray(data.data)) {
        throw new Error(data.message || "Format data galeri tidak valid");
      }
      setGalleryItems(data.data);
      setStatus("ready");
    } catch (error) {
      // komponen sudah unmount — jangan update state
      if (signal?.aborted) return;
      console.error("Gagal mengambil data galeri:", error);
      setErrorMessage(
        timedOut
          ? "Server terlalu lama merespon. Periksa koneksi internet kamu lalu coba lagi."
          : "Terjadi kendala saat memuat galeri. Silakan coba beberapa saat lagi."
      );
      setStatus("error");
    } finally {
      clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchGaleri(controller.signal);
    return () => controller.abort();
  }, [fetchGaleri]);

  const filteredItems = selectedCategory === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const selectedItem = selectedImage !== null ? galleryItems.find(item => item.id === selectedImage) : null;

  if (status === "loading") {
    return (
      <GalleryShell>
        <GallerySkeleton />
      </GalleryShell>
    );
  }

  if (status === "error") {
    return (
      <GalleryShell>
        <div role="alert">
          <StateCard icon={<AlertTriangle className="h-7 w-7" />} title="Galeri gagal dimuat">
            <p className="mt-3 text-slate-500">{errorMessage}</p>
            <button
              onClick={() => fetchGaleri()}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-8 py-4 font-heading text-sm font-bold text-white shadow-lg shadow-navy/30 transition-colors hover:bg-navy-800"
            >
              <RotateCcw className="h-4 w-4" />
              Coba Lagi
            </button>
          </StateCard>
        </div>
      </GalleryShell>
    );
  }

  if (galleryItems.length === 0) {
    return (
      <GalleryShell>
        <StateCard icon={<Camera className="h-7 w-7" />} title="Belum ada foto">
          <p className="mt-3 text-slate-500">
            Dokumentasi kegiatan sedang kami siapkan. Sementara itu, lihat kabar terbaru kami di halaman berita.
          </p>
          <Link
            href="/berita"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 font-heading text-sm font-bold text-navy shadow-lg shadow-gold/30 transition-colors hover:bg-gold-light"
          >
            Lihat Berita &amp; Kegiatan
          </Link>
        </StateCard>
      </GalleryShell>
    );
  }

  return (
    <GalleryShell>
      {/* filter kategori */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {categories.map((category) => {
          const active = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              aria-pressed={active}
              className={`rounded-full px-6 py-3 font-heading text-sm font-semibold transition-colors duration-300 ${
                active
                  ? "bg-navy text-gold shadow-lg shadow-navy/20"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-gold hover:text-navy"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, i) => (
            <motion.button
              layout
              key={item.id}
              type="button"
              onClick={() => setSelectedImage(item.id)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.1 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-200 text-left shadow-card"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- URL galeri berasal dari admin (bisa domain apa saja) */}
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute right-5 top-5 flex h-11 w-11 scale-75 items-center justify-center rounded-full bg-gold text-navy opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                <ZoomIn className="h-5 w-5" aria-hidden />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-6 font-heading text-lg font-semibold text-white">{item.title}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title}
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/90 p-4 backdrop-blur-sm"
          >
            <motion.figure
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.5, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white"
            >
              <button
                onClick={() => setSelectedImage(null)}
                aria-label="Tutup"
                className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gold text-navy shadow-lg"
              >
                <X className="h-5 w-5" />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedItem.image} alt={selectedItem.title} className="max-h-[75vh] w-full bg-navy-950 object-contain" />
              <figcaption className="p-6 text-center font-heading text-xl font-bold text-navy">{selectedItem.title}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </GalleryShell>
  );
}
