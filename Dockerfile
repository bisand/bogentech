ARG NODE_VERSION=lts

FROM node:${NODE_VERSION}-alpine AS base

# FROM base AS deps
# WORKDIR /app
# RUN npm install -g pnpm
# COPY package.json pnpm-lock.yaml ./
# RUN pnpm install --frozen-lockfile

FROM base AS builder
ENV NODE_ENV=production
WORKDIR /app
RUN npm install -g pnpm
# COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm install
RUN pnpm run build
RUN mkdir -p /app/.output/server/node_modules/unstorage/drivers/
RUN cp -r /app/node_modules/unstorage/drivers/* /app/.output/server/node_modules/unstorage/drivers/

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nitro
COPY --from=builder /app/.output .
USER nitro
EXPOSE 3000
ENV PORT=3000
CMD ["node", "/app/server/index.mjs"]
