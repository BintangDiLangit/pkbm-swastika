"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes, FaGraduationCap } from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Beranda", path: "/" },
    { name: "Tentang Kami", path: "/tentang" },
    { name: "Program", path: "/program" },
    { name: "Pendaftaran", path: "/pendaftaran" },
    { name: "Galeri", path: "/galeri" },
    { name: "Berita", path: "/berita" },
    { name: "Kontak", path: "/kontak" },
  ];

  return (
    <header className="bg-blue-600 shadow-lg sticky top-0 z-50">
      <div className="px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-2xl group-hover:bg-white/30 transition-all border-2 border-white/30">
              <FaGraduationCap size={32} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">PKBM SWASTIKA</h1>
              <p className="text-xs text-blue-100 hidden md:block">Pusat Kegiatan Belajar Masyarakat</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-white/90 hover:text-white hover:bg-white/20 font-semibold px-4 py-2 rounded-xl transition-all"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white hover:bg-white/20 p-2 rounded-lg transition-all"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="block py-3 text-white hover:bg-white/20 px-4 rounded-xl transition-all font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
