# Etapa de build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build TypeScript
RUN npx tsc

# Etapa de runtime
FROM node:22-alpine AS runner

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

# Copia apenas JS compilado
COPY --from=builder /app/dist ./dist

EXPOSE 3333

CMD ["node", "dist/server.js"]

# docker build -t meu-app .

# docker run -p 3333:3333 meu-app