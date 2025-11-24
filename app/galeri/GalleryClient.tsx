"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";

// Sample gallery data
const galleryItems = [
  { id: 1, title: "Diskusi Kegiatan Belajar Paket C", category: "belajar", image: "/images/diskusi.jpg"},
  { id: 2, title: "Pelatihan Pembuatan Jamu Tradisional", category: "pelatihan", image: "/images/jamu.jpeg" },
  { id: 3, title: "Kegiatan di Pondok Belajar", category: "belajar", image: "/images/pondok.jpg" },
  { id: 4, title: "Rapat dan Workshop Kewirausahaan", category: "pelatihan", image: "/images/rapat.jpg" },
  { id: 5, title: "Pembuatan Salad pada Kelas Tata Boga", category: "belajar", image: "/images/visit.jpg" },
  { id: 6, title: "Senam Pagi dalam Kegiatan Akreditasi", category: "acara", image: "/images/coba.jpg" },
  { id: 7, title: "Penerimaan Penghargaan Juara Lomba", category: "juara", image: "/images/juara.jpg" },
  { id: 8, title: "Wisuda Peserta Didik", category: "acara", image: "/images/kelas.jpeg" },
  { id: 9, title: "Workshop Pembelajaran", category: "pelatihan", image: "/images/workshop.jpg" },
  { id: 10, title: "Pelatihan Kerajinan Tangan", category: "pelatihan", image: "/images/upk.jpg" },
  { id: 11, title: "Kunjungan Dinas Pendidikan", category: "acara", image: "/images/upk2.jpg" },
  { id: 12, title: "Fasilitas Lab Komputer untuk Ujian", category: "fasilitas", image: "/images/ujian.jpg" }
];

const categories = [
  { id: "all", name: "Semua", icon: "📸" },
  { id: "belajar", name: "Belajar", icon: "📚" },
  { id: "pelatihan", name: "Pelatihan", icon: "🛠️" },
  { id: "acara", name: "Acara", icon: "🎉" },
  { id: "juara", name: "Pencapaian", icon: "🏆" },
  { id: "fasilitas", name: "Fasilitas", icon: "🏢" }
];

export default function GalleryClient() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredItems = selectedCategory === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const selectedItem = selectedImage !== null ? galleryItems.find(item => item.id === selectedImage) : null;

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat galeri...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Galeri Kegiatan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dokumentasi kegiatan belajar, pelatihan, workshop, dan berbagai acara di PKBM SWASTIKA
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                selectedCategory === category.id
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => setSelectedImage(item.id)}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4">
                      <span className="text-2xl">🔍</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-center">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full bg-white rounded-xl overflow-hidden">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-opacity-30 transition-all"
              >
                <FaTimes size={24} />
              </button>
              <div className="relative h-[80vh] w-full">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-gray-800 text-center">{selectedItem.title}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}