import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set!')
  console.error('Please set it in your .env.local file or environment variables.')
  throw new Error('DATABASE_URL is required')
}

const isPostgres = /^postgres(ql)?:\/\//i.test(process.env.DATABASE_URL)

let prismaClient: PrismaClient

if (isPostgres) {
  // Lazy-import postgres adapter to keep compatibility when using MySQL
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { PrismaPg } = require('@prisma/adapter-pg')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Pool } = require('pg')

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  })

  if (process.env.NODE_ENV === 'development') {
    pool.connect()
      .then((client: any) => {
        console.log('✅ Database connection successful')
        client.release()
      })
      .catch((err: any) => {
        console.error('❌ Database connection failed:', err.message)
        console.error('💡 Check your DATABASE_URL in .env.local')
        console.error('💡 Make sure PostgreSQL server is running and accessible')
        console.error('💡 Connection string format: postgresql://user:password@host:port/database')
      })
  }

  const adapter = new PrismaPg(pool)

  prismaClient = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    adapter,
  })
} else {
  // Non-Postgres (e.g., MySQL) — use default PrismaClient
  prismaClient = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

export const prisma = globalForPrisma.prisma ?? prismaClient

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
