"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCalendar, FaUser } from "react-icons/fa";

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat berita...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Berita & Pengumuman</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Informasi terkini seputar kegiatan, pengumuman, dan prestasi PKBM SWASTIKA
          </p>
        </div>
      </section>

      {beritaList.length === 0 ? (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">📰</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Belum Ada Berita
              </h2>
              <p className="text-gray-600">
                Berita dan pengumuman akan ditampilkan di sini. Tunggu update terbaru dari kami!
              </p>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Featured News */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-100 hover:shadow-3xl transition-shadow">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-auto">
                      <Image
                        src={beritaList[0].image}
                        alt={beritaList[0].title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold">
                          Terbaru
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center">
                          <FaCalendar className="mr-2" />
                          {beritaList[0].date}
                        </span>
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-xs">
                          {beritaList[0].category}
                        </span>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        {beritaList[0].title}
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {beritaList[0].excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-sm text-gray-600">
                          <FaUser className="mr-2" />
                          {beritaList[0].author}
                        </span>
                        <Link
                          href={`/berita/${beritaList[0].id}`}
                          className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all"
                        >
                          Baca Selengkapnya
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* All News */}
          {beritaList.length > 1 && (
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                  Berita Lainnya
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  {beritaList.slice(1).map((news) => (
                    <div
                      key={news.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-[1.02] border border-gray-100"
                    >
                      <div className="relative h-48">
                        <Image
                          src={news.image}
                          alt={news.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 right-4 z-10">
                          <span className="bg-white text-primary px-3 py-1 rounded-full text-xs font-semibold">
                            {news.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center space-x-3 text-xs text-gray-600 mb-3">
                          <span className="flex items-center">
                            <FaCalendar className="mr-1" />
                            {news.date}
                          </span>
                          <span className="flex items-center">
                            <FaUser className="mr-1" />
                            {news.author}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                          {news.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {news.excerpt}
                        </p>
                        <Link
                          href={`/berita/${news.id}`}
                          className="text-primary hover:text-blue-600 font-semibold text-sm inline-flex items-center"
                        >
                          Baca Selengkapnya →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Announcement Banner */}
      <section className="py-12 bg-gradient-to-r from-secondary to-orange-600">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              📢 Pendaftaran Peserta Didik Baru Dibuka!
            </h2>
            <p className="text-lg mb-6">
              Daftar sekarang dan raih kesempatan mendapatkan pendidikan berkualitas
            </p>
            <Link
              href="/pendaftaran"
              className="inline-block bg-white hover:bg-gray-100 text-secondary font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
