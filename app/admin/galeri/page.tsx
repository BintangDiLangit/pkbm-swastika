"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaImage,
  FaSignOutAlt,
  FaTimes,
  FaImages,
} from "react-icons/fa";

interface GaleriItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

const categories = [
  { id: "belajar", name: "Belajar", icon: "📚" },
  { id: "pelatihan", name: "Pelatihan", icon: "🛠️" },
  { id: "acara", name: "Acara", icon: "🎉" },
  { id: "juara", name: "Pencapaian", icon: "🏆" },
  { id: "fasilitas", name: "Fasilitas", icon: "🏢" },
];

export default function AdminGaleriPage() {
  const router = useRouter();
  const [galeriList, setGaleriList] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "belajar",
    image: "",
  });
  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");

  useEffect(() => {
    fetchGaleri();
  }, []);

  const fetchGaleri = async () => {
    try {
      const response = await fetch("/api/galeri");
      const data = await response.json();
      if (data.success) {
        setGaleriList(data.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data galeri:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Foto harus diupload atau URL gambar harus diisi!");
      return;
    }

    try {
      const url = editMode ? `/api/galeri/${currentId}` : "/api/galeri";
      const method = editMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        setShowModal(false);
        resetForm();
        fetchGaleri();
      }
    } catch (error) {
      alert("Gagal menyimpan foto");
    }
  };

  const handleEdit = (item: GaleriItem) => {
    setEditMode(true);
    setCurrentId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      image: item.image,
    });
    setUploadedImage(item.image);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus foto ini?")) return;

    try {
      const response = await fetch(`/api/galeri/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        fetchGaleri();
      }
    } catch (error) {
      alert("Gagal menghapus foto");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "belajar",
      image: "",
    });
    setEditMode(false);
    setCurrentId("");
    setUploadedImage("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("File selected:", file.name, file.type, file.size);

    if (!file.type.startsWith("image/")) {
      alert("Hanya file gambar yang diperbolehkan!");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB!");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      console.log("Uploading to /api/upload...");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Upload response:", data);

      if (data.success) {
        console.log("Image URL:", data.url);
        setUploadedImage(data.url);
        setFormData((prev) => ({ ...prev, image: data.url }));
        // Alert removed - preview akan langsung muncul
      } else {
        console.error("Upload failed:", data.message);
        alert(data.message || "Gagal upload gambar");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Gagal upload gambar");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FaImages className="text-purple-600 text-2xl" />
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Dashboard - Galeri
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="/admin"
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              🏠 Dashboard
            </a>
            <a
              href="/admin/berita"
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              📰 Kelola Berita
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Add Button */}
        <div className="mb-6">
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg flex items-center space-x-2 transition-all transform hover:scale-105"
          >
            <FaPlus />
            <span>Tambah Foto Baru</span>
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galeriList.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <FaImages className="text-gray-300 text-6xl mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                Belum ada foto. Tambahkan foto pertama Anda!
              </p>
            </div>
          ) : (
            galeriList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="14" dy="100" dx="50" text-anchor="middle"%3EGambar Error%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {categories.find((c) => c.id === item.category)?.icon}{" "}
                    {categories.find((c) => c.id === item.category)?.name}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-1"
                    >
                      <FaEdit />
                      <span className="text-sm">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-1"
                    >
                      <FaTrash />
                      <span className="text-sm">Hapus</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between sticky top-0 z-10">
              <h2 className="text-2xl font-bold">
                {editMode ? "Edit Foto" : "Tambah Foto Baru"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Judul/Deskripsi Foto *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  placeholder="Contoh: Kegiatan Belajar Paket C"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Kategori *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Upload Foto *
                </label>

                {/* Upload from Computer */}
                <div className="mb-4">
                  <label className="flex-1 cursor-pointer">
                    <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 hover:border-blue-500 transition-colors text-center bg-blue-50">
                      <FaImage className="text-blue-500 text-3xl mx-auto mb-2" />
                      <span className="text-sm text-gray-600 block">
                        {uploading ? "Mengupload..." : "📤 Klik untuk pilih foto dari komputer"}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG, GIF, WebP (Max 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Preview */}
                {formData.image && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700 mb-2 font-semibold">
                      ✅ Preview Foto:
                    </p>
                    <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105"
                >
                  {editMode ? "Update Foto" : "Simpan Foto"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition-colors"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
