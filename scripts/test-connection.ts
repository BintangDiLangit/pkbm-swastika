import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Setup adapter for direct PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  adapter,
});

async function testConnection() {
  try {
    console.log('🔌 Testing PostgreSQL connection...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@')); // Hide password
    
    // Test connection by trying to connect
    await prisma.$connect();
    console.log('✅ Successfully connected to PostgreSQL!');
    
    // Test a simple query
    const adminCount = await prisma.admin.count();
    console.log(`📊 Admin table has ${adminCount} row(s)`);
    
    const beritaCount = await prisma.berita.count();
    console.log(`📊 Berita table has ${beritaCount} row(s)`);
    
    const galeriCount = await prisma.galeri.count();
    console.log(`📊 Galeri table has ${galeriCount} row(s)`);
    
    console.log('🎉 Connection test successful!');
    
  } catch (error: any) {
    console.error('❌ Connection failed!');
    console.error('Error:', error.message);
    
    if (error.code === 'ENOTFOUND') {
      console.error('💡 Tip: Check if the hostname is correct');
    } else if (error.code === 'EAUTH') {
      console.error('💡 Tip: Check if the username and password are correct');
    } else if (error.message?.includes('authentication')) {
      console.error('💡 Tip: Check if the database user has proper permissions');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
