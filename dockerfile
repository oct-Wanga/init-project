FROM node:20-alpine AS base

# Environmental information for build, default : dev
ARG BUILD_ENV=dev

# Install dependencies only when needed
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app

COPY .env.$BUILD_ENV ./
COPY package*.json ./
COPY . .

RUN npm install --frozen-lockfile
RUN npm test
RUN npm run build:$BUILD_ENV

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /usr/src/app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /usr/src/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
