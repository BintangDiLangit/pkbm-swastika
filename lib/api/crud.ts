import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { requireAdmin } from "@/lib/auth";

type Body = Record<string, unknown>;

/** Bagian delegate Prisma (mis. prisma.faq) yang dipakai CRUD standar. */
type CrudDelegate = {
  findMany(args: { orderBy: { order: "asc" } }): Promise<unknown[]>;
  create(args: { data: never }): Promise<unknown>;
  update(args: { where: { id: string }; data: never }): Promise<unknown>;
  delete(args: { where: { id: string } }): Promise<unknown>;
};

export type CrudResource = {
  /** Nama untuk pesan ke admin, mis. "FAQ", "Testimoni". */
  label: string;
  delegate: () => CrudDelegate;
  /** Field wajib + pesan bila kosong. */
  required: { fields: string[]; message: string };
  /** Petakan body request ke data Prisma (dipakai untuk tambah & ubah). */
  toData: (body: Body) => Record<string, unknown>;
};

type IdContext = { params: Promise<{ id: string }> };

const json = (body: object, status = 200) => NextResponse.json(body, { status });

function missingRequired(resource: CrudResource, body: Body) {
  return resource.required.fields.some((f) => !body[f]);
}

/** GET (publik) & POST (admin) untuk /api/<resource>. */
export function collectionHandlers(resource: CrudResource) {
  const name = resource.label.toLowerCase();

  async function GET() {
    try {
      const data = await resource.delegate().findMany({ orderBy: { order: "asc" } });
      return json({ success: true, data });
    } catch (e) {
      console.error(`GET ${name} failed:`, e);
      return json({ success: false, message: "Gagal mengambil data" }, 500);
    }
  }

  async function POST(request: NextRequest) {
    const denied = requireAdmin(request);
    if (denied) return denied;
    try {
      const body = (await request.json()) as Body;
      if (missingRequired(resource, body)) return json({ success: false, message: resource.required.message }, 400);
      const data = await resource.delegate().create({ data: resource.toData(body) as never });
      return json({ success: true, data, message: `${resource.label} berhasil ditambahkan` });
    } catch (e) {
      console.error(`POST ${name} failed:`, e);
      return json({ success: false, message: `Gagal menambah ${name}` }, 500);
    }
  }

  return { GET, POST };
}

/** PUT & DELETE (admin) untuk /api/<resource>/[id]. */
export function itemHandlers(resource: CrudResource) {
  const name = resource.label.toLowerCase();
  const notFound = (e: unknown) => e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025";

  async function PUT(request: NextRequest, { params }: IdContext) {
    const denied = requireAdmin(request);
    if (denied) return denied;
    try {
      const { id } = await params;
      const body = (await request.json()) as Body;
      if (missingRequired(resource, body)) return json({ success: false, message: resource.required.message }, 400);
      const data = await resource.delegate().update({ where: { id }, data: resource.toData(body) as never });
      return json({ success: true, data, message: `${resource.label} berhasil diupdate` });
    } catch (e) {
      if (notFound(e)) return json({ success: false, message: `${resource.label} tidak ditemukan` }, 404);
      console.error(`PUT ${name} failed:`, e);
      return json({ success: false, message: `Gagal update ${name}` }, 500);
    }
  }

  async function DELETE(request: NextRequest, { params }: IdContext) {
    const denied = requireAdmin(request);
    if (denied) return denied;
    try {
      const { id } = await params;
      await resource.delegate().delete({ where: { id } });
      return json({ success: true, message: `${resource.label} berhasil dihapus` });
    } catch (e) {
      if (notFound(e)) return json({ success: false, message: `${resource.label} tidak ditemukan` }, 404);
      console.error(`DELETE ${name} failed:`, e);
      return json({ success: false, message: `Gagal hapus ${name}` }, 500);
    }
  }

  return { PUT, DELETE };
}

// Helper pemetaan field yang sering dipakai
export const optionalText = (v: unknown) => (typeof v === "string" && v ? v : null);
export const orderValue = (v: unknown) => (typeof v === "number" ? v : 0);
export const activeValue = (v: unknown) => v !== false;
