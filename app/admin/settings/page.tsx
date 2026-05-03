"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";

const FIELDS: { key: string; label: string; placeholder?: string; textarea?: boolean }[] = [
  { key: "hero_title", label: "Judul Hero", placeholder: "PKBM Swastika - Pendidikan untuk Semua" },
  { key: "hero_subtitle", label: "Subjudul Hero", placeholder: "Kesempatan belajar tanpa batas usia dan latar belakang", textarea: true },
  { key: "hero_image", label: "Gambar Hero (path / URL)", placeholder: "/images/gedung.jpg" },
  { key: "contact_address", label: "Alamat Kantor", textarea: true },
  { key: "contact_phone", label: "Telepon" },
  { key: "contact_whatsapp", label: "WhatsApp (62xxx tanpa +)" },
  { key: "contact_email", label: "Email" },
  { key: "contact_maps", label: "Link Google Maps" },
];

export default function AdminSettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  useEffect(() => {
    fetch("/api/site-setting")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setValues(j.data || {});
      })
      .finally(() => setLoading(false));
  }, []);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/site-setting", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.success) {
        setSavedAt(new Date());
      } else {
        alert(data.message || "Gagal simpan");
      }
    } catch {
      alert("Gagal simpan");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminShell title="Pengaturan Situs">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-ink">Pengaturan Umum</h2>
          <p className="mt-1 text-sm text-ink-muted">
            Ubah teks hero, info kontak, dan link yang tampil di seluruh website.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-soft-200 bg-white p-10 text-center text-ink-soft">
            Memuat pengaturan...
          </div>
        ) : (
          <form onSubmit={onSave} className="space-y-5 rounded-2xl border border-soft-200 bg-white p-6 shadow-soft">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <label className="mb-1.5 block text-sm font-semibold text-ink">{f.label}</label>
                {f.textarea ? (
                  <textarea
                    rows={3}
                    value={values[f.key] ?? ""}
                    onChange={(e) => setValues((s) => ({ ...s, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full rounded-xl border border-soft-200 bg-white px-4 py-2.5 text-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                ) : (
                  <input
                    type="text"
                    value={values[f.key] ?? ""}
                    onChange={(e) => setValues((s) => ({ ...s, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full rounded-xl border border-soft-200 bg-white px-4 py-2.5 text-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                )}
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-soft-200 pt-4">
              {savedAt ? (
                <span className="text-xs text-green-700">
                  ✓ Tersimpan {savedAt.toLocaleTimeString("id-ID")}
                </span>
              ) : (
                <span className="text-xs text-ink-soft">Perubahan langsung tampil di landing page (revalidasi 60 detik).</span>
              )}
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-primary-800 disabled:opacity-50"
              >
                {saving ? "Menyimpan..." : "Simpan Pengaturan"}
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminShell>
  );
}
