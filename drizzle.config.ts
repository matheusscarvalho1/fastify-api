import { defineConfig } from "drizzle-kit"

if (!process.env.DATABASE_DOCKER_URL) {
    throw new Error('DATABASE_DOCKER_URL env is required.')
}

export default defineConfig({
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_DOCKER_URL,
    },

    out: './drizzle',
    schema: './src/database/schema.ts',
})