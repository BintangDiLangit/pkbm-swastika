"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { CrudPage } from "@/components/admin/CrudPage";

type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  avatar: string | null;
  rating: number;
  order: number;
  active: boolean;
};

export default function AdminTestimonialPage() {
  return (
    <AdminShell title="Testimoni Alumni">
      <CrudPage<Testimonial>
        title="Testimoni"
        description="Cerita nyata alumni & peserta didik. Tampil di section 'Cerita Alumni'."
        apiBase="/api/testimonial"
        defaultValues={{ name: "", role: "", quote: "", avatar: "", rating: 5, order: 0, active: true }}
        fields={[
          { name: "name", label: "Nama", type: "text", required: true },
          { name: "role", label: "Peran (mis. Alumni Paket C, 2023)", type: "text" },
          { name: "quote", label: "Kutipan", type: "textarea", required: true, rows: 4 },
          { name: "avatar", label: "URL Foto Profil", type: "url" },
          { name: "rating", label: "Rating (1-5)", type: "number" },
          { name: "order", label: "Urutan", type: "number" },
          { name: "active", label: "Tampilkan", type: "checkbox" },
        ]}
        columns={[
          { key: "name", label: "Nama" },
          { key: "role", label: "Peran" },
          { key: "rating", label: "Rating" },
          { key: "active", label: "Aktif", render: (r) => (r.active ? "✓" : "✕") },
        ]}
      />
    </AdminShell>
  );
}
