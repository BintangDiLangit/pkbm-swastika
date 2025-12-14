import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

// Setup adapter for direct PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user with hashed password
  const adminPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {
      password: adminPassword,
    },
    create: {
      username: 'admin',
      password: adminPassword,
    },
  });

  console.log('✅ Admin user created:', admin.username);

  // Migrate existing berita data from JSON
  const beritaFile = path.join(process.cwd(), 'data', 'berita.json');
  if (fs.existsSync(beritaFile)) {
    try {
      const beritaData = JSON.parse(fs.readFileSync(beritaFile, 'utf-8'));
      
      if (Array.isArray(beritaData) && beritaData.length > 0) {
        for (const item of beritaData) {
          // Check if item already exists (by checking if we can find it)
          // Since old IDs might not be UUIDs, we'll create new ones
          const existing = await prisma.berita.findFirst({
            where: {
              title: item.title,
              createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
            },
          });

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
        console.log(`✅ Migrated ${beritaData.length} berita items`);
      }
    } catch (error) {
      console.error('Error migrating berita:', error);
    }
  }

  // Migrate existing galeri data from JSON
  const galeriFile = path.join(process.cwd(), 'data', 'galeri.json');
  if (fs.existsSync(galeriFile)) {
    try {
      const galeriData = JSON.parse(fs.readFileSync(galeriFile, 'utf-8'));
      
      if (Array.isArray(galeriData) && galeriData.length > 0) {
        for (const item of galeriData) {
          // Check if item already exists
          const existing = await prisma.galeri.findFirst({
            where: {
              title: item.title,
              image: item.image,
              createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
            },
          });

          if (!existing) {
            await prisma.galeri.create({
              data: {
                title: item.title,
                category: item.category || null,
                image: item.image,
                createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
              },
            });
          }
        }
        console.log(`✅ Migrated ${galeriData.length} galeri items`);
      }
    } catch (error) {
      console.error('Error migrating galeri:', error);
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
