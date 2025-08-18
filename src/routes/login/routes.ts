import { FastifyInstance } from "fastify"
import { login } from "./login"

export async function authRoutes(app: FastifyInstance) {
  await app.register(login)
}
