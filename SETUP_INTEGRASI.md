# Panduan Setup Integrasi Form Pendaftaran

Integrasi form pendaftaran PKBM SWASTIKA dengan Google Sheets dan Email Notification telah berhasil diimplementasikan. Ikuti langkah-langkah berikut untuk mengaktifkan fitur ini.

## 📋 Yang Sudah Diimplementasikan

✅ Dependencies `axios` dan `@emailjs/browser` sudah terinstall
✅ Form pendaftaran sudah terintegrasi dengan:
   - Google Sheets via Sheet.best (untuk menyimpan data pendaftaran)
   - EmailJS (untuk mengirim notifikasi email)
✅ Loading states dan error handling
✅ Environment variables template (`.env.local.example`)

## 🚀 Langkah Setup

### 1. Setup Google Sheets & Sheet.best

#### A. Persiapkan Google Sheet
1. Buka [Google Sheets](https://sheets.google.com)
2. Buat spreadsheet baru dengan nama "PKBM SWASTIKA - Data Pendaftaran"
3. Di baris pertama (header), masukkan kolom berikut:
   ```
   | nama | email | telepon | paket | alamat | tanggalLahir | pendidikanTerakhir | pekerjaan | motivasi | timestamp |
   ```

#### B. Hubungkan dengan Sheet.best
1. Kunjungi [Sheet.best](https://sheet.best)
2. Klik **"Get Started"** atau **"Sign Up"** (gratis)
3. Login dengan akun Google Anda
4. Klik **"Create Connection"**
5. Pilih Google Sheet yang sudah Anda buat
6. Berikan izin akses ke Sheet.best
7. Setelah terhubung, Anda akan mendapatkan **API URL** seperti:
   ```
   https://sheet.best/api/sheets/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```
8. **Salin URL ini** untuk digunakan di langkah berikutnya

### 2. Setup EmailJS

#### A. Buat Akun EmailJS
1. Kunjungi [EmailJS](https://www.emailjs.com)
2. Klik **"Sign Up"** (gratis untuk 200 email/bulan)
3. Daftar dengan email Anda
4. Verifikasi email Anda

#### B. Buat Email Service
1. Setelah login, klik **"Add New Service"**
2. Pilih provider email Anda (Gmail, Outlook, dll)
3. Ikuti instruksi untuk menghubungkan email
4. **Salin Service ID** yang muncul

#### C. Buat Email Template
1. Klik menu **"Email Templates"**
2. Klik **"Create New Template"**
3. Template untuk **Konfirmasi ke Pendaftar**:
   ```
   Subject: Pendaftaran PKBM SWASTIKA - {{nama}}
   
   Halo {{nama}},
   
   Terima kasih telah mendaftar di PKBM SWASTIKA!
   
   Detail Pendaftaran:
   - Nama: {{nama}}
   - Email: {{email}}
   - Telepon: {{telepon}}
   - Program: {{paket}}
   - Tanggal Lahir: {{tanggalLahir}}
   - Alamat: {{alamat}}
   
   Kami akan menghubungi Anda dalam 1-2 hari kerja untuk proses selanjutnya.
   
   Salam,
   Tim PKBM SWASTIKA
   ```
4. Simpan template dan **salin Template ID**

#### D. Dapatkan Public Key
1. Klik menu **"Account"** → **"General"**
2. Temukan **"Public Key"** di bagian API Keys
3. **Salin Public Key** ini

### 3. Konfigurasi Environment Variables

1. Di root project (`d:\pkbm\web_pkbm`), buat file baru bernama `.env.local`
2. Copy isi dari `.env.local.example` ke `.env.local`
3. Ganti nilai-nilai berikut dengan kredensial asli:

```env
# Ganti dengan URL dari Sheet.best
NEXT_PUBLIC_SHEET_BEST_URL=https://sheet.best/api/sheets/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Ganti dengan Service ID dari EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx

# Ganti dengan Template ID dari EmailJS
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx

# Ganti dengan Public Key dari EmailJS
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

4. Simpan file `.env.local`

### 4. Testing

1. **Jalankan development server:**
   ```bash
   npm run dev
   ```

2. **Buka browser** dan akses:
   ```
   http://localhost:3000/pendaftaran
   ```

3. **Isi form pendaftaran** dengan data test:
   - Nama: Test User
   - Email: your-email@gmail.com
   - Telepon: 6285104755189
   - Program: Pilih salah satu
   - Dan field lainnya

4. **Klik "Daftar Sekarang"**

5. **Verifikasi:**
   - ✅ Loading spinner muncul saat submit
   - ✅ Halaman sukses muncul setelah submit
   - ✅ Data muncul di Google Sheet
   - ✅ Email konfirmasi diterima di inbox
   - ❌ Jika ada error, pesan error muncul di form

### 5. Troubleshooting

#### Error: "Terjadi kesalahan saat mengirim data"
- Periksa console browser (F12) untuk detail error
- Pastikan semua environment variables sudah diisi dengan benar
- Pastikan Sheet.best URL valid dan Google Sheet dapat diakses
- Pastikan EmailJS credentials benar

#### Data tidak masuk ke Google Sheet
- Periksa apakah Sheet.best connection masih aktif
- Pastikan nama kolom di Google Sheet sesuai dengan field form
- Cek quota Sheet.best (gratis: 1000 requests/bulan)

#### Email tidak terkirim
- Periksa spam folder
- Pastikan EmailJS Service sudah terverifikasi
- Cek quota EmailJS (gratis: 200 emails/bulan)
- Verifikasi template EmailJS sudah benar

#### CORS Error
- Pastikan menggunakan `NEXT_PUBLIC_` prefix untuk semua environment variables
- Restart development server setelah menambahkan env variables

## 🔒 Keamanan

- ✅ API keys disimpan di environment variables (tidak di-commit ke Git)
- ✅ File `.env.local` sudah ada di `.gitignore`
- ✅ Data dikirim via HTTPS
- ✅ Client-side validation untuk input form
- ⚠️ **JANGAN** commit file `.env.local` ke Git
- ⚠️ **JANGAN** share API keys secara publik

## 📊 Monitoring

### Google Sheets
- Data pendaftaran baru akan otomatis masuk sebagai baris baru
- Anda bisa sort, filter, dan export data sesuai kebutuhan
- Tambahkan kolom "Status" untuk tracking proses pendaftaran

### EmailJS Dashboard
- Monitor jumlah email terkirim
- Cek status delivery
- Review error logs jika ada email gagal

## 🎯 Next Steps (Opsional)

1. **Customize Email Template:**
   - Tambahkan logo PKBM SWASTIKA
   - Styling HTML untuk email lebih menarik
   - Template terpisah untuk admin notification

2. **Enhanced Google Sheet:**
   - Tambahkan formula untuk auto-numbering
   - Timestamp otomatis
   - Conditional formatting untuk status

3. **Production Deployment:**
   - Set environment variables di hosting (Vercel/Netlify)
   - Test di production environment
   - Monitor quota usage

## 📞 Support

Jika ada pertanyaan atau kendala, silakan hubungi developer atau lihat dokumentasi:
- [Sheet.best Docs](https://sheet.best/docs)
- [EmailJS Docs](https://www.emailjs.com/docs/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

---

**Status:** ✅ Ready for Testing
**Last Updated:** November 29, 2025
