# Admin Dashboard - PKBM SWASTIKA

## 🎉 Custom Admin Dashboard Berhasil Diimplementasikan!

### ✅ Fitur yang Sudah Dibuat:

1. **Admin Login System**
   - URL: `/admin/login`
   - Default credentials:
     - Username: `admin`
     - Password: `admin123`
   - Cookie-based authentication
   - Protected routes dengan middleware

2. **Admin Dashboard**
   - URL: `/admin/berita`
   - Fitur lengkap CRUD berita:
     - ✅ Tambah berita baru
     - ✅ Edit berita
     - ✅ Hapus berita
     - ✅ Lihat semua berita dalam tabel
   - Form fields:
     - Judul berita
     - Kategori (Pengumuman, Akademik, Prestasi, Kegiatan)
     - Penulis
     - Ringkasan berita
     - Isi berita lengkap
     - URL gambar

3. **API Endpoints**
   - `GET /api/berita` - Ambil semua berita
   - `POST /api/berita` - Tambah berita baru
   - `GET /api/berita/[id]` - Ambil berita by ID
   - `PUT /api/berita/[id]` - Update berita
   - `DELETE /api/berita/[id]` - Hapus berita
   - `POST /api/auth/login` - Login admin
   - `POST /api/auth/logout` - Logout admin

4. **Data Storage**
   - File: `data/berita.json` - Menyimpan semua data berita
   - File: `data/admin.json` - Kredensial admin

5. **Halaman Berita Publik**
   - URL: `/berita`
   - Otomatis fetch data dari API
   - Tampilkan berita terbaru
   - Responsive design

---

## 📖 Cara Menggunakan:

### Login ke Admin Dashboard:
1. Buka browser: `http://localhost:3000/admin/login`
2. Masukkan username: `admin`
3. Masukkan password: `admin123`
4. Klik "Masuk"

### Menambah Berita Baru:
1. Setelah login, klik tombol **"Tambah Berita Baru"**
2. Isi form:
   - Judul berita
   - Pilih kategori
   - Nama penulis
   - Ringkasan berita (singkat)
   - Isi berita lengkap
   - **Gambar berita** (2 cara):
     - **Upload dari komputer**: Klik area upload, pilih gambar (max 5MB)
     - **Paste URL**: Gunakan URL dari Unsplash, Pexels, dll
3. Klik **"Simpan Berita"**
4. Berita akan langsung muncul di halaman `/berita`

### Mengedit Berita:
1. Di tabel admin, klik tombol **Edit** (ikon pensil kuning)
2. Form akan muncul dengan data berita
3. Ubah data yang diperlukan
4. Klik **"Update Berita"**

### Menghapus Berita:
1. Di tabel admin, klik tombol **Hapus** (ikon trash merah)
2. Konfirmasi penghapusan
3. Berita akan terhapus dari database

### Logout:
1. Klik tombol **"Logout"** di header dashboard

---

## 🔒 Security Features:

- ✅ Protected admin routes dengan middleware
- ✅ Cookie-based authentication
- ✅ Auto redirect jika belum login
- ✅ Credential stored in JSON file (bisa diubah di `data/admin.json`)

---

## 🎨 UI Features:

- Modern gradient design
- Responsive layout
- Modal form untuk tambah/edit
- Table view untuk list berita
- Loading states
- Error handling
- Hover effects
- Smooth transitions

---

## 📝 Cara Ganti Password Admin:

Edit file `data/admin.json`:
```json
{
  "username": "admin",
  "password": "password_baru_anda"
}
```

---

## 🚀 Testing:

1. Start development server (jika belum):
   ```
   npm run dev
   ```

2. Buka browser:
   - Admin: `http://localhost:3000/admin/login`
   - Public: `http://localhost:3000/berita`

3. Login dan coba tambah berita baru
4. Lihat hasilnya di halaman `/berita`

---

## 📦 Files Created:

```
data/
  ├── berita.json          # Data berita
  └── admin.json           # Kredensial admin

public/
  └── uploads/
      └── berita/          # Folder uploaded images
          └── .gitkeep

app/
  ├── api/
  │   ├── berita/
  │   │   ├── route.ts     # GET & POST berita
  │   │   └── [id]/route.ts # GET, PUT, DELETE by ID
  │   ├── auth/
  │   │   ├── login/route.ts
  │   │   └── logout/route.ts
  │   └── upload/
  │       └── route.ts     # Image upload API
  ├── admin/
  │   ├── login/page.tsx   # Login page
  │   └── berita/page.tsx  # Admin dashboard (with upload)
  └── berita/
      ├── page.tsx         # Public berita page
      └── BeritaClient.tsx # Client component

middleware.ts              # Route protection
```

---

## ✨ Keuntungan Sistem Ini:

1. **No More Code Editing** - Admin bisa publish berita tanpa edit source code
2. **User-Friendly** - Interface yang mudah digunakan
3. **Real-time Update** - Berita langsung muncul di website
4. **Full Control** - CRUD lengkap (Create, Read, Update, Delete)
5. **Secure** - Protected dengan authentication
6. **Fast** - JSON-based storage, no database setup needed
7. **Scalable** - Bisa dikembangkan lebih lanjut

---

## 🔮 Future Enhancements (Opsional):

Jika diperlukan di masa depan, bisa ditambahkan:
- Rich text editor (WYSIWYG)
- Image upload ke cloud storage
- Database integration (PostgreSQL/MySQL)
- Multiple admin users
- Pagination
- Search & filter
- Draft berita
- Scheduled publish
- Categories management

---

**Selamat! Admin Dashboard sudah siap digunakan! 🎉**

Tidak perlu push ke GitHub - semua sudah berfungsi di local.
