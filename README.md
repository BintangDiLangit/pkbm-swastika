# Website PKBM SWASTIKA

Website resmi PKBM SWASTIKA - Pusat Kegiatan Belajar Masyarakat di Malang yang menyelenggarakan pendidikan nonformal setara SD (Paket A), SMP (Paket B), dan SMA (Paket C).

## 🎯 Fitur

- **Beranda**: Hero section dengan informasi utama dan statistik
- **Tentang Kami**: Profil lembaga, visi misi, struktur organisasi, dan akreditasi
- **Program Pendidikan**: Detail program Paket A, B, C dan pelatihan keterampilan
- **Pendaftaran**: Formulir online untuk pendaftaran peserta didik baru
- **Galeri**: Foto-foto kegiatan, pelatihan, dan acara
- **Berita**: Pengumuman dan artikel terkini
- **Kontak**: Informasi kontak lengkap dengan peta lokasi

## 🚀 Teknologi

- **Next.js 15** - Framework React
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Icons** - Icon library
- **PostgreSQL** - Database production-ready
- **Prisma ORM** - Type-safe database access
- **bcryptjs** - Password hashing untuk keamanan

## 📦 Instalasi

```bash
# Install dependencies
npm install

# Setup database (lihat DATABASE_SETUP.md untuk detail)
# 1. Copy .env.example ke .env.local dan isi DATABASE_URL
# 2. Generate Prisma client
npm run db:generate

# 3. Run database migrations
npm run db:migrate

# 4. Seed database (migrate data dari JSON)
npm run db:seed

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 🗄️ Database

Aplikasi menggunakan **PostgreSQL** dengan **Prisma ORM** untuk penyimpanan data dengan tingkat keamanan tinggi. Lihat [DATABASE_SETUP.md](./DATABASE_SETUP.md) untuk panduan setup lengkap.

### Scripts Database

- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database dengan data awal
- `npm run db:studio` - Buka Prisma Studio untuk melihat data

## 🎨 Tema Warna

- **Primary (Biru)**: #007BFF
- **Secondary (Oranye)**: #FFA500
- **Putih**: #FFFFFF

## 📱 Responsif

Website ini fully responsive dan dapat diakses dengan baik di:
- Desktop
- Tablet
- Mobile

## 📝 Struktur Halaman

```
/                 - Beranda
/tentang          - Tentang Kami
/program          - Program Pendidikan
/pendaftaran      - Pendaftaran
/galeri           - Galeri
/berita           - Berita & Pengumuman
/kontak           - Kontak
```

## 📞 Kontak

- **Alamat**: Jl. Pendidikan No. 123, Malang, Jawa Timur
- **Telepon**: (0341) 123-4567
- **WhatsApp**: +62 851-0475-5189
- **Email**: info@pkbmswastika.com

## 📄 License

© 2025 PKBM SWASTIKA. All rights reserved.
