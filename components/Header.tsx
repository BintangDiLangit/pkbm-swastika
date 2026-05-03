"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaGraduationCap, FaArrowRight } from "react-icons/fa";

const menuItems = [
  { name: "Beranda", path: "/" },
  { name: "Tentang", path: "/tentang" },
  { name: "Program", path: "/program" },
  { name: "Galeri", path: "/galeri" },
  { name: "Berita", path: "/berita" },
  { name: "Kontak", path: "/kontak" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-soft"
          : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between py-3.5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-700 to-primary-800 text-white shadow-soft">
              <FaGraduationCap size={20} />
            </div>
            <div className="leading-tight">
              <div className="text-base font-bold text-ink">PKBM Swastika</div>
              <div className="hidden text-[11px] font-medium text-ink-soft sm:block">
                Pendidikan untuk semua
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {menuItems.map((item) => {
              const active = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-primary-50 text-primary-700"
                      : "text-ink-muted hover:bg-soft-100 hover:text-ink"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/pendaftaran"
              className="hidden items-center gap-2 rounded-2xl bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-primary-800 sm:inline-flex"
            >
              Daftar
              <FaArrowRight className="text-xs" />
            </Link>

            <button
              onClick={() => setOpen((s) => !s)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-ink hover:bg-soft-100 lg:hidden"
              aria-label={open ? "Tutup menu" : "Buka menu"}
            >
              {open ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="border-t border-soft-200 py-3 lg:hidden">
            <div className="flex flex-col gap-1">
              {menuItems.map((item) => {
                const active = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-primary-50 text-primary-700"
                        : "text-ink hover:bg-soft-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link
                href="/pendaftaran"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-primary-700 px-4 py-3 text-sm font-semibold text-white"
              >
                Daftar Sekarang
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
