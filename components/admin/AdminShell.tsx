"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaNewspaper,
  FaImages,
  FaSignOutAlt,
  FaHome,
  FaBookOpen,
  FaChartBar,
  FaQuoteLeft,
  FaQuestion,
  FaUniversity,
  FaShieldAlt,
  FaLink,
  FaCog,
  FaClipboardList,
} from "react-icons/fa";
import type { ReactNode } from "react";

const nav = [
  { label: "Dashboard", href: "/admin", icon: FaHome },
  { label: "Pendaftaran", href: "/admin/pendaftaran", icon: FaClipboardList },
  { label: "Berita", href: "/admin/berita", icon: FaNewspaper },
  { label: "Galeri", href: "/admin/galeri", icon: FaImages },
  { label: "Program", href: "/admin/program", icon: FaBookOpen },
  { label: "Statistik", href: "/admin/stat", icon: FaChartBar },
  { label: "Testimoni", href: "/admin/testimonial", icon: FaQuoteLeft },
  { label: "FAQ", href: "/admin/faq", icon: FaQuestion },
  { label: "Destinasi Alumni", href: "/admin/destination", icon: FaUniversity },
  { label: "Akreditasi", href: "/admin/recognition", icon: FaShieldAlt },
  { label: "Quick Links", href: "/admin/quick-link", icon: FaLink },
  { label: "Pengaturan", href: "/admin/settings", icon: FaCog },
];

export function AdminShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-soft-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-soft-200 bg-white lg:flex lg:flex-col">
        <div className="border-b border-soft-200 p-5">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-ink">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-700 text-white">PK</span>
            <span>Admin Panel</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          {nav.map((n) => {
            const active = pathname === n.href || (n.href !== "/admin" && pathname.startsWith(n.href));
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  active ? "bg-primary-50 text-primary-700" : "text-ink-muted hover:bg-soft-100 hover:text-ink"
                }`}
              >
                <n.icon className="text-base" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-soft-200 p-3">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-soft-200 bg-white/85 backdrop-blur">
          <div className="flex items-center justify-between px-5 py-4">
            <h1 className="text-lg font-bold text-ink">{title}</h1>
            <Link
              href="/"
              target="_blank"
              className="rounded-xl border border-soft-200 px-3 py-1.5 text-xs font-semibold text-ink-muted hover:border-primary-200 hover:text-primary-700"
            >
              Lihat Website ↗
            </Link>
          </div>
          {/* Mobile nav scroller */}
          <div className="flex gap-1 overflow-x-auto border-t border-soft-200 px-3 py-2 lg:hidden">
            {nav.map((n) => {
              const active = pathname === n.href || (n.href !== "/admin" && pathname.startsWith(n.href));
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`flex-shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold ${
                    active ? "bg-primary-700 text-white" : "bg-soft-100 text-ink-muted"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </div>
        </header>
        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
