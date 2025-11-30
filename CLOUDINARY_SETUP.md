# 🌥️ Setup Cloudinary untuk Upload Gambar

## Langkah 1: Daftar Akun Cloudinary (Gratis)

1. Buka https://cloudinary.com/users/register/free
2. Isi form pendaftaran:
   - Email
   - Password
   - Nama
3. Verifikasi email
4. Login ke dashboard Cloudinary

## Langkah 2: Dapatkan Credentials

Setelah login, Anda akan melihat **Dashboard** dengan informasi:

```
Cloud name: xxxxxxxx
API Key: 123456789012345
API Secret: xxxxxxxxxxxxxxxxxxxx
```

## Langkah 3: Copy Credentials ke .env.local

1. Buka file `.env.local` di root project
2. Ganti nilai berikut dengan credentials Anda:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=xxxxxxxx
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxxxx
```

## Langkah 4: Restart Development Server

```bash
# Stop server (Ctrl+C di terminal)
# Lalu jalankan lagi:
npm run dev
```

## Langkah 5: Test Upload

1. Buka http://localhost:3002/admin/login
2. Login dengan username: `admin`, password: `admin123`
3. Klik "Tambah Berita Baru" atau "Tambah Foto Baru"
4. Upload gambar
5. Gambar akan tersimpan di Cloudinary dan preview langsung muncul!

## ✅ Keuntungan Cloudinary

- **Gratis**: 25GB storage + 25GB bandwidth/bulan
- **CDN Global**: Akses cepat dari mana saja
- **Auto-optimize**: Gambar otomatis di-compress
- **Permanent**: Gambar tidak hilang saat redeploy
- **Responsive**: Auto-resize sesuai kebutuhan

## 🔧 Troubleshooting

### Error: "Invalid credentials"
- Pastikan `.env.local` sudah diisi dengan benar
- Restart dev server setelah mengubah `.env.local`

### Error: "Upload failed"
- Cek koneksi internet
- Pastikan ukuran file < 5MB
- Pastikan file adalah gambar (JPG, PNG, GIF, WebP)

### Gambar tidak muncul
- Buka console browser (F12)
- Lihat error message
- Pastikan URL dari Cloudinary valid (https://res.cloudinary.com/...)

## 📝 Catatan Production

Untuk production (pkbmswastika.sch.id), tambahkan environment variables di hosting:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=xxxxx
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx
```

Biasanya di panel hosting seperti Vercel/Netlify ada menu "Environment Variables".
