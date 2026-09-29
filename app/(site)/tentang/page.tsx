import Image from "next/image";
import { Award, BadgeCheck, Eye, Target, UserRound, Users } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientHeading } from "@/components/ui/GradientHeading";

export const metadata = {
  title: "Tentang PKBM SWASTIKA - Profil, Visi, Misi & Struktur Organisasi",
  description: "Pelajari profil lengkap PKBM SWASTIKA, lembaga pendidikan nonformal terpercaya di Malang. Visi menciptakan masyarakat belajar yang kompetitif dan mandiri, dengan akreditasi B dan layanan pendidikan setara SD/SMP/SMA.",
  keywords: "tentang PKBM SWASTIKA, profil lembaga, visi misi PKBM Malang, struktur organisasi, akreditasi pendidikan nonformal, pendidikan alternatif Malang",
  openGraph: {
    title: "Tentang PKBM SWASTIKA - Profil & Visi Misi",
    description: "PKBM SWASTIKA: Pusat Kegiatan Belajar Masyarakat di Malang dengan pendidikan nonformal berkualitas, akreditasi B, dan komitmen untuk pendidikan merata.",
    type: "website",
  },
};

const misi = [
  "Membekali pengetahuan dan pembiasaan budi pekerti luhur untuk warga belajar.",
  "Menyelenggarakan pendidikan dan pendampingan yang prima, berdaya saing, dan terupdate.",
  "Memberikan layanan pendidikan yang mengembangkan kemampuan inovasi, kreatif, dan berbasis IT.",
  "Mengembangkan strategi pendidikan yang berkelanjutan, mandiri, dan berdaya saing.",
  "Mengembangkan, memfasilitasi, dan memobilisasi kegiatan yang bersifat pengembangan diri, pemberdayaan, dan kewirausahaan secara dinamis.",
  "Menjalin hubungan lintas sektoral untuk kemajuan warga belajar.",
  "Menerapkan manajemen partisipatif dengan melibatkan seluruh peserta didik dalam setiap kegiatan yang dilakukan.",
];

const pengurus = [
  { jabatan: "Sekretaris", nama: "Dra. Endang Sri Agustin" },
  { jabatan: "Bendahara", nama: "Rulliyanti, S.Pd" },
  { jabatan: "Koordinator Program", nama: "Mochammad Andik, S.Pd" },
];

const tutor = [
  { program: "Tutor Paket A", jumlah: "5 Pendidik" },
  { program: "Tutor Paket B", jumlah: "7 Pendidik" },
  { program: "Tutor Paket C", jumlah: "10 Pendidik" },
];

export default function TentangPage() {
  return (
    <>
      <PageHero
        label="Tentang Kami"
        title="Mengenal PKBM"
        highlight="Swastika"
        description="Lembaga pendidikan nonformal terpercaya di Malang yang membuka kesempatan belajar untuk semua, tanpa batas usia dan latar belakang."
      />

      {/* Profil */}
      <section className="section-padding overflow-hidden bg-white">
        <div className="container-premium grid items-center gap-12 md:grid-cols-2 lg:gap-20">
          <Reveal className="relative pb-16 pr-10 md:pb-20 md:pr-14">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card-hover">
              <Image src="/images/gedung.jpg" alt="Gedung PKBM Swastika" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 aspect-square w-1/2 overflow-hidden rounded-3xl border-8 border-white shadow-card-hover">
              <Image src="/images/rapat.jpg" alt="Rapat pengurus PKBM Swastika" fill sizes="25vw" className="object-cover" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <SectionLabel>Profil Lembaga</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 text-4xl font-bold leading-tight text-navy md:text-5xl">
                Rumah Belajar untuk{" "}
                <span className="relative whitespace-nowrap">
                  Semua Kalangan
                  <span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-gold/60" aria-hidden />
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-500">
                <p>
                  PKBM SWASTIKA adalah Pusat Kegiatan Belajar Masyarakat yang berlokasi di Kota Malang,
                  Jawa Timur. Kami menyelenggarakan pendidikan nonformal yang setara dengan pendidikan formal
                  pada jenjang pendidikan dasar dan menengah.
                </p>
                <p>
                  Sejak didirikan, PKBM SWASTIKA telah melayani ribuan peserta didik dari berbagai kalangan
                  masyarakat yang membutuhkan layanan pendidikan alternatif dengan pendekatan yang lebih
                  fleksibel namun tetap berkualitas.
                </p>
                <p>
                  Kami berkomitmen memberikan kesempatan pendidikan yang merata bagi seluruh masyarakat, tanpa
                  memandang usia, latar belakang, atau kondisi ekonomi.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="section-padding bg-slate-50/60">
        <div className="container-premium">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Reveal>
              <SectionLabel>Visi &amp; Misi</SectionLabel>
            </Reveal>
            <GradientHeading className="mt-5">Arah Langkah Kami</GradientHeading>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="relative overflow-hidden rounded-[2rem] bg-navy p-10 text-white shadow-card-hover md:p-12 lg:sticky lg:top-28 lg:self-start">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-navy">
                <Eye className="h-7 w-7" aria-hidden />
              </span>
              <h3 className="mt-8 text-3xl font-bold text-white">Visi</h3>
              <p className="mt-5 font-heading text-xl leading-relaxed text-white/90 md:text-2xl">
                &ldquo;Menciptakan Warga Belajar / Masyarakat Belajar yang Berbudi Pekerti Luhur, Kompetitif,
                Mandiri, dan Berwawasan Global.&rdquo;
              </p>
            </Reveal>

            <Reveal delay={0.15} className="rounded-[2rem] bg-white p-10 shadow-card md:p-12">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-gold">
                <Target className="h-7 w-7" aria-hidden />
              </span>
              <h3 className="mt-8 text-3xl font-bold text-navy">Misi</h3>
              <ol className="mt-6 space-y-4">
                {misi.map((m, i) => (
                  <li key={m} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 font-heading text-sm font-bold text-navy">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed text-slate-600">{m}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Struktur organisasi */}
      <section className="section-padding bg-white">
        <div className="container-premium">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Reveal>
              <SectionLabel>Struktur Organisasi</SectionLabel>
            </Reveal>
            <GradientHeading className="mt-5">Orang-Orang di Balik Kami</GradientHeading>
          </div>

          <div className="mx-auto max-w-5xl space-y-6">
            <Reveal className="mx-auto flex max-w-md flex-col items-center rounded-3xl bg-navy p-8 text-center text-white shadow-card-hover">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-navy ring-8 ring-gold/20">
                <UserRound className="h-8 w-8" aria-hidden />
              </span>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Ketua PKBM</p>
              <p className="mt-2 font-heading text-2xl font-bold">Ridwan, S.Pd, M.Pd</p>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              {pengurus.map((p, i) => (
                <Reveal key={p.jabatan} delay={0.1 + i * 0.1} className="group rounded-3xl border border-slate-100 bg-slate-50/70 p-7 text-center transition-colors duration-300 hover:border-gold/40 hover:bg-white hover:shadow-card">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                    <Users className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{p.jabatan}</p>
                  <p className="mt-2 font-heading text-lg font-semibold text-navy">{p.nama}</p>
                </Reveal>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {tutor.map((t, i) => (
                <Reveal key={t.program} delay={0.2 + i * 0.1} className="rounded-3xl border border-dashed border-slate-200 p-6 text-center">
                  <p className="font-heading font-semibold text-navy">{t.program}</p>
                  <p className="mt-1 text-sm text-slate-500">{t.jumlah}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Akreditasi & legalitas */}
      <section className="section-padding bg-slate-50/60">
        <div className="container-premium">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Reveal>
              <SectionLabel>Akreditasi &amp; Legalitas</SectionLabel>
            </Reveal>
            <GradientHeading className="mt-5">Resmi &amp; Terpercaya</GradientHeading>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            <Reveal className="rounded-[2rem] bg-white p-10 shadow-card">
              <div className="flex items-center gap-5">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-gold">
                  <Award className="h-7 w-7" aria-hidden />
                </span>
                <div>
                  <h3 className="text-2xl font-bold text-navy">Akreditasi</h3>
                  <p className="font-heading font-semibold text-gold-dark">Terakreditasi B</p>
                </div>
              </div>
              <p className="mt-6 leading-relaxed text-slate-500">
                PKBM SWASTIKA telah terakreditasi oleh Badan Akreditasi Nasional Pendidikan Anak Usia Dini dan
                Pendidikan Nonformal (BAN PAUD dan PNF).
              </p>
            </Reveal>

            <Reveal delay={0.15} className="rounded-[2rem] bg-white p-10 shadow-card">
              <div className="flex items-center gap-5">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-gold">
                  <BadgeCheck className="h-7 w-7" aria-hidden />
                </span>
                <div>
                  <h3 className="text-2xl font-bold text-navy">Legalitas</h3>
                  <p className="font-heading font-semibold text-gold-dark">Terdaftar &amp; Resmi</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3 text-slate-600">
                <li>SK Pendirian: 421.9/XXX/2018</li>
                <li>NPSN: P2967637</li>
                <li>Izin Operasional Dinas Pendidikan Kabupaten Malang</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
