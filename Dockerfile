# Multi-stage build for Next.js

# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package files
COPY package.json ./

# Copy package-lock.json if it exists (it might be in .gitignore)
# Using wildcard to avoid build failure if file doesn't exist
COPY package-lock.json* ./

# Install dependencies
# Check if package-lock.json exists and use appropriate command
RUN set -e; \
    if [ -f package-lock.json ]; then \
      echo "✓ Found package-lock.json, using npm ci"; \
      npm ci --legacy-peer-deps || npm install --legacy-peer-deps; \
    else \
      echo "⚠ package-lock.json not found, using npm install"; \
      npm install --legacy-peer-deps; \
    fi

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy Prisma schema and config
COPY prisma ./prisma
COPY prisma.config.ts ./

# Copy rest of the application
COPY . .

# Generate Prisma Client
# DATABASE_URL is required by prisma.config.ts but not actually used during generate
# Using dummy URL for build stage (Prisma generate doesn't connect to DB)
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy?schema=public"
RUN npx prisma generate

# Build Next.js application
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Create uploads directory structure (will be mounted as volume in production)
RUN mkdir -p ./public/uploads/galeri ./public/uploads/berita ./public/uploads/general

# Copy Prisma Client (needed at runtime)
# Next.js standalone should include it, but copy explicitly to be safe
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

# Expose port
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start Next.js
CMD ["node", "server.js"]
