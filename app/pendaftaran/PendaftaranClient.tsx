"use client";

import { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { FaCheckCircle, FaFileAlt, FaUserCheck, FaWhatsapp, FaEnvelope, FaSpinner } from "react-icons/fa";

export default function PendaftaranClient() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    paket: "",
    alamat: "",
    tanggalLahir: "",
    pendidikanTerakhir: "",
    pekerjaan: "",
    motivasi: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Map data form ke format kolom Google Sheet
      const sheetData = {
        timestamp: new Date().toISOString(),
        nama_lengkap: formData.nama,
        email: formData.email,
        nomor_telepon: formData.telepon,
        tanggal_lahir: formData.tanggalLahir,
        program_pendidikan: formData.paket,
        pendidikan_terakhir: formData.pendidikanTerakhir,
        alamat_lengkap: formData.alamat,
        motivasi_program: formData.motivasi,
        status_verifikasi: "Menunggu",
        catatan_admin: ""
      };

      // Kirim data ke Google Sheets via Sheet.best
      await axios.post(process.env.NEXT_PUBLIC_SHEET_BEST_URL!, sheetData);

      // Kirim email notifikasi via EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          ...formData,
          to_email: formData.email,
          admin_email: "admin@pkbm-swastika.com"
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Terjadi kesalahan saat mengirim data. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10 md:p-12 text-center border border-green-100">
            <div className="relative mb-8">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-100 rounded-full opacity-50 blur-2xl"></div>
              <FaCheckCircle className="text-green-500 text-7xl mx-auto relative z-10 drop-shadow-lg" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Pendaftaran Berhasil!</h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Terima kasih telah mendaftar di PKBM SWASTIKA. Kami akan menghubungi Anda dalam 1-2 hari kerja untuk proses selanjutnya.
            </p>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200">
                <p className="text-green-800 font-bold text-xl mb-4">Langkah Selanjutnya:</p>
                <ul className="text-green-700 text-left mt-4 space-y-3 max-w-md mx-auto text-lg">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>Verifikasi data oleh tim kami</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>Pembayaran biaya pendaftaran</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>Pengumuman kelas dan jadwal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>Mulai mengikuti kegiatan belajar</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a
                  href="https://api.whatsapp.com/send?phone=6285104755189&text=Halo%20PKBM%20SWASTIKA,%20saya%20sudah%20mendaftar%20online"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <FaWhatsapp className="mr-2 text-xl" />
                  Hubungi via WhatsApp
                </a>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Daftar Lagi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header with Modern Design */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-32 h-32 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute top-10 right-1/4 w-24 h-24 bg-purple-100 rounded-full opacity-50 blur-2xl"></div>
          <div className="relative">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
              Formulir Pendaftaran
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Pendaftaran Online
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Daftar sekarang dan bergabunglah dengan program pendidikan nonformal PKBM SWASTIKA
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            {/* Personal Information */}
            <div className="mb-10">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <FaUserCheck className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Data Pribadi</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">Nama Lengkap *</label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 group-hover:border-gray-300"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div className="group">
                  <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 group-hover:border-gray-300"
                    placeholder="contoh@email.com"
                  />
                </div>
                <div className="group">
                  <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">Nomor Telepon *</label>
                  <input
                    type="tel"
                    name="telepon"
                    value={formData.telepon}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 group-hover:border-gray-300"
                    placeholder="6285104755189"
                  />
                </div>
                <div className="group">
                  <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">Tanggal Lahir *</label>
                  <input
                    type="date"
                    name="tanggalLahir"
                    value={formData.tanggalLahir}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 group-hover:border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Program Selection */}
            <div className="mb-10">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <FaFileAlt className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Pilihan Program</h2>
              </div>
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">Program Pendidikan *</label>
                <select
                  name="paket"
                  value={formData.paket}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 group-hover:border-gray-300 bg-white"
                >
                  <option value="">Pilih Program</option>
                  <option value="paket-a">Paket A (Setara SD/MI)</option>
                  <option value="paket-b">Paket B (Setara SMP/MTs)</option>
                  <option value="paket-c">Paket C (Setara SMA/MA)</option>
                </select>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-10">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <FaFileAlt className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Informasi Tambahan</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">Pendidikan Terakhir</label>
                  <select
                    name="pendidikanTerakhir"
                    value={formData.pendidikanTerakhir}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 group-hover:border-gray-300 bg-white"
                  >
                    <option value="">Pilih Pendidikan</option>
                    <option value="belum-sekolah">Belum Sekolah</option>
                    <option value="sd">SD/MI</option>
                    <option value="smp">SMP/MTs</option>
                    <option value="sma">SMA/MA/SMK</option>
                    <option value="diploma">Diploma</option>
                    <option value="sarjana">Sarjana</option>
                  </select>
                </div>
                <div className="group">
                  <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">Pekerjaan</label>
                  <input
                    type="text"
                    name="pekerjaan"
                    value={formData.pekerjaan}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 group-hover:border-gray-300"
                    placeholder="Pekerjaan saat ini"
                  />
                </div>
              </div>
              <div className="mt-6 group">
                <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">Alamat Lengkap *</label>
                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 group-hover:border-gray-300 resize-none"
                  placeholder="Masukkan alamat lengkap"
                />
              </div>
              <div className="mt-6 group">
                <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">Motivasi Mengikuti Program</label>
                <textarea
                  name="motivasi"
                  value={formData.motivasi}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 group-hover:border-gray-300 resize-none"
                  placeholder="Ceritakan motivasi Anda mengikuti program pendidikan di PKBM SWASTIKA"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-8 p-5 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl">
                <p className="text-red-800 font-bold text-lg mb-1">Error:</p>
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className={`font-bold py-5 px-12 rounded-2xl text-lg transition-all duration-300 transform shadow-xl ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 hover:shadow-2xl"
                } text-white`}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2 inline" />
                    Mengirim...
                  </>
                ) : (
                  "Daftar Sekarang"
                )}
              </button>
              <p className="text-gray-500 text-sm mt-5 max-w-md mx-auto">
                Dengan mengklik "Daftar Sekarang", Anda menyetujui syarat dan ketentuan yang berlaku.
              </p>
            </div>
          </form>

          {/* Contact Information */}
          <div className="mt-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-10 text-center border border-blue-100 shadow-xl">
            <div className="inline-block p-4 bg-white rounded-2xl shadow-lg mb-6">
              <span className="text-4xl">💬</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Butuh Bantuan?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
              Jika Anda memiliki pertanyaan tentang pendaftaran atau program kami, jangan ragu untuk menghubungi kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/6285104755189?text=Halo%20PKBM%20SWASTIKA,%20saya%20ingin%20bertanya%20tentang%20pendaftaran"
                className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <FaWhatsapp className="mr-2 text-xl" />
                WhatsApp
              </a>
              <a
                href="mailto:info@pkbm-swastika.com"
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <FaEnvelope className="mr-2 text-xl" />
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}