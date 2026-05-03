"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { CrudPage } from "@/components/admin/CrudPage";

type Recognition = {
  id: string;
  title: string;
  issuer: string | null;
  description: string | null;
  logo: string | null;
  order: number;
  active: boolean;
};

export default function AdminRecognitionPage() {
  return (
    <AdminShell title="Akreditasi & Legalitas">
      <CrudPage<Recognition>
        title="Akreditasi"
        description="Badge legalitas, akreditasi, sertifikasi yang dimiliki PKBM Swastika."
        apiBase="/api/recognition"
        defaultValues={{ title: "", issuer: "", description: "", logo: "", order: 0, active: true }}
        fields={[
          { name: "title", label: "Judul", type: "text", required: true, placeholder: "Akreditasi BAN PAUD & PNF" },
          { name: "issuer", label: "Penerbit", type: "text", placeholder: "Kemendikbudristek" },
          { name: "description", label: "Deskripsi singkat", type: "textarea", rows: 2 },
          { name: "logo", label: "URL Logo (opsional)", type: "url" },
          { name: "order", label: "Urutan", type: "number" },
          { name: "active", label: "Tampilkan", type: "checkbox" },
        ]}
        columns={[
          { key: "title", label: "Judul" },
          { key: "issuer", label: "Penerbit" },
          { key: "active", label: "Aktif", render: (r) => (r.active ? "✓" : "✕") },
        ]}
      />
    </AdminShell>
  );
}
