"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaNewspaper,
  FaSignOutAlt,
  FaTimes,
  FaImage,
} from "react-icons/fa";

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

export default function AdminBeritaPage() {
  const router = useRouter();
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "Admin PKBM",
    category: "Pengumuman",
    image: "",
  });
  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editMode ? `/api/berita/${currentId}` : "/api/berita";
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
        fetchBerita();
      }
    } catch (error) {
      alert("Gagal menyimpan berita");
    }
  };

  const handleEdit = (berita: Berita) => {
    setEditMode(true);
    setCurrentId(berita.id);
    setFormData({
      title: berita.title,
      excerpt: berita.excerpt,
      content: berita.content,
      author: berita.author,
      category: berita.category,
      image: berita.image,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus berita ini?")) return;

    try {
      const response = await fetch(`/api/berita/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        fetchBerita();
      }
    } catch (error) {
      alert("Gagal menghapus berita");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "Admin PKBM",
      category: "Pengumuman",
      image: "",
    });
    setEditMode(false);
    setCurrentId("");
    setUploadedImage("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Hanya file gambar yang diperbolehkan!");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB!");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUploadedImage(data.url);
        setFormData((prev) => ({ ...prev, image: data.url }));
        alert("Gambar berhasil diupload!");
      } else {
        alert(data.message || "Gagal upload gambar");
      }
    } catch (error) {
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
            <FaNewspaper className="text-blue-600 text-2xl" />
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Dashboard - Berita
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
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
            <span>Tambah Berita Baru</span>
          </button>
        </div>

        {/* Berita List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Judul</th>
                  <th className="px-6 py-4 text-left">Kategori</th>
                  <th className="px-6 py-4 text-left">Penulis</th>
                  <th className="px-6 py-4 text-left">Tanggal</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {beritaList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      Belum ada berita. Tambahkan berita pertama Anda!
                    </td>
                  </tr>
                ) : (
                  beritaList.map((berita) => (
                    <tr
                      key={berita.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800 line-clamp-2">
                          {berita.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {berita.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{berita.author}</td>
                      <td className="px-6 py-4 text-gray-600">{berita.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(berita)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(berita.id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between sticky top-0 z-10">
              <h2 className="text-2xl font-bold">
                {editMode ? "Edit Berita" : "Tambah Berita Baru"}
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
                  Judul Berita *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  placeholder="Masukkan judul berita"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
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
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Prestasi">Prestasi</option>
                    <option value="Kegiatan">Kegiatan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Penulis *
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Ringkasan Berita *
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  rows={3}
                  placeholder="Ringkasan singkat berita (maks. 200 karakter)"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Isi Berita Lengkap *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  rows={8}
                  placeholder="Tulis isi berita lengkap di sini..."
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Gambar Berita
                </label>
                
                {/* Upload from Computer */}
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-2">
                    📤 Upload dari Komputer
                  </label>
                  <div className="flex items-center space-x-3">
                    <label className="flex-1 cursor-pointer">
                      <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 hover:border-blue-500 transition-colors text-center bg-blue-50">
                        <FaImage className="text-blue-500 text-2xl mx-auto mb-2" />
                        <span className="text-sm text-gray-600">
                          {uploading ? "Mengupload..." : "Klik untuk pilih gambar"}
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
                </div>

                {/* Preview Uploaded Image */}
                {uploadedImage && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700 mb-2 font-semibold">
                      ✅ Gambar berhasil diupload!
                    </p>
                    <img
                      src={uploadedImage}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Or use URL */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    🔗 Atau gunakan URL Gambar
                  </label>
                  <div className="flex items-center space-x-2">
                    <FaImage className="text-gray-400" />
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                      placeholder="https://images.unsplash.com/photo-xxxx..."
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Atau paste URL dari Unsplash, Pexels, dll
                  </p>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105"
                >
                  {editMode ? "Update Berita" : "Simpan Berita"}
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
