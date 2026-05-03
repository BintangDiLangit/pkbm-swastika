"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { CrudPage } from "@/components/admin/CrudPage";

type Program = {
  id: string;
  code: string;
  title: string;
  subtitle: string | null;
  description: string;
  features: string[];
  image: string | null;
  duration: string | null;
  badge: string | null;
  order: number;
  active: boolean;
};

export default function AdminProgramPage() {
  return (
    <AdminShell title="Kelola Program">
      <CrudPage<Program>
        title="Program"
        description="Atur kartu program (Paket A/B/C, keterampilan) yang tampil di landing page."
        apiBase="/api/program"
        defaultValues={{
          code: "",
          title: "",
          subtitle: "",
          description: "",
          features: [],
          image: "",
          duration: "",
          badge: "",
          order: 0,
          active: true,
        }}
        fields={[
          { name: "code", label: "Kode (A / B / C / KETERAMPILAN)", type: "text", required: true },
          { name: "title", label: "Judul Program", type: "text", required: true },
          { name: "subtitle", label: "Subtitle (mis. Setara SMP/MTs)", type: "text" },
          { name: "description", label: "Deskripsi", type: "textarea", required: true, rows: 4 },
          { name: "features", label: "Fitur Utama", type: "tags", placeholder: "Durasi 2 tahun, Ijazah resmi, Jadwal fleksibel" },
          { name: "image", label: "URL Gambar", type: "text", placeholder: "/images/kelas.jpeg" },
          { name: "duration", label: "Durasi", type: "text", placeholder: "2-3 tahun" },
          { name: "badge", label: "Badge (POPULER / BARU)", type: "text" },
          { name: "order", label: "Urutan", type: "number" },
          { name: "active", label: "Aktif (tampilkan di landing page)", type: "checkbox" },
        ]}
        columns={[
          { key: "code", label: "Kode" },
          { key: "title", label: "Judul" },
          { key: "subtitle", label: "Subtitle" },
          {
            key: "active",
            label: "Aktif",
            render: (r) => (r.active ? "✓" : "✕"),
          },
          { key: "order", label: "Urutan" },
        ]}
      />
    </AdminShell>
  );
}
