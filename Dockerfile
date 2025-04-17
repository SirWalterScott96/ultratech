# Базовий образ
FROM node:18-alpine AS base

WORKDIR /app
RUN apk add --no-cache libc6-compat openssl

# Етап встановлення залежностей
FROM base AS deps
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm ci --legacy-peer-deps

# Етап збірки
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY . .
RUN npx prisma generate
RUN npm install -g tsx

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN npm run build

# Етап продакшена
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN touch /tmp/lead_facebook_log.txt && chmod 666 /tmp/lead_facebook_log.txt

# Install tsx in production environment
RUN npm install -g tsx

USER nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/db ./db
COPY --from=builder --chown=nextjs:nodejs --chmod=755 /app/docker-entrypoint.sh ./

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

ENTRYPOINT ["./docker-entrypoint.sh"]