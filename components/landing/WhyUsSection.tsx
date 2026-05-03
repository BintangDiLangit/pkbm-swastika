"use client";

import Image from "next/image";
import { FaClock, FaHandHoldingHeart, FaUsers, FaCertificate } from "react-icons/fa";
import { SectionHeader } from "../ui/SectionHeader";
import { Stagger, StaggerItem } from "../ui/Reveal";

const reasons = [
  {
    icon: FaClock,
    title: "Jadwal Fleksibel",
    desc: "Pilih kelas pagi, sore, atau akhir pekan. Cocok untuk yang sambil bekerja atau mengurus keluarga.",
    color: "bg-primary-100 text-primary-700",
  },
  {
    icon: FaHandHoldingHeart,
    title: "Biaya Terjangkau",
    desc: "Pendidikan berkualitas dengan biaya ramah kantong. Tersedia subsidi & pembayaran cicil.",
    color: "bg-accent-100 text-accent-600",
  },
  {
    icon: FaUsers,
    title: "Dukungan Komunitas",
    desc: "Belajar bersama dalam suasana hangat dan saling support — tanpa diskriminasi usia & latar belakang.",
    color: "bg-primary-100 text-primary-700",
  },
  {
    icon: FaCertificate,
    title: "Program Tersertifikasi",
    desc: "Paket A, B, C dengan ijazah resmi Kemendikbudristek. Bisa untuk lanjut sekolah & melamar kerja.",
    color: "bg-accent-100 text-accent-600",
  },
];

export function WhyUsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/40 to-white py-20 sm:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Kenapa PKBM Swastika?"
          title="Pendidikan ramah,"
          highlight="hasil nyata"
          description="Kami percaya setiap orang berhak atas kesempatan belajar yang setara — apapun usianya, latar belakangnya, atau kondisinya."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* image */}
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-4 border-white shadow-card">
              <Image
                src="/images/kelas.jpeg"
                alt="Kegiatan belajar"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 90vw"
              />
            </div>
            {/* floating badge */}
            <div className="absolute -bottom-6 -right-4 rounded-2xl bg-gradient-to-br from-primary-700 to-primary-800 p-5 text-white shadow-glow sm:-right-6">
              <div className="text-3xl font-bold">B</div>
              <div className="text-xs font-semibold opacity-90">Akreditasi</div>
              <div className="text-xs opacity-75">BAN PAUD & PNF</div>
            </div>
          </div>

          {/* reasons grid */}
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {reasons.map((r) => (
              <StaggerItem key={r.title}>
                <div className="card-soft h-full p-6">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${r.color}`}
                  >
                    <r.icon size={22} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{r.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
