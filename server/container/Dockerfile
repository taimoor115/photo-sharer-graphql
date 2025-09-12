# --- Base image ---
FROM node:18-alpine AS base
WORKDIR /app

# --- Dependencies stage (production deps only) ---
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production

# --- Build stage (with dev deps if needed) ---
FROM base AS build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
# If using TS:
# RUN npm run build

# --- Final runtime stage ---
FROM base AS runtime
ENV NODE_ENV=production

# Copy only production deps
COPY --from=deps /app/node_modules ./node_modules
# Copy app source
COPY --from=build /app ./

# Ensure Prisma Client exists
# (skip if you copy `.prisma` from build)
RUN npx prisma generate

EXPOSE 4000

# Run migrations and start app
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
