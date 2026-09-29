"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaCheckCircle, FaFileAlt, FaUserCheck, FaWhatsapp, FaEnvelope, FaSpinner, FaCloudUploadAlt, FaFilePdf, FaTimes } from "react-icons/fa";
import { PageHero } from "@/components/ui/PageHero";
import { primaryEmail, whatsappLink } from "@/lib/site";
import { HttpError, postJson } from "@/lib/http";

// Batasan karakter untuk setiap field
const FIELD_LIMITS = {
  nama: { min: 3, max: 100 },
  email: { min: 5, max: 100 },
  telepon: { min: 10, max: 20 },
  paket: { max: 50 },
  alamat: { min: 10, max: 500 },
  pendidikanTerakhir: { max: 50 },
  pekerjaan: { max: 100 },
  motivasi: { max: 1000 },
};

// Daftar berkas yang wajib diunggah
const BERKAS_FIELDS = [
  { key: "fotoKk", label: "Fotocopy Kartu Keluarga (KK)" },
  { key: "fotoKtp", label: "Fotocopy KTP" },
  { key: "pasFoto", label: "Pasfoto 3x4" },
  { key: "fotoIjazah", label: "Fotocopy Ijazah / Raport" },
] as const;

type BerkasKey = (typeof BERKAS_FIELDS)[number]["key"];

// Ukuran maksimal & tipe file yang diterima untuk upload berkas
// Berkas disimpan sebagai base64 di database, jadi dibatasi agar payload tidak terlalu besar
const MAX_BERKAS_SIZE = 3 * 1024 * 1024; // 3MB
const ACCEPTED_BERKAS_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"];


// Label program untuk ditampilkan di pesan konfirmasi
const PAKET_LABEL: Record<string, string> = {
  "paket-a": "Paket A (Setara SD/MI)",
  "paket-b": "Paket B (Setara SMP/MTs)",
  "paket-c": "Paket C (Setara SMA/MA)",
};

// Ubah File menjadi data URL base64 untuk disimpan di database
const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Gagal membaca file"));
    reader.readAsDataURL(file);
  });

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

  // Berkas (base64 data URL) yang akan disimpan di database PostgreSQL
  const [berkas, setBerkas] = useState<Record<BerkasKey, string>>({
    fotoKk: "",
    fotoKtp: "",
    pasFoto: "",
    fotoIjazah: "",
  });
  // Nama file asli (untuk ditampilkan ke user)
  const [berkasNama, setBerkasNama] = useState<Record<BerkasKey, string>>({
    fotoKk: "",
    fotoKtp: "",
    pasFoto: "",
    fotoIjazah: "",
  });
  // Status sedang upload per berkas
  const [uploadingBerkas, setUploadingBerkas] = useState<Record<BerkasKey, boolean>>({
    fotoKk: false,
    fotoKtp: false,
    pasFoto: false,
    fotoIjazah: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Validasi real-time
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "nama":
        if (value.length > 0 && value.length < FIELD_LIMITS.nama.min) {
          return `Minimal ${FIELD_LIMITS.nama.min} karakter`;
        }
        if (value.length > FIELD_LIMITS.nama.max) {
          return `Maksimal ${FIELD_LIMITS.nama.max} karakter`;
        }
        break;
      case "email":
        if (value.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Format email tidak valid";
        }
        if (value.length > FIELD_LIMITS.email.max) {
          return `Maksimal ${FIELD_LIMITS.email.max} karakter`;
        }
        break;
      case "telepon":
        if (value.length > 0 && !/^(\+62|62|0)[0-9]{9,13}$/.test(value.replace(/\s/g, ""))) {
          return "Format nomor telepon tidak valid (08xx atau 628xx)";
        }
        if (value.length > FIELD_LIMITS.telepon.max) {
          return `Maksimal ${FIELD_LIMITS.telepon.max} karakter`;
        }
        break;
      case "alamat":
        if (value.length > 0 && value.length < FIELD_LIMITS.alamat.min) {
          return `Minimal ${FIELD_LIMITS.alamat.min} karakter`;
        }
        if (value.length > FIELD_LIMITS.alamat.max) {
          return `Maksimal ${FIELD_LIMITS.alamat.max} karakter`;
        }
        break;
      case "pekerjaan":
        if (value.length > FIELD_LIMITS.pekerjaan.max) {
          return `Maksimal ${FIELD_LIMITS.pekerjaan.max} karakter`;
        }
        break;
      case "motivasi":
        if (value.length > FIELD_LIMITS.motivasi.max) {
          return `Maksimal ${FIELD_LIMITS.motivasi.max} karakter`;
        }
        break;
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Batasi input sesuai maxLength
    let newValue = value;
    const limits = FIELD_LIMITS[name as keyof typeof FIELD_LIMITS];
    if (limits?.max && value.length > limits.max) {
      newValue = value.slice(0, limits.max);
    }

    setFormData({
      ...formData,
      [name]: newValue
    });

    // Validasi real-time
    const error = validateField(name, newValue);
    setFieldErrors({
      ...fieldErrors,
      [name]: error
    });
  };

  const handleBerkasUpload = async (key: BerkasKey, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Reset value supaya bisa pilih file yang sama lagi setelah dihapus
    e.target.value = "";
    if (!file) return;

    // Validasi tipe file di sisi client
    if (!ACCEPTED_BERKAS_TYPES.includes(file.type)) {
      setFieldErrors({ ...fieldErrors, [key]: "Format harus JPG, PNG, atau PDF" });
      return;
    }
    // Validasi ukuran file
    if (file.size > MAX_BERKAS_SIZE) {
      setFieldErrors({ ...fieldErrors, [key]: "Ukuran file maksimal 3MB" });
      return;
    }

    setFieldErrors({ ...fieldErrors, [key]: "" });
    setUploadingBerkas((prev) => ({ ...prev, [key]: true }));

    try {
      // Baca file menjadi base64 untuk disimpan langsung di database
      const dataUrl = await fileToBase64(file);
      setBerkas((prev) => ({ ...prev, [key]: dataUrl }));
      setBerkasNama((prev) => ({ ...prev, [key]: file.name }));
    } catch {
      setFieldErrors({ ...fieldErrors, [key]: "Gagal memproses file. Silakan coba lagi." });
    } finally {
      setUploadingBerkas((prev) => ({ ...prev, [key]: false }));
    }
  };

  const removeBerkas = (key: BerkasKey) => {
    setBerkas((prev) => ({ ...prev, [key]: "" }));
    setBerkasNama((prev) => ({ ...prev, [key]: "" }));
    setFieldErrors({ ...fieldErrors, [key]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validasi semua field sebelum submit
    const errors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) errors[key] = error;
    });

    // Validasi semua berkas wajib sudah terunggah
    BERKAS_FIELDS.forEach((b) => {
      if (!berkas[b.key]) {
        errors[b.key] = "Berkas wajib diunggah";
      }
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError("Mohon perbaiki error di form sebelum mengirim");
      setIsLoading(false);
      return;
    }

    // Jangan submit jika masih ada berkas yang sedang diupload
    if (Object.values(uploadingBerkas).some(Boolean)) {
      setError("Tunggu hingga semua berkas selesai diunggah");
      setIsLoading(false);
      return;
    }

    try {
      // Kirim ke API backend dengan validasi
      const result = await postJson("/api/pendaftaran", {
        nama: formData.nama.trim(),
        email: formData.email.trim(),
        telepon: formData.telepon.trim(),
        paket: formData.paket,
        alamat: formData.alamat.trim(),
        tanggalLahir: formData.tanggalLahir,
        pendidikanTerakhir: formData.pendidikanTerakhir || null,
        pekerjaan: formData.pekerjaan.trim() || null,
        motivasi: formData.motivasi.trim() || null,
        fotoKk: berkas.fotoKk,
        fotoKtp: berkas.fotoKtp,
        pasFoto: berkas.pasFoto,
        fotoIjazah: berkas.fotoIjazah,
      });

      if (result.success) {
        // Jika masih ada integrasi dengan Google Sheets dan EmailJS
        if (process.env.NEXT_PUBLIC_SHEET_BEST_URL) {
          try {
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
              berkas_kk: berkas.fotoKk,
              berkas_ktp: berkas.fotoKtp,
              pasfoto: berkas.pasFoto,
              berkas_ijazah: berkas.fotoIjazah,
              status_verifikasi: "Menunggu",
              catatan_admin: ""
            };
            await postJson(process.env.NEXT_PUBLIC_SHEET_BEST_URL, sheetData);
          } catch (sheetError) {
            console.error("Error sending to Google Sheets:", sheetError);
            // Tidak block submit jika Google Sheets error
          }
        }

        // Kirim email notifikasi via EmailJS (optional)
        if (process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID) {
          try {
            await emailjs.send(
              process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
              process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
              {
                ...formData,
                to_email: formData.email,
                admin_email: "admin@pkbm-swastika.com"
              },
              process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );
          } catch (emailError) {
            console.error("Error sending email:", emailError);
            // Tidak block submit jika email error
          }
        }

        setIsSubmitted(true);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      const errorMessage =
        err instanceof HttpError && err.message ? err.message : "Terjadi kesalahan saat mengirim data. Silakan coba lagi.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Bangun link WhatsApp berisi template konfirmasi pendaftaran ke nomor PKBM
  const buildWaConfirmation = (): string => {
    const pesan = [
      "Halo Admin PKBM SWASTIKA 🙏",
      "",
      "Saya sudah melakukan pendaftaran online melalui website. Berikut data saya:",
      "",
      `Nama Lengkap: ${formData.nama}`,
      `Program: ${PAKET_LABEL[formData.paket] || formData.paket}`,
      `No. Telepon: ${formData.telepon}`,
      `Email: ${formData.email}`,
      `Tanggal Lahir: ${formData.tanggalLahir}`,
      "",
      "Mohon konfirmasi pendaftaran saya dan informasi mengenai langkah selanjutnya. Terima kasih 🙏",
    ].join("\n");
    return whatsappLink(pesan);
  };

  if (isSubmitted) {
    return (
      <section className="section-padding min-h-screen bg-slate-50/60 pt-16">
        <div className="container-premium">
          <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-10 text-center shadow-card-hover md:p-12">
            <div className="relative mb-8">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full bg-gold/30 blur-2xl"></div>
              <FaCheckCircle className="relative z-10 mx-auto text-7xl text-navy" />
            </div>
            <h1 className="mb-6 text-4xl font-bold text-navy md:text-5xl">Pendaftaran Berhasil!</h1>
            <p className="mb-8 text-lg leading-relaxed text-slate-500">
              Terima kasih telah mendaftar di PKBM SWASTIKA. Untuk mempercepat proses, silakan kirim konfirmasi pendaftaran Anda melalui WhatsApp dengan menekan tombol di bawah ini.
            </p>
            <div className="mb-10 rounded-3xl border border-gold/50 bg-gold/10 p-6">
              <p className="mb-4 font-heading font-semibold text-navy">
                📲 Satu langkah lagi! Kirim konfirmasi ke admin via WhatsApp:
              </p>
              <a
                href={buildWaConfirmation()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-8 py-4 font-heading font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <FaWhatsapp className="mr-2 text-xl" />
                Kirim Konfirmasi via WhatsApp
              </a>
              <p className="mt-3 text-sm text-slate-500">
                Pesan konfirmasi sudah otomatis terisi dengan data Anda — tinggal tekan kirim di WhatsApp.
              </p>
            </div>
            <div className="space-y-6">
              <div className="rounded-3xl bg-navy p-8 text-white">
                <p className="mb-4 font-heading text-xl font-bold text-gold">Langkah Selanjutnya:</p>
                <ul className="mx-auto mt-4 max-w-md space-y-3 text-left text-lg text-white/85">
                  <li className="flex items-start">
                    <span className="mr-3 text-xl text-gold">✓</span>
                    <span>Verifikasi data oleh tim kami</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-xl text-gold">✓</span>
                    <span>Pembayaran biaya pendaftaran</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-xl text-gold">✓</span>
                    <span>Pengumuman kelas dan jadwal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-xl text-gold">✓</span>
                    <span>Mulai mengikuti kegiatan belajar</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => {
                    setFormData({
                      nama: "", email: "", telepon: "", paket: "", alamat: "",
                      tanggalLahir: "", pendidikanTerakhir: "", pekerjaan: "", motivasi: "",
                    });
                    setBerkas({ fotoKk: "", fotoKtp: "", pasFoto: "", fotoIjazah: "" });
                    setBerkasNama({ fotoKk: "", fotoKtp: "", pasFoto: "", fotoIjazah: "" });
                    setIsSubmitted(false);
                  }}
                  className="rounded-full border border-navy/15 px-8 py-4 font-heading font-bold text-navy transition-colors duration-300 hover:border-gold hover:bg-gold"
                >
                  Daftar Lagi
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero
        label="Pendaftaran"
        title="Pendaftaran"
        highlight="Online"
        description="Daftar sekarang dan bergabunglah dengan program pendidikan nonformal PKBM SWASTIKA."
        image="/images/upk.jpg"
      />
    <section className="section-padding bg-slate-50/60">
      <div className="container-premium">
        {/* Registration Form */}
        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-8 shadow-card md:p-12">
            {/* Personal Information */}
            <div className="mb-10">
              <div className="flex items-center mb-8">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy">
                  <FaUserCheck className="text-xl text-gold" />
                </div>
                <h2 className="text-2xl font-bold text-navy md:text-3xl">Data Pribadi</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="mb-3 block font-heading text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Nama Lengkap * 
                    <span className="ml-2 text-[11px] font-normal normal-case tracking-normal text-slate-400">
                      ({formData.nama.length}/{FIELD_LIMITS.nama.max} karakter, min {FIELD_LIMITS.nama.min})
                    </span>
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                    minLength={FIELD_LIMITS.nama.min}
                    maxLength={FIELD_LIMITS.nama.max}
                    className={`w-full rounded-2xl border bg-slate-50/70 px-5 py-4 text-navy transition-colors duration-300 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 ${
                      fieldErrors.nama 
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100" 
                        : "border-slate-200 focus:border-gold focus:ring-gold/20"
                    }`}
                    placeholder="Masukkan nama lengkap"
                  />
                  {fieldErrors.nama && (
                    <p className="text-red-600 text-sm mt-1">{fieldErrors.nama}</p>
                  )}
                </div>
                <div className="group">
                  <label className="mb-3 block font-heading text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Email * 
                    <span className="ml-2 text-[11px] font-normal normal-case tracking-normal text-slate-400">
                      ({formData.email.length}/{FIELD_LIMITS.email.max} karakter)
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    minLength={FIELD_LIMITS.email.min}
                    maxLength={FIELD_LIMITS.email.max}
                    className={`w-full rounded-2xl border bg-slate-50/70 px-5 py-4 text-navy transition-colors duration-300 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 ${
                      fieldErrors.email 
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100" 
                        : "border-slate-200 focus:border-gold focus:ring-gold/20"
                    }`}
                    placeholder="contoh@email.com"
                  />
                  {fieldErrors.email && (
                    <p className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>
                  )}
                </div>
                <div className="group">
                  <label className="mb-3 block font-heading text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Nomor Telepon * 
                    <span className="ml-2 text-[11px] font-normal normal-case tracking-normal text-slate-400">
                      ({formData.telepon.length}/{FIELD_LIMITS.telepon.max} karakter, min {FIELD_LIMITS.telepon.min})
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="telepon"
                    value={formData.telepon}
                    onChange={handleChange}
                    required
                    minLength={FIELD_LIMITS.telepon.min}
                    maxLength={FIELD_LIMITS.telepon.max}
                    className={`w-full rounded-2xl border bg-slate-50/70 px-5 py-4 text-navy transition-colors duration-300 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 ${
                      fieldErrors.telepon 
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100" 
                        : "border-slate-200 focus:border-gold focus:ring-gold/20"
                    }`}
                    placeholder="08xx atau 628xx"
                  />
                  {fieldErrors.telepon && (
                    <p className="text-red-600 text-sm mt-1">{fieldErrors.telepon}</p>
                  )}
                </div>
                <div className="group">
                  <label className="mb-3 block font-heading text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Tanggal Lahir *</label>
                  <input
                    type="date"
                    name="tanggalLahir"
                    value={formData.tanggalLahir}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border bg-slate-50/70 px-5 py-4 text-navy transition-colors duration-300 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 border-slate-200 focus:border-gold focus:ring-gold/20"
                  />
                </div>
              </div>
            </div>

            {/* Program Selection */}
            <div className="mb-10">
              <div className="flex items-center mb-8">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy">
                  <FaFileAlt className="text-xl text-gold" />
                </div>
                <h2 className="text-2xl font-bold text-navy md:text-3xl">Pilihan Program</h2>
              </div>
              <div className="group">
                <label className="mb-3 block font-heading text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Program Pendidikan *</label>
                <select
                  name="paket"
                  value={formData.paket}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border bg-slate-50/70 px-5 py-4 text-navy transition-colors duration-300 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 border-slate-200 focus:border-gold focus:ring-gold/20 bg-white"
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
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy">
                  <FaFileAlt className="text-xl text-gold" />
                </div>
                <h2 className="text-2xl font-bold text-navy md:text-3xl">Informasi Tambahan</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="mb-3 block font-heading text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Pendidikan Terakhir</label>
                  <select
                    name="pendidikanTerakhir"
                    value={formData.pendidikanTerakhir}
                    onChange={handleChange}
                    className="w-full rounded-2xl border bg-slate-50/70 px-5 py-4 text-navy transition-colors duration-300 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 border-slate-200 focus:border-gold focus:ring-gold/20 bg-white"
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
                  <label className="mb-3 block font-heading text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Pekerjaan
                    <span className="ml-2 text-[11px] font-normal normal-case tracking-normal text-slate-400">
                      ({formData.pekerjaan.length}/{FIELD_LIMITS.pekerjaan.max} karakter)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="pekerjaan"
                    value={formData.pekerjaan}
                    onChange={handleChange}
                    maxLength={FIELD_LIMITS.pekerjaan.max}
                    className={`w-full rounded-2xl border bg-slate-50/70 px-5 py-4 text-navy transition-colors duration-300 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 ${
                      fieldErrors.pekerjaan 
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100" 
                        : "border-slate-200 focus:border-gold focus:ring-gold/20"
                    }`}
                    placeholder="Pekerjaan saat ini"
                  />
                  {fieldErrors.pekerjaan && (
                    <p className="text-red-600 text-sm mt-1">{fieldErrors.pekerjaan}</p>
                  )}
                </div>
              </div>
              <div className="mt-6 group">
                <label className="mb-3 block font-heading text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Alamat Lengkap * 
                  <span className="ml-2 text-[11px] font-normal normal-case tracking-normal text-slate-400">
                    ({formData.alamat.length}/{FIELD_LIMITS.alamat.max} karakter, min {FIELD_LIMITS.alamat.min})
                  </span>
                </label>
                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  required
                  minLength={FIELD_LIMITS.alamat.min}
                  maxLength={FIELD_LIMITS.alamat.max}
                  rows={3}
                  className={`w-full rounded-2xl border bg-slate-50/70 px-5 py-4 text-navy transition-colors duration-300 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 resize-none ${
                    fieldErrors.alamat 
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100" 
                      : "border-slate-200 focus:border-gold focus:ring-gold/20"
                  }`}
                  placeholder="Masukkan alamat lengkap"
                />
                {fieldErrors.alamat && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.alamat}</p>
                )}
              </div>
              <div className="mt-6 group">
                <label className="mb-3 block font-heading text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Motivasi Mengikuti Program
                  <span className="ml-2 text-[11px] font-normal normal-case tracking-normal text-slate-400">
                    ({formData.motivasi.length}/{FIELD_LIMITS.motivasi.max} karakter)
                  </span>
                </label>
                <textarea
                  name="motivasi"
                  value={formData.motivasi}
                  onChange={handleChange}
                  maxLength={FIELD_LIMITS.motivasi.max}
                  rows={4}
                  className={`w-full rounded-2xl border bg-slate-50/70 px-5 py-4 text-navy transition-colors duration-300 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 resize-none ${
                    fieldErrors.motivasi 
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100" 
                      : "border-slate-200 focus:border-gold focus:ring-gold/20"
                  }`}
                  placeholder="Ceritakan motivasi Anda mengikuti program pendidikan di PKBM SWASTIKA"
                />
                {fieldErrors.motivasi && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.motivasi}</p>
                )}
              </div>
            </div>

            {/* Upload Berkas */}
            <div className="mb-10">
              <div className="flex items-center mb-3">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy">
                  <FaCloudUploadAlt className="text-xl text-gold" />
                </div>
                <h2 className="text-2xl font-bold text-navy md:text-3xl">Upload Berkas</h2>
              </div>
              <p className="mb-8 ml-1 text-slate-500">
                Unggah berkas persyaratan. Format JPG, PNG, atau PDF. Maksimal 3MB per file.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {BERKAS_FIELDS.map((b) => {
                  const url = berkas[b.key];
                  const isUploading = uploadingBerkas[b.key];
                  const isPdf = berkasNama[b.key].toLowerCase().endsWith(".pdf");
                  return (
                    <div key={b.key} className="group">
                      <label className="mb-3 block font-heading text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {b.label} *
                      </label>
                      {url ? (
                        <div className="flex items-center justify-between gap-3 rounded-2xl border border-gold/50 bg-gold/5 px-5 py-4">
                          <div className="flex items-center gap-3 min-w-0">
                            {isPdf ? (
                              <FaFilePdf className="text-red-500 text-2xl flex-shrink-0" />
                            ) : (
                              <img src={url} alt={b.label} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                            )}
                            <div className="min-w-0">
                              <p className="truncate font-medium text-navy">{berkasNama[b.key] || "Berkas terunggah"}</p>
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-gold-dark hover:underline"
                              >
                                Lihat berkas
                              </a>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeBerkas(b.key)}
                            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-white border-2 border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                            aria-label={`Hapus ${b.label}`}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <label
                          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-8 cursor-pointer transition-all duration-300 ${
                            fieldErrors[b.key]
                              ? "border-red-400 bg-red-50"
                              : "border-slate-300 hover:border-gold hover:bg-gold/5"
                          } ${isUploading ? "pointer-events-none opacity-70" : ""}`}
                        >
                          {isUploading ? (
                            <>
                              <FaSpinner className="animate-spin text-gold-dark text-2xl mb-2" />
                              <span className="text-slate-500 text-sm">Mengunggah...</span>
                            </>
                          ) : (
                            <>
                              <FaCloudUploadAlt className="mb-2 text-3xl text-gold-dark" />
                              <span className="text-slate-500 text-sm font-medium">Klik untuk pilih file</span>
                              <span className="mt-1 text-xs text-slate-400">JPG, PNG, atau PDF (maks 3MB)</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
                            onChange={(e) => handleBerkasUpload(b.key, e)}
                            disabled={isUploading}
                            className="hidden"
                          />
                        </label>
                      )}
                      {fieldErrors[b.key] && (
                        <p className="text-red-600 text-sm mt-1">{fieldErrors[b.key]}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5">
                <p className="text-red-800 font-bold text-lg mb-1">Error:</p>
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="submit"
                disabled={isLoading || Object.values(uploadingBerkas).some(Boolean)}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-12 py-5 font-heading text-base font-bold tracking-wide transition-all duration-300 ${
                  isLoading || Object.values(uploadingBerkas).some(Boolean)
                    ? "cursor-not-allowed bg-slate-300 text-slate-500"
                    : "bg-gold text-navy shadow-lg shadow-gold/30 hover:scale-105 hover:bg-gold-light"
                }`}
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
              <p className="mx-auto mt-5 max-w-md text-sm text-slate-400">
                Dengan mengklik "Daftar Sekarang", Anda menyetujui syarat dan ketentuan yang berlaku.
              </p>
            </div>
          </form>

          {/* Contact Information */}
          <div className="relative mt-16 overflow-hidden rounded-[2rem] bg-navy p-10 text-center text-white shadow-card-hover">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Butuh Bantuan?</p>
            <h3 className="mx-auto mt-3 max-w-xl text-3xl font-bold text-white">Tim kami siap membantu proses pendaftaran Anda</h3>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Jika Anda memiliki pertanyaan tentang pendaftaran atau program kami, jangan ragu untuk menghubungi kami.
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={whatsappLink("Halo PKBM SWASTIKA, saya ingin bertanya tentang pendaftaran")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-heading text-sm font-bold text-navy shadow-lg shadow-gold/30 transition-colors hover:bg-gold-light"
              >
                <FaWhatsapp className="text-lg" />
                WhatsApp
              </a>
              <a
                href={`mailto:${primaryEmail}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-4 font-heading text-sm font-bold text-white transition-colors hover:border-gold hover:text-gold"
              >
                <FaEnvelope className="text-lg" />
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}