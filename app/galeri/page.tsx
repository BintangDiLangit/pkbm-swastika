"use client";

import { useState } from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";

// Sample gallery data
const galleryItems = [
  { id: 1, title: "Kegiatan Belajar Paket C", category: "belajar", image: "/images/diskusi.jpg" },
  { id: 2, title: "Pelatihan Komputer", category: "pelatihan", image: "/images/jamu.jpeg" },
  { id: 3, title: "Ujian Nasional 2024", category: "ujian", image: "/images/pondok.jpg" },
  { id: 4, title: "Workshop Kewirausahaan", category: "pelatihan", image: "/images/rapat.jpg" },
  { id: 5, title: "Kelas Paket A", category: "belajar", image: "/images/salad.jpg" },
  { id: 6, title: "Akreditasi Lembaga", category: "akreditasi", image: "/images/senam.jpg" },
  { id: 7, title: "Kegiatan Tata Boga", category: "juara", image: "/images/juara.jpg" },
  { id: 8, title: "Wisuda Peserta Didik", category: "acara", image: "/images/kelas.jpeg" },
  { id: 9, title: "Pembelajaran IPA", category: "belajar", image: "/images/workshop.jpg" },
  { id: 10, title: "Pelatihan Kerajinan", category: "pelatihan", image: "/images/upk.jpg" },
  { id: 11, title: "Kunjungan Dinas Pendidikan", category: "acara", image: "/images/upk2.jpg" },
  { id: 12, title: "Lab Komputer", category: "fasilitas", image: "/images/ujian.jpg" },
];

const categories = [
  { name: "Semua", value: "all" },
  { name: "Kegiatan Belajar", value: "belajar" },
  { name: "Pelatihan", value: "pelatihan" },
  { name: "Pencapaian", value: "juara" },
  { name: "Acara", value: "acara" },
  { name: "Fasilitas", value: "fasilitas" },
];

export default function GaleriPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredItems = selectedCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => selectedCategory.split(',').includes(item.category));

  const handleImageClick = (id: number) => {
    setSelectedImage(id);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const selectedItem = galleryItems.find(item => item.id === selectedImage);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Galeri PKBM SWASTIKA</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Dokumentasi kegiatan pembelajaran, pelatihan, dan acara di PKBM SWASTIKA
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === cat.value
                    ? "bg-primary text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
                onClick={() => handleImageClick(item.id)}
              >
                <div className="relative w-full h-64">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">Tidak ada foto dalam kategori ini</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedImage && selectedItem && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={handleCloseModal}
          >
            <FaTimes size={32} />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-[600px]">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                className="object-contain rounded-xl"
              />
            </div>
            <div className="text-white text-center mt-4">
              <h3 className="text-2xl font-bold">{selectedItem.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
