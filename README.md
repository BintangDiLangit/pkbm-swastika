# Website PKBM SWASTIKA

Website resmi PKBM SWASTIKA, Pusat Kegiatan Belajar Masyarakat di Malang yang menyelenggarakan pendidikan kesetaraan Paket A (SD), Paket B (SMP), Paket C (SMA), dan pelatihan keterampilan.

## Teknologi

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS**, **Framer Motion**, **Lenis** (smooth scroll), **lucide-react** (ikon situs publik)
- **PostgreSQL** + **Prisma 7** (semua konten, termasuk foto upload, disimpan di database)

## Menjalankan

```bash
npm install
cp .env.example .env.local     # isi DATABASE_URL
npm run db:push                # buat/sinkronkan tabel
SEED_ADMIN_PASSWORD=... npm run db:seed   # data awal + akun admin "admin" dengan password tsb
npm run dev                    # http://localhost:3000
```

Build produksi: `npm run build && npm start`. Panel admin: `/admin`.

### Script database

| Script | Fungsi |
|---|---|
| `npm run db:push` | Sinkronkan skema `prisma/schema.prisma` ke database |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:seed` | Isi data awal |
| `npm run db:studio` | Lihat/ubah data lewat Prisma Studio |
| `npm run db:test` | Tes koneksi database |

## Struktur kode

```
app/
  (site)/              Halaman publik — punya layout sendiri (header, footer, preloader)
    page.tsx           Beranda
    tentang/ program/ galeri/ berita/ kontak/ pendaftaran/
  admin/               Panel admin — tanpa header/footer publik, pakai AdminShell
  api/                 Route API (lihat "API" di bawah)
  layout.tsx           Root layout: font, metadata SEO, JSON-LD
components/
  layout/              Header, Footer, SocialLinks (situs publik)
  landing/             Section-section beranda
  ui/                  Komponen kecil yang dipakai ulang (Button, PageHero, Reveal, dst.)
  admin/               AdminShell (sidebar admin) & CrudPage (tabel + form CRUD generik)
lib/
  site.ts              SATU sumber info situs: nama, kontak, jam buka, sosmed, menu
  content/landing.ts   Query data beranda + tipe datanya
  content/fallback.ts  Konten cadangan bila database kosong
  api/crud.ts          Factory handler CRUD (GET/POST/PUT/DELETE) + cek login admin
  api/resources.ts     Konfigurasi tiap konten CMS (field wajib & pemetaan data)
  auth.ts              Cek login admin (requireAdmin)
  media.ts             Helper file di tabel media
  http.ts              Helper fetch JSON sisi klien
  motion.ts            Easing & varian animasi bersama
  prisma.ts            Prisma client
  hooks/               React hooks
prisma/                Skema & seed database
```

### Mengubah info situs

Nomor WhatsApp, telepon, email, alamat, jam buka, media sosial, dan menu navigasi ada di **`lib/site.ts`**. Ubah sekali di sana dan header, footer, halaman kontak, pendaftaran, serta SEO ikut berubah. Teks hero dan WhatsApp di beranda juga bisa diubah dari **Admin > Pengaturan**.

### API

- Semua `GET` konten bersifat publik, kecuali data pendaftaran (berisi data pribadi).
- Semua operasi tambah/ubah/hapus dan upload **wajib login admin** (`requireAdmin`).
- `POST /api/pendaftaran` tetap publik (formulir pendaftaran).
- Foto upload admin disimpan di tabel `media` dan disajikan lewat `/api/media/[id]`.
  Foto lama di `public/uploads` (volume server produksi) tetap disajikan seperti biasa.

### Menambah jenis konten CMS baru

1. Tambah model di `prisma/schema.prisma`, lalu `npm run db:push`.
2. Tambah satu entri di `lib/api/resources.ts` (label, field wajib, `toData`).
3. Buat `app/api/<nama>/route.ts` dan `app/api/<nama>/[id]/route.ts` (masing-masing 3 baris, contoh: `app/api/faq/`).
4. Buat halaman admin dengan `AdminShell` + `CrudPage` (contoh: `app/admin/faq/page.tsx`) dan tambahkan ke menu di `components/admin/AdminShell.tsx`.

## Deploy

Deploy lewat GitHub Actions (`.github/workflows/deploy.yml`) memakai `Dockerfile` (output `standalone`) dan menjalankan `prisma db push` otomatis.

© PKBM SWASTIKA. All rights reserved.
