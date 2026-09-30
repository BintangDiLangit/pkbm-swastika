"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useLenis } from "lenis/react";
import { Mail, Menu, MessageCircle, X } from "lucide-react";
import { Logo } from "../ui/Logo";
import { EASE } from "@/lib/motion";
import { formatWhatsapp, fullAddress, primaryEmail, siteConfig, whatsappLink } from "@/lib/site";


export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const lenis = useLenis();
  const isHome = pathname === "/";

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 50));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // kunci scroll halaman selama menu layar penuh terbuka
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // di beranda header transparan di atas foto hero; di halaman lain selalu navy
  const solid = (scrolled || !isHome) && !open;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className={`fixed top-0 z-50 w-full transition-[background-color,box-shadow,padding] duration-300 ${
          solid ? "bg-navy py-3 shadow-lg shadow-navy/20" : "bg-transparent py-5"
        }`}
      >
        <nav className="container-premium flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3" aria-label="PKBM Swastika beranda">
            <Logo priority className="transition-transform duration-500 group-hover:scale-105" />
            <span className="leading-tight">
              <span className="block font-heading text-lg font-bold tracking-wide text-white">PKBM Swastika</span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.25em] text-gold">
                Pendidikan untuk Semua
              </span>
            </span>
          </Link>

          <motion.button
            type="button"
            onClick={() => setOpen((v) => !v)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-navy shadow-lg shadow-black/10"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>

      {/* halaman selain beranda tidak punya hero penuh, jadi beri ruang di bawah header tetap */}
      {!isHome && <div aria-hidden className="h-[72px]" />}

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigasi situs"
            data-lenis-prevent
            initial={{ clipPath: "circle(0% at 100% 0%)", opacity: 0.6 }}
            animate={{ clipPath: "circle(150% at 100% 0%)", opacity: 1 }}
            exit={{ clipPath: "circle(0% at 100% 0%)", opacity: 0.6 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="fixed inset-0 z-40 overflow-y-auto bg-navy"
          >
            <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-gold/10 blur-3xl" />

            <div className="container-premium relative flex min-h-full flex-col justify-center gap-12 pb-12 pt-32 lg:flex-row lg:items-center lg:justify-between">
              <ul className="space-y-2 md:space-y-3">
                {siteConfig.nav.map((item, i) => (
                  <li key={item.path} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.25 + i * 0.07 }}
                    >
                      <Link
                        href={item.path}
                        onClick={() => setOpen(false)}
                        className={`group flex items-baseline gap-4 font-heading text-[clamp(2.25rem,7vw,4.5rem)] font-bold leading-[1.1] transition-colors duration-300 hover:text-gold ${
                          pathname === item.path ? "text-gold" : "text-white"
                        }`}
                      >
                        <span className="w-7 shrink-0 text-sm font-medium text-gold/70">0{i + 1}</span>
                        {item.name}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
                className="max-w-sm space-y-6 border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Hubungi Kami</p>
                <p className="text-white/70">{fullAddress}</p>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-gold"
                >
                  <MessageCircle className="h-4 w-4 text-gold" /> {formatWhatsapp()}
                </a>
                <a href={`mailto:${primaryEmail}`} className="flex items-center gap-3 text-white hover:text-gold">
                  <Mail className="h-4 w-4 text-gold" /> {primaryEmail}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
