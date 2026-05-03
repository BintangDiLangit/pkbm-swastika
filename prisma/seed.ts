import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const isPostgres = /^postgres(ql)?:\/\//i.test(process.env.DATABASE_URL || '')

let prisma: PrismaClient
if (isPostgres) {
  // Lazy import to keep compatibility for MySQL setups
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { PrismaPg } = require('@prisma/adapter-pg')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Pool } = require('pg')

  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaPg(pool)
  prisma = new PrismaClient({ adapter })
} else {
  prisma = new PrismaClient()
}

async function main() {
  console.log('🌱 Starting seed...');

  // === Admin ===
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: { password: adminPassword },
    create: { username: 'admin', password: adminPassword },
  });
  console.log('✅ Admin user:', admin.username);

  // === Programs ===
  const programs = [
    {
      code: 'A',
      title: 'Paket A',
      subtitle: 'Setara SD/MI',
      description:
        'Program pendidikan dasar untuk siapa saja yang belum atau ingin menyelesaikan pendidikan setara Sekolah Dasar.',
      features: ['Durasi 2-3 tahun', 'Ijazah resmi setara SD/MI', 'Jadwal fleksibel sore/malam'],
      image: '/images/kelas.jpeg',
      duration: '2-3 tahun',
      order: 1,
    },
    {
      code: 'B',
      title: 'Paket B',
      subtitle: 'Setara SMP/MTs',
      description:
        'Lanjutkan pendidikan menengah pertama dan buka pintu untuk jenjang yang lebih tinggi.',
      features: ['Durasi 2-3 tahun', 'Ijazah resmi setara SMP/MTs', 'Bisa lanjut ke SMA/SMK'],
      image: '/images/diskusi.jpg',
      duration: '2-3 tahun',
      badge: 'POPULER',
      order: 2,
    },
    {
      code: 'C',
      title: 'Paket C',
      subtitle: 'Setara SMA/MA',
      description:
        'Persiapkan diri untuk kuliah, dunia kerja, atau membangun usaha dengan ijazah setara SMA.',
      features: ['Durasi 2-3 tahun', 'Ijazah resmi setara SMA/MA', 'Bisa lanjut kuliah & kerja'],
      image: '/images/ujian.jpg',
      duration: '2-3 tahun',
      order: 3,
    },
    {
      code: 'KETERAMPILAN',
      title: 'Pelatihan Keterampilan',
      subtitle: 'Life Skill & Vokasi',
      description:
        'Kursus singkat keterampilan kerja: tata boga, menjahit, komputer dasar, dan kewirausahaan.',
      features: ['Sertifikat kompetensi', 'Praktik langsung', 'Pendampingan usaha'],
      image: '/images/workshop.jpg',
      duration: '3-6 bulan',
      badge: 'BARU',
      order: 4,
    },
  ];

  for (const p of programs) {
    await prisma.program.upsert({
      where: { code: p.code },
      update: p,
      create: p,
    });
  }
  console.log(`✅ ${programs.length} programs seeded`);

  // === Stats (alumni impact) ===
  const stats = [
    { label: 'Alumni Bekerja', value: '350+', caption: 'di sektor formal & informal', icon: 'FaBriefcase', order: 1 },
    { label: 'Lanjut Pendidikan', value: '120+', caption: 'ke SMK, SMA, & perguruan tinggi', icon: 'FaGraduationCap', order: 2 },
    { label: 'Wirausaha', value: '60+', caption: 'membuka usaha mandiri', icon: 'FaStore', order: 3 },
    { label: 'Total Lulusan', value: '530+', caption: 'sejak berdiri', icon: 'FaUsers', order: 4 },
  ];

  for (const s of stats) {
    const existing = await prisma.stat.findFirst({ where: { label: s.label } });
    if (existing) {
      await prisma.stat.update({ where: { id: existing.id }, data: s });
    } else {
      await prisma.stat.create({ data: s });
    }
  }
  console.log(`✅ ${stats.length} stats seeded`);

  // === Testimonials ===
  const testimonials = [
    {
      name: 'Ibu Sari',
      role: 'Alumni Paket B, 2022',
      quote:
        'Dulu saya berhenti sekolah karena harus bantu keluarga. Di PKBM Swastika, saya bisa lanjut belajar tanpa malu. Sekarang anak saya bangga punya ibu lulusan SMP.',
      avatar: 'https://ui-avatars.com/api/?name=Ibu+Sari&background=DBEAFE&color=1D4ED8&bold=true',
      order: 1,
    },
    {
      name: 'Andi Pratama',
      role: 'Alumni Paket C, 2023',
      quote:
        'Berkat ijazah Paket C, saya diterima kerja di pabrik. Jadwal belajarnya fleksibel, jadi saya tetap bisa kerja sambilan saat sekolah.',
      avatar: 'https://ui-avatars.com/api/?name=Andi+Pratama&background=FEF9C3&color=CA8A04&bold=true',
      order: 2,
    },
    {
      name: 'Pak Yusuf',
      role: 'Alumni Paket C, 2021',
      quote:
        'Umur saya 45 tahun ketika daftar. Pengajarnya sabar, teman-temannya seperti keluarga. Sekarang saya buka warung sendiri.',
      avatar: 'https://ui-avatars.com/api/?name=Pak+Yusuf&background=DBEAFE&color=1D4ED8&bold=true',
      order: 3,
    },
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name } });
    if (existing) {
      await prisma.testimonial.update({ where: { id: existing.id }, data: t });
    } else {
      await prisma.testimonial.create({ data: t });
    }
  }
  console.log(`✅ ${testimonials.length} testimonials seeded`);

  // === FAQs ===
  const faqs = [
    {
      question: 'Apakah ada batasan usia untuk mendaftar?',
      answer:
        'Tidak ada batas usia maksimal. PKBM Swastika menerima peserta didik dari berbagai usia — anak putus sekolah, remaja, dewasa, hingga lansia yang ingin belajar.',
      category: 'umur',
      order: 1,
    },
    {
      question: 'Berapa biaya belajar di PKBM Swastika?',
      answer:
        'Biaya sangat terjangkau dan dapat dicicil. Tersedia juga jalur subsidi & beasiswa untuk peserta dari keluarga kurang mampu. Hubungi kami untuk informasi detail.',
      category: 'biaya',
      order: 2,
    },
    {
      question: 'Apakah ijazahnya diakui dan setara sekolah formal?',
      answer:
        'Ya. Ijazah Paket A, B, dan C kami diterbitkan resmi sesuai regulasi Kemendikbudristek dan setara dengan ijazah SD, SMP, dan SMA. Bisa digunakan untuk lanjut sekolah, kuliah, atau melamar kerja.',
      category: 'ijazah',
      order: 3,
    },
    {
      question: 'Bagaimana jadwal belajarnya? Apakah fleksibel?',
      answer:
        'Sangat fleksibel. Tersedia kelas pagi, sore, dan akhir pekan. Cocok untuk yang sambil bekerja, mengurus keluarga, atau memiliki kesibukan lain.',
      category: 'jadwal',
      order: 4,
    },
    {
      question: 'Apa saja syarat pendaftaran?',
      answer:
        'Cukup membawa fotokopi KTP/KK, ijazah terakhir (jika ada), dan pas foto. Kalau ijazah hilang, jangan khawatir — kami bantu prosesnya.',
      category: 'pendaftaran',
      order: 5,
    },
    {
      question: 'Apakah ada pelatihan keterampilan tambahan?',
      answer:
        'Ada. Kami menyediakan pelatihan keterampilan kerja seperti tata boga, menjahit, komputer dasar, dan kewirausahaan untuk membekali alumni siap kerja.',
      category: 'program',
      order: 6,
    },
  ];

  for (const f of faqs) {
    const existing = await prisma.faq.findFirst({ where: { question: f.question } });
    if (existing) {
      await prisma.faq.update({ where: { id: existing.id }, data: f });
    } else {
      await prisma.faq.create({ data: f });
    }
  }
  console.log(`✅ ${faqs.length} FAQs seeded`);

  // === Alumni Destinations ===
  const destinations = [
    { name: 'Universitas Brawijaya', type: 'kampus', order: 1 },
    { name: 'Universitas Negeri Malang', type: 'kampus', order: 2 },
    { name: 'Politeknik Negeri Malang', type: 'kampus', order: 3 },
    { name: 'Universitas Muhammadiyah Malang', type: 'kampus', order: 4 },
    { name: 'Pegawai Pabrik', type: 'karier', order: 5 },
    { name: 'UMKM Mandiri', type: 'wirausaha', order: 6 },
    { name: 'Tenaga Kesehatan', type: 'karier', order: 7 },
    { name: 'Tata Boga & Kuliner', type: 'wirausaha', order: 8 },
  ];

  for (const d of destinations) {
    const existing = await prisma.alumniDestination.findFirst({ where: { name: d.name } });
    if (existing) {
      await prisma.alumniDestination.update({ where: { id: existing.id }, data: d });
    } else {
      await prisma.alumniDestination.create({ data: d });
    }
  }
  console.log(`✅ ${destinations.length} alumni destinations seeded`);

  // === Recognitions ===
  const recognitions = [
    {
      title: 'Akreditasi BAN PAUD & PNF',
      issuer: 'Kemendikbudristek',
      description: 'Lembaga terakreditasi nasional',
      order: 1,
    },
    {
      title: 'Izin Operasional Resmi',
      issuer: 'Dinas Pendidikan Kab. Malang',
      description: 'NPSN terdaftar di Dapodik',
      order: 2,
    },
    {
      title: 'Mitra Program Kesetaraan',
      issuer: 'Kemendikbudristek',
      description: 'Penyelenggara Paket A, B, C',
      order: 3,
    },
    {
      title: 'Lembaga Kursus & Pelatihan',
      issuer: 'Direktorat Kursus',
      description: 'Sertifikat keterampilan resmi',
      order: 4,
    },
  ];

  for (const r of recognitions) {
    const existing = await prisma.recognition.findFirst({ where: { title: r.title } });
    if (existing) {
      await prisma.recognition.update({ where: { id: existing.id }, data: r });
    } else {
      await prisma.recognition.create({ data: r });
    }
  }
  console.log(`✅ ${recognitions.length} recognitions seeded`);

  // === Quick Links ===
  const quickLinks = [
    { label: 'Daftar Sekarang', href: '/pendaftaran', icon: 'FaUserPlus', order: 1 },
    { label: 'Lihat Program', href: '/program', icon: 'FaBookOpen', order: 2 },
    { label: 'Jadwal Belajar', href: '/program#jadwal', icon: 'FaCalendarAlt', order: 3 },
    { label: 'Galeri Kegiatan', href: '/galeri', icon: 'FaImages', order: 4 },
    { label: 'Hubungi Kami', href: '/kontak', icon: 'FaPhone', order: 5 },
  ];

  for (const q of quickLinks) {
    const existing = await prisma.quickLink.findFirst({ where: { label: q.label } });
    if (existing) {
      await prisma.quickLink.update({ where: { id: existing.id }, data: q });
    } else {
      await prisma.quickLink.create({ data: q });
    }
  }
  console.log(`✅ ${quickLinks.length} quick links seeded`);

  // === Sample berita (kegiatan & informasi) — only if empty ===
  const beritaCount = await prisma.berita.count();
  if (beritaCount === 0) {
    const sampleBerita = [
      {
        title: 'Pendaftaran Tahun Ajaran Baru Telah Dibuka',
        excerpt: 'Daftarkan diri Anda untuk Paket A, B, atau C. Jadwal fleksibel, biaya terjangkau.',
        content:
          'PKBM Swastika membuka pendaftaran peserta didik baru untuk semua jenjang. Tersedia jadwal pagi, sore, dan akhir pekan. Hubungi kami untuk informasi lengkap.',
        category: 'Pengumuman',
        author: 'Admin PKBM',
        image: '/images/gedung.jpg',
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      },
      {
        title: 'Pelatihan Keterampilan Tata Boga Sukses Digelar',
        excerpt: 'Puluhan warga belajar mengikuti pelatihan tata boga selama dua minggu.',
        content:
          'Kegiatan ini bertujuan membekali warga dengan keterampilan praktis yang bisa langsung diterapkan untuk membuka usaha kuliner rumahan.',
        category: 'Kegiatan',
        author: 'Admin PKBM',
        image: '/images/workshop.jpg',
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      },
      {
        title: 'Alumni Paket C Diterima di Universitas Brawijaya',
        excerpt: 'Prestasi membanggakan dari salah satu alumni angkatan 2023.',
        content:
          'Kami mengucapkan selamat kepada Saudara Andi yang berhasil lolos seleksi mandiri Universitas Brawijaya jurusan Manajemen.',
        category: 'Prestasi',
        author: 'Admin PKBM',
        image: '/images/juara.jpg',
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      },
    ];
    for (const b of sampleBerita) {
      await prisma.berita.create({ data: b });
    }
    console.log(`✅ ${sampleBerita.length} berita seeded`);
  }

  // === Site Settings ===
  const settings = [
    { key: 'hero_title', value: 'PKBM Swastika - Pendidikan untuk Semua' },
    { key: 'hero_subtitle', value: 'Kesempatan belajar tanpa batas usia dan latar belakang' },
    { key: 'hero_image', value: '/images/gedung.jpg' },
    { key: 'contact_address', value: 'Perum Argo Griyatama Regency B5, Boro, Tawangargo, Kec. Karang Ploso, Kabupaten Malang, Jawa Timur 65152' },
    { key: 'contact_phone', value: '(0341) 123-4567' },
    { key: 'contact_whatsapp', value: '6285104755189' },
    { key: 'contact_email', value: 'info@pkbmswastika.com' },
    { key: 'contact_maps', value: 'https://maps.google.com/?q=Perum+Argo+Griyatama+Regency+Karang+Ploso+Malang' },
  ];
  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log(`✅ ${settings.length} site settings seeded`);

  // === Migrate any existing JSON data (legacy) ===
  const beritaFile = path.join(process.cwd(), 'data', 'berita.json');
  if (fs.existsSync(beritaFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(beritaFile, 'utf-8'));
      if (Array.isArray(data)) {
        for (const item of data) {
          const existing = await prisma.berita.findFirst({ where: { title: item.title } });
          if (!existing) {
            await prisma.berita.create({
              data: {
                title: item.title,
                excerpt: item.excerpt || null,
                content: item.content || item.excerpt || '',
                author: item.author || null,
                category: item.category || null,
                image: item.image || null,
                date: item.date || null,
                createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
              },
            });
          }
        }
        console.log(`✅ Migrated legacy berita`);
      }
    } catch (e) {
      console.error('Legacy berita migration error:', e);
    }
  }

  console.log('🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
