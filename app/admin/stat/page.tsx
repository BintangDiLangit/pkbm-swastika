"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { CrudPage } from "@/components/admin/CrudPage";

type Stat = {
  id: string;
  label: string;
  value: string;
  caption: string | null;
  icon: string | null;
  order: number;
  active: boolean;
};

export default function AdminStatPage() {
  return (
    <AdminShell title="Statistik Alumni">
      <CrudPage<Stat>
        title="Statistik"
        description="Angka dampak alumni yang ditampilkan di section 'Lulusan kami berdaya & berkarya'."
        apiBase="/api/stat"
        defaultValues={{ label: "", value: "", caption: "", icon: "FaUsers", order: 0, active: true }}
        fields={[
          { name: "label", label: "Label (mis. Alumni Bekerja)", type: "text", required: true },
          { name: "value", label: "Nilai (mis. 350+)", type: "text", required: true },
          { name: "caption", label: "Caption (sub-teks)", type: "text" },
          { name: "icon", label: "Icon (nama dari react-icons/fa, contoh: FaBriefcase)", type: "text" },
          { name: "order", label: "Urutan", type: "number" },
          { name: "active", label: "Tampilkan", type: "checkbox" },
        ]}
        columns={[
          { key: "label", label: "Label" },
          { key: "value", label: "Nilai" },
          { key: "caption", label: "Caption" },
          { key: "active", label: "Aktif", render: (r) => (r.active ? "✓" : "✕") },
        ]}
      />
    </AdminShell>
  );
}
