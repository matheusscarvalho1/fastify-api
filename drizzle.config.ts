import { defineConfig } from "drizzle-kit"

if (!process.env.DATABASE_DOCKER_URL) {
    throw new Error('DATABASE_DOCKER_URL env is required.')
}

export default defineConfig({
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_DOCKER_URL,
    },
    // out - Qual pasta vou jogar os arquivos gerados automaticamente pelo drizzle
    out: './drizzle',
    // schema - Aonde estão os arquivos que eu vou usar para definir o banco de dados (o código da aplicação define quais tabelas eu tenho/quero)
    schema: './src/database/schema.ts',
})