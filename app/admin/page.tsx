"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaNewspaper,
  FaImages,
  FaBookOpen,
  FaChartBar,
  FaQuoteLeft,
  FaQuestion,
  FaUniversity,
  FaShieldAlt,
  FaLink,
  FaCog,
  FaUsers,
} from "react-icons/fa";
import { AdminShell } from "@/components/admin/AdminShell";

const tiles = [
  { label: "Berita", href: "/admin/berita", icon: FaNewspaper, key: "berita", color: "bg-primary-50 text-primary-700" },
  { label: "Galeri", href: "/admin/galeri", icon: FaImages, key: "galeri", color: "bg-accent-100 text-accent-600" },
  { label: "Program", href: "/admin/program", icon: FaBookOpen, key: "program", color: "bg-primary-50 text-primary-700" },
  { label: "Statistik Alumni", href: "/admin/stat", icon: FaChartBar, key: "stat", color: "bg-accent-100 text-accent-600" },
  { label: "Testimoni", href: "/admin/testimonial", icon: FaQuoteLeft, key: "testimonial", color: "bg-primary-50 text-primary-700" },
  { label: "FAQ", href: "/admin/faq", icon: FaQuestion, key: "faq", color: "bg-accent-100 text-accent-600" },
  { label: "Destinasi Alumni", href: "/admin/destination", icon: FaUniversity, key: "destination", color: "bg-primary-50 text-primary-700" },
  { label: "Akreditasi", href: "/admin/recognition", icon: FaShieldAlt, key: "recognition", color: "bg-accent-100 text-accent-600" },
  { label: "Quick Links", href: "/admin/quick-link", icon: FaLink, key: "quick-link", color: "bg-primary-50 text-primary-700" },
  { label: "Pengaturan Situs", href: "/admin/settings", icon: FaCog, key: "settings", color: "bg-accent-100 text-accent-600" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const endpoints = [
      ["berita", "/api/berita"],
      ["galeri", "/api/galeri"],
      ["program", "/api/program"],
      ["stat", "/api/stat"],
      ["testimonial", "/api/testimonial"],
      ["faq", "/api/faq"],
      ["destination", "/api/destination"],
      ["recognition", "/api/recognition"],
      ["quick-link", "/api/quick-link"],
    ] as const;

    Promise.all(
      endpoints.map(async ([k, url]) => {
        try {
          const res = await fetch(url);
          const j = await res.json();
          return [k, j.success ? (Array.isArray(j.data) ? j.data.length : 0) : 0] as const;
        } catch {
          return [k, 0] as const;
        }
      })
    ).then((results) => {
      const next: Record<string, number> = {};
      for (const [k, v] of results) next[k] = v;
      setCounts(next);
    });
  }, []);

  return (
    <AdminShell title="Dashboard">
      <div className="mb-8 rounded-3xl bg-gradient-to-br from-primary-700 to-primary-800 p-8 text-white shadow-glow">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <FaUsers className="text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Selamat datang, Admin!</h2>
            <p className="mt-1 text-sm text-white/80">
              Kelola seluruh konten landing page PKBM Swastika dari sini.
            </p>
          </div>
        </div>
      </div>

      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-ink-soft">
        Kelola Konten
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tiles.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group rounded-2xl border border-soft-200 bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
          >
            <div className="flex items-start justify-between">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${t.color}`}>
                <t.icon size={18} />
              </div>
              <span className="rounded-full bg-soft-100 px-3 py-1 text-xs font-bold text-ink-muted">
                {counts[t.key] ?? "—"}
              </span>
            </div>
            <h4 className="mt-4 text-base font-bold text-ink">{t.label}</h4>
            <p className="mt-1 text-xs text-ink-soft group-hover:text-primary-700">
              Buka pengelola →
            </p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
