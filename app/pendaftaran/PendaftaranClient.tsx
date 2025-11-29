"use client";

import { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import {
  FaCheckCircle,
  FaFileAlt,
  FaUserCheck,
  FaWhatsapp,
  FaEnvelope,
  FaSpinner,
} from "react-icons/fa";

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
    motivasi: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
        catatan_admin: "",
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
          admin_email: "admin@pkbm-swastika.com",
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
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Pendaftaran Berhasil!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Terima kasih telah mendaftar di PKBM SWASTIKA. Kami akan
              menghubungi Anda dalam 1-2 hari kerja untuk proses selanjutnya.
            </p>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800 font-semibold">
                  Langkah Selanjutnya:
                </p>
                <ul className="text-green-700 text-left mt-2 space-y-1">
                  <li>• Verifikasi data oleh tim kami</li>
                  <li>• Pembayaran biaya pendaftaran</li>
                  <li>• Pengumuman kelas dan jadwal</li>
                  <li>• Mulai mengikuti kegiatan belajar</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://api.whatsapp.com/send?phone=6285104755189&text=Halo%20PKBM%20SWASTIKA,%20saya%20sudah%20mendaftar%20online"
                  className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                >
                  <FaWhatsapp className="mr-2" />
                  Hubungi via WhatsApp
                </a>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all"
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
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Pendaftaran Online
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Daftar sekarang dan bergabunglah dengan program pendidikan nonformal
            PKBM SWASTIKA
          </p>
        </div>

        {/* Registration Form */}
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            {/* Personal Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaUserCheck className="mr-3 text-primary" />
                Data Pribadi
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="contoh@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Nomor Telepon *
                  </label>
                  <input
                    type="tel"
                    name="telepon"
                    value={formData.telepon}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="6285104755189"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Tanggal Lahir *
                  </label>
                  <input
                    type="date"
                    name="tanggalLahir"
                    value={formData.tanggalLahir}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Program Selection */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaFileAlt className="mr-3 text-primary" />
                Pilihan Program
              </h2>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Program Pendidikan *
                </label>
                <select
                  name="paket"
                  value={formData.paket}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Pilih Program</option>
                  <option value="paket-a">Paket A (Setara SD/MI)</option>
                  <option value="paket-b">Paket B (Setara SMP/MTs)</option>
                  <option value="paket-c">Paket C (Setara SMA/MA)</option>
                </select>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Informasi Tambahan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Pendidikan Terakhir
                  </label>
                  <select
                    name="pendidikanTerakhir"
                    value={formData.pendidikanTerakhir}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Pekerjaan
                  </label>
                  <input
                    type="text"
                    name="pekerjaan"
                    value={formData.pekerjaan}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Pekerjaan saat ini"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Alamat Lengkap *
                </label>
                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Masukkan alamat lengkap"
                />
              </div>
              <div className="mt-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Motivasi Mengikuti Program
                </label>
                <textarea
                  name="motivasi"
                  value={formData.motivasi}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ceritakan motivasi Anda mengikuti program pendidikan di PKBM SWASTIKA"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-semibold">Error:</p>
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`font-semibold py-4 px-8 rounded-lg text-lg transition-all transform shadow-lg ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-blue-600 hover:scale-105"
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
              <p className="text-gray-600 text-sm mt-4">
                Dengan mengklik "Daftar Sekarang", Anda menyetujui syarat dan
                ketentuan yang berlaku.
              </p>
            </div>
          </form>

          {/* Contact Information */}
          <div className="mt-12 bg-blue-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Butuh Bantuan?
            </h3>
            <p className="text-gray-600 mb-6">
              Jika Anda memiliki pertanyaan tentang pendaftaran atau program
              kami, jangan ragu untuk menghubungi kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/6285104755189?text=Halo%20PKBM%20SWASTIKA,%20saya%20ingin%20bertanya%20tentang%20pendaftaran"
                className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all"
              >
                <FaWhatsapp className="mr-2" />
                WhatsApp
              </a>
              <a
                href="mailto:info@pkbm-swastika.com"
                className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all"
              >
                <FaEnvelope className="mr-2" />
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
