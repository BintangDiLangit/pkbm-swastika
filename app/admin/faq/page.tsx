"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { CrudPage } from "@/components/admin/CrudPage";

type Faq = {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  order: number;
  active: boolean;
};

export default function AdminFaqPage() {
  return (
    <AdminShell title="Kelola FAQ">
      <CrudPage<Faq>
        title="FAQ"
        description="Pertanyaan yang sering ditanyakan calon peserta. Otomatis ter-render sebagai schema.org FAQPage."
        apiBase="/api/faq"
        defaultValues={{ question: "", answer: "", category: "umum", order: 0, active: true }}
        fields={[
          { name: "question", label: "Pertanyaan", type: "textarea", required: true, rows: 2 },
          { name: "answer", label: "Jawaban", type: "textarea", required: true, rows: 5 },
          {
            name: "category",
            label: "Kategori",
            type: "select",
            options: [
              { value: "umum", label: "Umum" },
              { value: "umur", label: "Umur" },
              { value: "biaya", label: "Biaya" },
              { value: "ijazah", label: "Ijazah" },
              { value: "jadwal", label: "Jadwal" },
              { value: "pendaftaran", label: "Pendaftaran" },
              { value: "program", label: "Program" },
            ],
          },
          { name: "order", label: "Urutan", type: "number" },
          { name: "active", label: "Tampilkan", type: "checkbox" },
        ]}
        columns={[
          { key: "question", label: "Pertanyaan", render: (r) => String(r.question).slice(0, 80) + "..." },
          { key: "category", label: "Kategori" },
          { key: "active", label: "Aktif", render: (r) => (r.active ? "✓" : "✕") },
        ]}
      />
    </AdminShell>
  );
}
