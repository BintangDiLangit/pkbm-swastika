"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { CrudPage } from "@/components/admin/CrudPage";

type Destination = {
  id: string;
  name: string;
  type: string;
  logo: string | null;
  order: number;
  active: boolean;
};

export default function AdminDestinationPage() {
  return (
    <AdminShell title="Destinasi Alumni">
      <CrudPage<Destination>
        title="Destinasi Alumni"
        description="Kampus, perusahaan, atau bidang usaha yang dijajaki alumni — tampil di marquee 'Karier Alumni'."
        apiBase="/api/destination"
        defaultValues={{ name: "", type: "kampus", logo: "", order: 0, active: true }}
        fields={[
          { name: "name", label: "Nama", type: "text", required: true },
          {
            name: "type",
            label: "Jenis",
            type: "select",
            options: [
              { value: "kampus", label: "Kampus / Pendidikan Lanjut" },
              { value: "karier", label: "Karier / Pekerjaan" },
              { value: "wirausaha", label: "Wirausaha" },
            ],
          },
          { name: "logo", label: "URL Logo (opsional)", type: "url" },
          { name: "order", label: "Urutan", type: "number" },
          { name: "active", label: "Tampilkan", type: "checkbox" },
        ]}
        columns={[
          { key: "name", label: "Nama" },
          { key: "type", label: "Jenis" },
          { key: "active", label: "Aktif", render: (r) => (r.active ? "✓" : "✕") },
        ]}
      />
    </AdminShell>
  );
}
