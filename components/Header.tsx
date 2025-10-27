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
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-primary text-white p-2 rounded-lg group-hover:bg-blue-600 transition-colors">
              <FaGraduationCap size={32} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-primary">PKBM SWASTIKA</h1>
              <p className="text-xs text-gray-600 hidden md:block">Pusat Kegiatan Belajar Masyarakat</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-gray-700 hover:text-primary font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-700 hover:text-primary"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="block py-2 text-gray-700 hover:text-primary hover:bg-gray-50 px-4 rounded transition-colors"
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
