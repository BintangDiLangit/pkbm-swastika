"use client";

import { useEffect, useState } from "react";
import {
  FaSearch,
  FaEye,
  FaTrash,
  FaTimes,
  FaFilePdf,
  FaFileImage,
  FaWhatsapp,
  FaEnvelope,
  FaClipboardList,
  FaDownload,
} from "react-icons/fa";
import { AdminShell } from "@/components/admin/AdminShell";

interface Pendaftaran {
  id: string;
  nama: string;
  email: string;
  telepon: string;
  paket: string;
  alamat: string;
  tanggalLahir: string;
  pendidikanTerakhir: string | null;
  pekerjaan: string | null;
  motivasi: string | null;
  fotoKk: string | null;
  fotoKtp: string | null;
  pasFoto: string | null;
  fotoIjazah: string | null;
  status: string;
  catatanAdmin: string | null;
  createdAt: string;
}

const PAKET_LABEL: Record<string, string> = {
  "paket-a": "Paket A (Setara SD/MI)",
  "paket-b": "Paket B (Setara SMP/MTs)",
  "paket-c": "Paket C (Setara SMA/MA)",
};

const PENDIDIKAN_LABEL: Record<string, string> = {
  "belum-sekolah": "Belum Sekolah",
  sd: "SD/MI",
  smp: "SMP/MTs",
  sma: "SMA/MA/SMK",
  diploma: "Diploma",
  sarjana: "Sarjana",
};

const STATUS_OPTIONS = ["Menunggu", "Diterima", "Ditolak"];

const STATUS_STYLE: Record<string, string> = {
  Menunggu: "bg-amber-100 text-amber-700",
  Diterima: "bg-green-100 text-green-700",
  Ditolak: "bg-red-100 text-red-700",
};

const BERKAS_FIELDS = [
  { key: "fotoKk", label: "Fotocopy Kartu Keluarga (KK)" },
  { key: "fotoKtp", label: "Fotocopy KTP" },
  { key: "pasFoto", label: "Pasfoto 3x4" },
  { key: "fotoIjazah", label: "Fotocopy Ijazah / Raport" },
] as const;

function formatTanggal(iso: string, withTime = false): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "-";
  const tgl = d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
  if (!withTime) return tgl;
  const jam = d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  return `${tgl}, ${jam}`;
}

export default function AdminPendaftaranPage() {
  const [list, setList] = useState<Pendaftaran[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState<Pendaftaran | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pendaftaran");
      const json = await res.json();
      if (json.success) setList(json.data);
    } catch (err) {
      console.error("Gagal mengambil data pendaftaran:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/pendaftaran/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (json.success) {
        setList((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
        setSelected((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
      } else {
        alert(json.message || "Gagal memperbarui status");
      }
    } catch {
      alert("Gagal memperbarui status");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus data pendaftaran ini? Tindakan ini tidak bisa dibatalkan.")) return;
    try {
      const res = await fetch(`/api/pendaftaran/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setList((prev) => prev.filter((p) => p.id !== id));
        setSelected((prev) => (prev && prev.id === id ? null : prev));
      } else {
        alert(json.message || "Gagal menghapus data");
      }
    } catch {
      alert("Gagal menghapus data");
    }
  };

  const exportCsv = () => {
    const headers = [
      "Nama", "Email", "Telepon", "Program", "Tanggal Lahir", "Alamat",
      "Pendidikan Terakhir", "Pekerjaan", "Status", "Tanggal Daftar",
    ];
    const rows = filtered.map((p) => [
      p.nama, p.email, p.telepon, PAKET_LABEL[p.paket] || p.paket,
      formatTanggal(p.tanggalLahir), p.alamat,
      p.pendidikanTerakhir ? PENDIDIKAN_LABEL[p.pendidikanTerakhir] || p.pendidikanTerakhir : "",
      p.pekerjaan || "", p.status, formatTanggal(p.createdAt, true),
    ]);
    const escape = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
    const csv = [headers, ...rows].map((r) => r.map(escape).join(",")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pendaftaran-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = list.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.nama.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.telepon.toLowerCase().includes(q);
    const matchStatus = !statusFilter || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: list.length,
    menunggu: list.filter((p) => p.status === "Menunggu").length,
    diterima: list.filter((p) => p.status === "Diterima").length,
    ditolak: list.filter((p) => p.status === "Ditolak").length,
  };

  return (
    <AdminShell title="Data Pendaftaran">
      {/* Ringkasan */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total", value: stats.total, color: "bg-primary-50 text-primary-700" },
          { label: "Menunggu", value: stats.menunggu, color: "bg-amber-100 text-amber-700" },
          { label: "Diterima", value: stats.diterima, color: "bg-green-100 text-green-700" },
          { label: "Ditolak", value: stats.ditolak, color: "bg-red-100 text-red-700" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-soft-200 bg-white p-4 shadow-soft">
            <div className={`mb-2 inline-flex rounded-lg px-2 py-1 text-xs font-bold ${s.color}`}>
              {s.label}
            </div>
            <p className="text-2xl font-bold text-ink">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <div className="relative flex-1 sm:max-w-xs">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, email, telepon..."
              className="w-full rounded-xl border border-soft-200 py-2.5 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-soft-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
          >
            <option value="">Semua Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <button
          onClick={exportCsv}
          disabled={filtered.length === 0}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FaDownload /> Export CSV
        </button>
      </div>

      {/* Tabel */}
      <div className="overflow-hidden rounded-2xl border border-soft-200 bg-white shadow-soft">
        {loading ? (
          <div className="p-12 text-center text-ink-soft">Memuat data...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-ink-soft">
            <FaClipboardList className="mx-auto mb-3 text-4xl text-soft-200" />
            {list.length === 0 ? "Belum ada pendaftar." : "Tidak ada data yang cocok dengan filter."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-soft-200 bg-soft-50 text-xs uppercase tracking-wide text-ink-soft">
                <tr>
                  <th className="px-4 py-3 font-semibold">Nama</th>
                  <th className="px-4 py-3 font-semibold">Kontak</th>
                  <th className="px-4 py-3 font-semibold">Program</th>
                  <th className="px-4 py-3 font-semibold">Tgl Daftar</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 text-right font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-soft-100 last:border-0 hover:bg-soft-50">
                    <td className="px-4 py-3 font-semibold text-ink">{p.nama}</td>
                    <td className="px-4 py-3 text-ink-muted">
                      <div>{p.email}</div>
                      <div className="text-xs text-ink-soft">{p.telepon}</div>
                    </td>
                    <td className="px-4 py-3 text-ink-muted">{PAKET_LABEL[p.paket] || p.paket}</td>
                    <td className="px-4 py-3 text-ink-muted">{formatTanggal(p.createdAt)}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${STATUS_STYLE[p.status] || "bg-soft-100 text-ink-muted"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelected(p)}
                          className="rounded-lg p-2 text-primary-700 hover:bg-primary-50"
                          title="Lihat detail"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                          title="Hapus"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Detail */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-8 w-full max-w-3xl rounded-3xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-soft-200 p-6">
              <div>
                <h2 className="text-xl font-bold text-ink">{selected.nama}</h2>
                <p className="text-sm text-ink-soft">
                  Mendaftar {formatTanggal(selected.createdAt, true)}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg p-2 text-ink-soft hover:bg-soft-100"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <div className="space-y-6 p-6">
              {/* Status & aksi cepat */}
              <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-soft-50 p-4">
                <span className="text-sm font-semibold text-ink-muted">Status:</span>
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s}
                    disabled={saving}
                    onClick={() => updateStatus(selected.id, s)}
                    className={`rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-50 ${
                      selected.status === s
                        ? STATUS_STYLE[s]
                        : "bg-white text-ink-soft ring-1 ring-soft-200 hover:bg-soft-100"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Data pribadi */}
              <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-soft">Data Pribadi</h3>
                <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                  <Field label="Email" value={selected.email} />
                  <Field label="Telepon" value={selected.telepon} />
                  <Field label="Tanggal Lahir" value={formatTanggal(selected.tanggalLahir)} />
                  <Field label="Program" value={PAKET_LABEL[selected.paket] || selected.paket} />
                  <Field
                    label="Pendidikan Terakhir"
                    value={selected.pendidikanTerakhir ? PENDIDIKAN_LABEL[selected.pendidikanTerakhir] || selected.pendidikanTerakhir : "-"}
                  />
                  <Field label="Pekerjaan" value={selected.pekerjaan || "-"} />
                  <div className="sm:col-span-2">
                    <Field label="Alamat" value={selected.alamat} />
                  </div>
                  {selected.motivasi && (
                    <div className="sm:col-span-2">
                      <Field label="Motivasi" value={selected.motivasi} />
                    </div>
                  )}
                </dl>
              </div>

              {/* Berkas */}
              <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-soft">Berkas</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {BERKAS_FIELDS.map((b) => {
                    const url = selected[b.key];
                    const isPdf =
                      !!url &&
                      (url.toLowerCase().endsWith(".pdf") || url.startsWith("data:application/pdf"));
                    return (
                      <div key={b.key} className="rounded-2xl border border-soft-200 p-3">
                        <p className="mb-2 text-xs font-semibold text-ink-muted">{b.label}</p>
                        {url ? (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 rounded-xl bg-soft-50 p-2 transition hover:bg-primary-50"
                          >
                            {isPdf ? (
                              <FaFilePdf className="text-2xl text-red-500" />
                            ) : (
                              <img src={url} alt={b.label} className="h-12 w-12 rounded-lg object-cover" />
                            )}
                            <span className="text-sm font-medium text-primary-700">
                              {isPdf ? "Buka PDF" : "Lihat gambar"} ↗
                            </span>
                          </a>
                        ) : (
                          <p className="flex items-center gap-2 text-sm text-ink-soft">
                            <FaFileImage className="text-soft-200" /> Tidak ada berkas
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Aksi kontak */}
              <div className="flex flex-wrap gap-3 border-t border-soft-200 pt-4">
                <a
                  href={`https://wa.me/${selected.telepon.replace(/[^0-9]/g, "").replace(/^0/, "62")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
                <a
                  href={`mailto:${selected.email}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800"
                >
                  <FaEnvelope /> Email
                </a>
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="ml-auto inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  <FaTrash /> Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{label}</dt>
      <dd className="mt-0.5 text-sm text-ink whitespace-pre-wrap break-words">{value}</dd>
    </div>
  );
}
