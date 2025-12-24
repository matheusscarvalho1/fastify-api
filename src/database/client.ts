import { drizzle } from 'drizzle-orm/node-postgres'

export const db = drizzle(process.env.DATABASE_DOCKER_URL, {
    logger: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test',
})