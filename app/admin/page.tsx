"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaNewspaper, FaImages, FaUsers, FaChartLine, FaSignOutAlt } from "react-icons/fa";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    berita: 0,
    galeri: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [beritaRes, galeriRes] = await Promise.all([
        fetch("/api/berita"),
        fetch("/api/galeri"),
      ]);

      const beritaData = await beritaRes.json();
      const galeriData = await galeriRes.json();

      setStats({
        berita: beritaData.success ? beritaData.data.length : 0,
        galeri: galeriData.success ? galeriData.data.length : 0,
      });
    } catch (error) {
      console.error("Gagal mengambil statistik:", error);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const menuItems = [
    {
      title: "Kelola Berita",
      description: "Tambah, edit, dan hapus berita & pengumuman",
      icon: FaNewspaper,
      color: "from-blue-500 to-blue-600",
      count: stats.berita,
      link: "/admin/berita",
    },
    {
      title: "Kelola Galeri",
      description: "Upload dan atur foto kegiatan",
      icon: FaImages,
      color: "from-purple-500 to-purple-600",
      count: stats.galeri,
      link: "/admin/galeri",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
              <p className="text-gray-600 mt-1">PKBM SWASTIKA</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              <FaSignOutAlt />
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl p-8 mb-12">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
              <FaUsers className="text-4xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Selamat Datang, Admin!</h2>
              <p className="text-blue-100 text-lg">
                Kelola konten website PKBM SWASTIKA dengan mudah
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-semibold mb-1">Total Berita</p>
                <p className="text-4xl font-bold text-blue-600">{stats.berita}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-xl">
                <FaNewspaper className="text-blue-600 text-3xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-semibold mb-1">Total Foto Galeri</p>
                <p className="text-4xl font-bold text-purple-600">{stats.galeri}</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-xl">
                <FaImages className="text-purple-600 text-3xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Menu Cards */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaChartLine className="mr-3 text-blue-600" />
            Menu Kelola Konten
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => router.push(item.link)}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105"
              >
                <div className={`bg-gradient-to-r ${item.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <item.icon className="text-5xl" />
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      <span className="text-2xl font-bold">{item.count}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/90">{item.description}</p>
                </div>
                <div className="p-6 bg-gray-50">
                  <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-lg transition-all border-2 border-gray-200 group-hover:border-gray-300">
                    Buka Dashboard →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => router.push("/admin/berita")}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-md flex items-center justify-center space-x-3"
            >
              <FaNewspaper className="text-2xl" />
              <span>Tambah Berita Baru</span>
            </button>
            <button
              onClick={() => router.push("/admin/galeri")}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-md flex items-center justify-center space-x-3"
            >
              <FaImages className="text-2xl" />
              <span>Upload Foto Galeri</span>
            </button>
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            Dashboard Admin PKBM SWASTIKA - Powered by Next.js 15
          </p>
        </div>
      </div>
    </div>
  );
}
