"use client";

import { useEffect, useState, useCallback } from "react";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

export type FieldDef =
  | { name: string; label: string; type: "text" | "number" | "url"; placeholder?: string; required?: boolean }
  | { name: string; label: string; type: "textarea"; placeholder?: string; required?: boolean; rows?: number }
  | { name: string; label: string; type: "select"; options: { value: string; label: string }[]; required?: boolean }
  | { name: string; label: string; type: "checkbox" }
  | { name: string; label: string; type: "tags"; placeholder?: string };

export type ColumnDef = {
  key: string;
  label: string;
  render?: (row: Record<string, unknown>) => React.ReactNode;
};

type Props<T extends { id: string }> = {
  title: string;
  description?: string;
  apiBase: string;
  fields: FieldDef[];
  columns: ColumnDef[];
  defaultValues: Record<string, unknown>;
};

export function CrudPage<T extends { id: string }>({
  title,
  description,
  apiBase,
  fields,
  columns,
  defaultValues,
}: Props<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>(defaultValues);
  const [submitting, setSubmitting] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(apiBase);
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [apiBase]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editId ? `${apiBase}/${editId}` : apiBase;
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setOpen(false);
        setEditId(null);
        setForm(defaultValues);
        fetchItems();
      } else {
        alert(data.message || "Gagal menyimpan");
      }
    } catch {
      alert("Gagal menyimpan");
    } finally {
      setSubmitting(false);
    }
  };

  const onEdit = (row: T) => {
    setEditId(row.id);
    setForm({ ...defaultValues, ...row });
    setOpen(true);
  };

  const onDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus item ini?")) return;
    const res = await fetch(`${apiBase}/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) fetchItems();
    else alert(data.message || "Gagal hapus");
  };

  const reset = () => {
    setEditId(null);
    setForm(defaultValues);
    setOpen(false);
  };

  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-ink">{title}</h2>
          {description && <p className="mt-1 text-sm text-ink-muted">{description}</p>}
        </div>
        <button
          onClick={() => {
            setEditId(null);
            setForm(defaultValues);
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-primary-700 px-4 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-primary-800"
        >
          <FaPlus /> Tambah
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-soft-200 bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-soft-50 text-left text-xs font-bold uppercase tracking-wider text-ink-soft">
              <tr>
                {columns.map((c) => (
                  <th key={c.key} className="px-5 py-3">
                    {c.label}
                  </th>
                ))}
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-soft-200 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-5 py-10 text-center text-ink-soft">
                    Memuat data...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-5 py-10 text-center text-ink-soft">
                    Belum ada data. Tambahkan item pertama Anda.
                  </td>
                </tr>
              ) : (
                items.map((row) => (
                  <tr key={row.id} className="hover:bg-soft-50">
                    {columns.map((c) => (
                      <td key={c.key} className="px-5 py-3 text-ink">
                        {c.render
                          ? c.render(row as unknown as Record<string, unknown>)
                          : String((row as unknown as Record<string, unknown>)[c.key] ?? "—")}
                      </td>
                    ))}
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onEdit(row)}
                          className="rounded-lg bg-accent-100 p-2 text-accent-600 hover:bg-accent-200"
                          aria-label="Edit"
                        >
                          <FaEdit className="text-xs" />
                        </button>
                        <button
                          onClick={() => onDelete(row.id)}
                          className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                          aria-label="Hapus"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-8 w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-soft-200 px-6 py-4">
              <h3 className="text-lg font-bold text-ink">{editId ? `Edit ${title}` : `Tambah ${title}`}</h3>
              <button onClick={reset} className="text-ink-soft hover:text-ink">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={onSubmit} className="space-y-4 p-6">
              {fields.map((f) => (
                <FieldRow key={f.name} field={f} value={form[f.name]} onChange={(v) => setForm((s) => ({ ...s, [f.name]: v }))} />
              ))}
              <div className="flex justify-end gap-3 border-t border-soft-200 pt-4">
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-xl border border-soft-200 px-5 py-2.5 text-sm font-semibold text-ink-muted hover:bg-soft-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-primary-800 disabled:opacity-50"
                >
                  {submitting ? "Menyimpan..." : editId ? "Update" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldRow({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const baseInput =
    "w-full rounded-xl border border-soft-200 bg-white px-4 py-2.5 text-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100";

  if (field.type === "textarea") {
    return (
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">{field.label}</label>
        <textarea
          rows={field.rows ?? 4}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          placeholder={field.placeholder}
          className={baseInput}
        />
      </div>
    );
  }
  if (field.type === "select") {
    return (
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">{field.label}</label>
        <select
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          className={baseInput}
        >
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-3 rounded-xl border border-soft-200 p-3">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-soft-300 text-primary-700 focus:ring-primary-400"
        />
        <span className="text-sm font-semibold text-ink">{field.label}</span>
      </label>
    );
  }
  if (field.type === "tags") {
    const arr = Array.isArray(value) ? (value as string[]) : [];
    return (
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">{field.label}</label>
        <input
          type="text"
          value={arr.join(", ")}
          onChange={(e) =>
            onChange(
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
          placeholder={field.placeholder ?? "Pisahkan dengan koma"}
          className={baseInput}
        />
        <p className="mt-1 text-xs text-ink-soft">Pisahkan tiap item dengan koma. Contoh: Item 1, Item 2, Item 3</p>
      </div>
    );
  }
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-ink">{field.label}</label>
      <input
        type={field.type}
        value={(value as string | number | undefined) ?? ""}
        onChange={(e) =>
          onChange(field.type === "number" ? (e.target.value === "" ? "" : Number(e.target.value)) : e.target.value)
        }
        required={field.required}
        placeholder={field.placeholder}
        className={baseInput}
      />
    </div>
  );
}
