"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";

interface GaleriItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

const categories = [
  { id: "all", name: "Semua", icon: "📸" },
  { id: "belajar", name: "Belajar", icon: "📚" },
  { id: "pelatihan", name: "Pelatihan", icon: "🛠️" },
  { id: "acara", name: "Acara", icon: "🎉" },
  { id: "juara", name: "Pencapaian", icon: "🏆" },
  { id: "fasilitas", name: "Fasilitas", icon: "🏢" }
];

export default function GalleryClient() {
  const [galleryItems, setGalleryItems] = useState<GaleriItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGaleri();
  }, []);

  const fetchGaleri = async () => {
    try {
      const response = await fetch("/api/galeri");
      const data = await response.json();
      if (data.success) {
        setGalleryItems(data.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data galeri:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = selectedCategory === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const selectedItem = selectedImage !== null ? galleryItems.find(item => item.id === selectedImage) : null;

  if (loading) {
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

  if (galleryItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Galeri Kegiatan</h1>
            <div className="text-6xl mb-4">📸</div>
            <p className="text-xl text-gray-600">
              Galeri foto akan segera hadir. Tunggu update dari kami!
            </p>
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
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-contain"
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