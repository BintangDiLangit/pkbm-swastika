"use client";

import { useState } from "react";
import { FaCheckCircle, FaFileAlt, FaUserCheck, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function PendaftaranPage() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    alamat: "",
    tanggalLahir: "",
    pendidikanTerakhir: "",
    program: "",
    alasan: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In real application, send data to backend
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-orange-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pendaftaran PKBM SWASTIKA</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Mulai perjalanan pendidikan Anda bersama kami
          </p>
        </div>
      </section>

      {/* Registration Flow */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Alur Pendaftaran</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-primary text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-bold text-lg mb-2">Isi Formulir</h3>
              <p className="text-gray-600 text-sm">Lengkapi formulir pendaftaran online</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-bold text-lg mb-2">Verifikasi</h3>
              <p className="text-gray-600 text-sm">Tim kami akan memverifikasi data Anda</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-bold text-lg mb-2">Konfirmasi</h3>
              <p className="text-gray-600 text-sm">Anda akan dihubungi untuk konfirmasi</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                ✓
              </div>
              <h3 className="font-bold text-lg mb-2">Mulai Belajar</h3>
              <p className="text-gray-600 text-sm">Bergabung dengan kelas dan mulai belajar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Persyaratan Pendaftaran</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Paket A */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-primary text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-xl font-bold">
                A
              </div>
              <h3 className="font-bold text-xl mb-4">Paket A (Setara SD)</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Fotokopi KTP/KK</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Pas foto 3x4 (3 lembar)</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Usia minimal 15 tahun</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Surat keterangan tidak sekolah (jika ada)</span>
                </li>
              </ul>
            </div>

            {/* Paket B */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-secondary text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-xl font-bold">
                B
              </div>
              <h3 className="font-bold text-xl mb-4">Paket B (Setara SMP)</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <FaCheckCircle className="text-secondary mr-2 mt-1 flex-shrink-0" />
                  <span>Fotokopi KTP/KK</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-secondary mr-2 mt-1 flex-shrink-0" />
                  <span>Pas foto 3x4 (3 lembar)</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-secondary mr-2 mt-1 flex-shrink-0" />
                  <span>Ijazah SD/Paket A</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-secondary mr-2 mt-1 flex-shrink-0" />
                  <span>Usia minimal 16 tahun</span>
                </li>
              </ul>
            </div>

            {/* Paket C */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-primary text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-xl font-bold">
                C
              </div>
              <h3 className="font-bold text-xl mb-4">Paket C (Setara SMA)</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Fotokopi KTP/KK</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Pas foto 3x4 (3 lembar)</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Ijazah SMP/Paket B</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>Usia minimal 17 tahun</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Formulir Pendaftaran Online</h2>
            
            {submitted ? (
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center">
                <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800 mb-4">Pendaftaran Berhasil!</h3>
                <p className="text-gray-700 mb-6">
                  Terima kasih telah mendaftar. Tim kami akan segera menghubungi Anda untuk proses selanjutnya.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all"
                >
                  Daftar Lagi
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-xl shadow-lg">
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Nama Lengkap *</label>
                    <input
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Nomor Telepon/WA *</label>
                      <input
                        type="tel"
                        name="telepon"
                        value={formData.telepon}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        placeholder="08xxx"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Alamat Lengkap *</label>
                    <textarea
                      name="alamat"
                      value={formData.alamat}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      placeholder="Masukkan alamat lengkap"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Tanggal Lahir *</label>
                      <input
                        type="date"
                        name="tanggalLahir"
                        value={formData.tanggalLahir}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Pendidikan Terakhir *</label>
                      <select
                        name="pendidikanTerakhir"
                        value={formData.pendidikanTerakhir}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      >
                        <option value="">Pilih pendidikan terakhir</option>
                        <option value="Tidak Tamat SD">Tidak Tamat SD</option>
                        <option value="SD/MI">SD/MI</option>
                        <option value="SMP/MTs">SMP/MTs</option>
                        <option value="SMA/MA">SMA/MA</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Program yang Dipilih *</label>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    >
                      <option value="">Pilih program</option>
                      <option value="Paket A">Paket A (Setara SD)</option>
                      <option value="Paket B">Paket B (Setara SMP)</option>
                      <option value="Paket C IPA">Paket C IPA (Setara SMA)</option>
                      <option value="Paket C IPS">Paket C IPS (Setara SMA)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Alasan Mendaftar</label>
                    <textarea
                      name="alasan"
                      value={formData.alasan}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      placeholder="Ceritakan alasan Anda ingin bergabung dengan PKBM SWASTIKA"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-secondary hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                  >
                    Kirim Pendaftaran
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Contact Admin */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Butuh Bantuan Pendaftaran?</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <a
              href="https://wa.me/628123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center justify-center"
            >
              <FaWhatsapp size={32} className="mr-3" />
              <div>
                <p className="font-bold text-lg">WhatsApp Admin</p>
                <p className="text-sm">+62 812-3456-7890</p>
              </div>
            </a>
            <a
              href="mailto:pendaftaran@pkbmswastika.com"
              className="bg-primary hover:bg-blue-600 text-white p-6 rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center justify-center"
            >
              <FaEnvelope size={32} className="mr-3" />
              <div>
                <p className="font-bold text-lg">Email Admin</p>
                <p className="text-sm">pendaftaran@pkbmswastika.com</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
