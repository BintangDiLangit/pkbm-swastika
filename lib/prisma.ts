import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Validate DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set!')
  console.error('Please set it in your .env.local file or environment variables.')
  throw new Error('DATABASE_URL is required')
}

// Setup adapter for direct PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Connection pool settings
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
})

// Test connection on startup (only in development)
if (process.env.NODE_ENV === 'development') {
  pool.connect()
    .then((client) => {
      console.log('✅ Database connection successful')
      client.release()
    })
    .catch((err) => {
      console.error('❌ Database connection failed:', err.message)
      console.error('💡 Check your DATABASE_URL in .env.local')
      console.error('💡 Make sure PostgreSQL server is running and accessible')
      console.error('💡 Connection string format: postgresql://user:password@host:port/database')
    })
}

const adapter = new PrismaPg(pool)

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  adapter,
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
