"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { CrudPage } from "@/components/admin/CrudPage";

type QuickLink = {
  id: string;
  label: string;
  href: string;
  icon: string | null;
  external: boolean;
  order: number;
  active: boolean;
};

export default function AdminQuickLinkPage() {
  return (
    <AdminShell title="Quick Links">
      <CrudPage<QuickLink>
        title="Quick Links"
        description="Akses cepat di section 'Quick Launch' dan footer."
        apiBase="/api/quick-link"
        defaultValues={{ label: "", href: "", icon: "FaLink", external: false, order: 0, active: true }}
        fields={[
          { name: "label", label: "Label", type: "text", required: true },
          { name: "href", label: "URL / Path", type: "text", required: true, placeholder: "/pendaftaran atau https://..." },
          { name: "icon", label: "Icon (react-icons/fa, contoh FaUserPlus)", type: "text" },
          { name: "external", label: "Buka di tab baru (link eksternal)", type: "checkbox" },
          { name: "order", label: "Urutan", type: "number" },
          { name: "active", label: "Tampilkan", type: "checkbox" },
        ]}
        columns={[
          { key: "label", label: "Label" },
          { key: "href", label: "URL" },
          { key: "external", label: "Eksternal", render: (r) => (r.external ? "↗" : "—") },
          { key: "active", label: "Aktif", render: (r) => (r.active ? "✓" : "✕") },
        ]}
      />
    </AdminShell>
  );
}
