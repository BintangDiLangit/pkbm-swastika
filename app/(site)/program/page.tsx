import Image from "next/image";
import { ArrowRight, BookOpen, Check, ClipboardCheck, Clock, Laptop, Palette, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientHeading } from "@/components/ui/GradientHeading";
import { Button } from "@/components/ui/Button";
import { CLASS_TIMES, WEEKLY_SUMMARY } from "@/lib/content/program";

export const metadata = {
  title: "Program Pendidikan PKBM SWASTIKA - Paket A, B, C & Kursus Keterampilan",
  description: "Jelajahi program pendidikan nonformal PKBM SWASTIKA: Paket A (setara SD), Paket B (setara SMP), Paket C (setara SMA), plus kursus keterampilan seperti TIK dan kewirausahaan di Malang.",
  keywords: "program PKBM SWASTIKA, Paket A SD, Paket B SMP, Paket C SMA, kursus keterampilan, pendidikan nonformal Malang, kursus komputer, kewirausahaan",
  openGraph: {
    title: "Program Pendidikan PKBM SWASTIKA - Paket A, B, C & Kursus",
    description: "Program lengkap pendidikan nonformal di PKBM SWASTIKA Malang: Paket A, B, C dan berbagai kursus keterampilan untuk semua usia.",
    type: "website",
  },
};

type Program = {
  code: string;
  title: string;
  level: string;
  description: string;
  image: string;
  materiTitle: string;
  materi: string[];
  jadwal: string[];
  syarat: string[];
};

// Berkas umum yang diminta formulir pendaftaran (lihat lib/content/pendaftaran.ts)
const SYARAT_UMUM = "Fotocopy KK dan KTP, pasfoto 3x4";
const PERTEMUAN = `Pertemuan: ${WEEKLY_SUMMARY}`;
const waktu = (program: string) => `Waktu: ${CLASS_TIMES.find((c) => c.program === program)?.time}`;

const programs: Program[] = [
  {
    code: "A",
    title: "Program Paket A",
    level: "Setara SD/MI (Kelas 1-6)",
    description:
      "Program pendidikan dasar yang setara dengan Sekolah Dasar (SD/MI) untuk usia produktif yang putus sekolah atau tidak pernah sekolah. Program ini memberikan kesempatan untuk mendapatkan ijazah setara SD yang diakui secara nasional.",
    image: "/images/kelas.jpeg",
    materiTitle: "Materi Pembelajaran",
    materi: [
      "Bahasa Indonesia",
      "Matematika",
      "IPA (Ilmu Pengetahuan Alam)",
      "IPS (Ilmu Pengetahuan Sosial)",
      "Pendidikan Kewarganegaraan",
      "Bahasa Inggris",
    ],
    jadwal: [
      "Lama belajar: kelas 1–6, mulai dari kelas sesuai rapor terakhir",
      PERTEMUAN,
      waktu("Paket A"),
      "Fleksibel menyesuaikan peserta",
    ],
    syarat: [
      "Terbuka bagi yang belum pernah sekolah atau putus sekolah SD/MI",
      "Rapor SD/MI terakhir bila pernah sekolah",
      SYARAT_UMUM,
    ],
  },
  {
    code: "B",
    title: "Program Paket B",
    level: "Setara SMP/MTs (Kelas 7-9)",
    description:
      "Program pendidikan menengah pertama yang setara dengan SMP/MTs. Dirancang untuk memberikan kesempatan melanjutkan pendidikan ke jenjang yang lebih tinggi dengan ijazah yang diakui secara nasional dan dapat digunakan untuk melanjutkan ke SMA/SMK.",
    image: "/images/diskusi.jpg",
    materiTitle: "Materi Pembelajaran",
    materi: [
      "Bahasa Indonesia",
      "Matematika",
      "IPA (Biologi, Fisika, Kimia)",
      "IPS (Geografi, Sejarah, Ekonomi)",
      "Bahasa Inggris",
      "Pendidikan Agama & PKn",
      "Seni Budaya & TIK",
    ],
    jadwal: [
      "Lama belajar: kelas 7–9, mulai dari kelas sesuai rapor terakhir",
      PERTEMUAN,
      waktu("Paket B"),
    ],
    syarat: ["Ijazah SD/MI/Paket A", "Rapor SMP/MTs terakhir bila pernah sekolah", SYARAT_UMUM],
  },
  {
    code: "C",
    title: "Program Paket C",
    level: "Setara SMA/MA (Kelas 10-12)",
    description:
      "Program pendidikan menengah atas yang setara dengan SMA/MA. Tersedia jurusan IPA dan IPS. Ijazah dapat digunakan untuk melanjutkan ke perguruan tinggi atau memasuki dunia kerja.",
    image: "/images/ujian.jpg",
    materiTitle: "Jurusan & Mata Pelajaran",
    materi: [
      "Jurusan IPA: Matematika, Fisika, Kimia, Biologi",
      "Jurusan IPS: Ekonomi, Geografi, Sosiologi, Sejarah",
      "Umum: Bahasa Indonesia, Bahasa Inggris, PKn, Agama",
    ],
    jadwal: [
      "Lama belajar: kelas 10–12, mulai dari kelas sesuai rapor terakhir",
      PERTEMUAN,
      waktu("Paket C"),
      "Persiapan UTBK-SNBT",
    ],
    syarat: ["Ijazah SMP/MTs/Paket B", "Rapor SMA/SMK/MA terakhir bila pernah sekolah", SYARAT_UMUM],
  },
];

const skills: { icon: LucideIcon; title: string; items: string[] }[] = [
  { icon: Laptop, title: "Teknologi Informasi", items: ["Microsoft Office", "Desain Grafis", "Internet & Media Sosial", "Coding Dasar"] },
  { icon: BookOpen, title: "Kewirausahaan", items: ["Manajemen Usaha", "Pemasaran Digital", "Keuangan Usaha", "Pengembangan Produk"] },
  { icon: Palette, title: "Kerajinan Tangan", items: ["Handycraft", "Seni Lukis", "Kerajinan Daur Ulang", "Aksesoris"] },
  { icon: UtensilsCrossed, title: "Tata Boga", items: ["Masakan Nusantara", "Kue & Pastry", "Food Packaging", "Food Photography"] },
];

export default function ProgramPage() {
  return (
    <>
      <PageHero
        label="Program"
        title="Program"
        highlight="Pendidikan"
        description="Berbagai program pendidikan berkualitas untuk masa depan yang lebih baik, dengan ijazah resmi yang diakui negara."
        image="/images/kelas.jpeg"
      />

      {/* Paket A, B, C: foto dan teks bergantian kiri-kanan */}
      <section className="section-padding overflow-hidden bg-white">
        <Reveal className="container-premium mb-20 md:mb-28">
          <div className="mx-auto max-w-3xl rounded-3xl border border-gold/30 bg-gold/5 p-7 md:p-9">
            <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-navy">
              <Clock className="h-5 w-5 text-gold-dark" aria-hidden />
              Berapa lama belajarnya?
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              Lama belajar tidak sama untuk setiap peserta. Kamu cukup menempuh kelas yang belum pernah diselesaikan:
              peserta yang pernah sekolah melanjutkan dari kelas berikutnya sesuai ijazah/rapor terakhir, sedangkan
              yang belum pernah sekolah mulai dari awal jenjang. Contohnya, yang berhenti sekolah setelah kelas 11
              SMA melanjutkan di Paket C kelas 12. Kelas awal dipastikan saat verifikasi berkas pendaftaran.
            </p>
          </div>
        </Reveal>

        <div className="container-premium space-y-24 md:space-y-32">
          {programs.map((p, i) => {
            const reversed = i % 2 === 1;
            return (
              <div key={p.code} className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
                <Reveal className={`relative ${reversed ? "md:order-2" : ""}`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-card-hover">
                    <Image src={p.image} alt={p.title} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
                  </div>
                  <span className="absolute -bottom-6 left-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-navy font-heading text-4xl font-bold text-gold shadow-xl">
                    {p.code}
                  </span>
                </Reveal>

                <div>
                  <Reveal>
                    <SectionLabel>{p.level}</SectionLabel>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h2 className="mt-5 text-4xl font-bold leading-tight text-navy md:text-5xl">{p.title}</h2>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <p className="mt-6 text-lg leading-relaxed text-slate-500">{p.description}</p>
                  </Reveal>

                  <Reveal delay={0.3} className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6">
                      <h3 className="flex items-center gap-2 font-heading font-semibold text-navy">
                        <Check className="h-5 w-5 text-gold-dark" aria-hidden />
                        {p.materiTitle}
                      </h3>
                      <ul className="mt-4 space-y-2 text-sm text-slate-600">
                        {p.materi.map((m) => (
                          <li key={m} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6">
                      <h3 className="flex items-center gap-2 font-heading font-semibold text-navy">
                        <Clock className="h-5 w-5 text-gold-dark" aria-hidden />
                        Jadwal &amp; Durasi
                      </h3>
                      <ul className="mt-4 space-y-2 text-sm text-slate-600">
                        {p.jadwal.map((j) => (
                          <li key={j} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                            {j}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>

                  <Reveal delay={0.35} className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-6">
                    <h3 className="flex items-center gap-2 font-heading font-semibold text-navy">
                      <ClipboardCheck className="h-5 w-5 text-gold-dark" aria-hidden />
                      Syarat Masuk
                    </h3>
                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                      {p.syarat.map((s) => (
                        <li key={s} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  <Reveal delay={0.4} className="mt-8">
                    <Button href="/pendaftaran" variant="secondary">
                      Daftar {p.title.replace("Program ", "")} <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Keterampilan tambahan */}
      <section className="section-padding bg-slate-50/60">
        <div className="container-premium">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Reveal>
              <SectionLabel>Keterampilan Tambahan</SectionLabel>
            </Reveal>
            <GradientHeading className="mt-5">Bekal untuk Dunia Kerja</GradientHeading>
            <Reveal delay={0.15}>
              <p className="mt-5 text-lg leading-relaxed text-slate-500">
                Selain program kesetaraan, kami menyediakan pelatihan keterampilan untuk meningkatkan kompetensi
                peserta didik.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 0.1}
                className="group h-full rounded-3xl border border-slate-100 bg-white p-7 transition-[border-color,box-shadow] duration-300 hover:border-gold/40 hover:shadow-card-hover"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                  <s.icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-6 text-xl font-bold text-navy">{s.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-500">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
