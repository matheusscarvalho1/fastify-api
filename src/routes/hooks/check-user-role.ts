import type { FastifyRequest, FastifyReply } from "fastify";
import jwt from 'jsonwebtoken'
import { getAuthenticatedUserFromRequest } from "../../utils/get-authenticated-user-from-request";

export  function checkUserRole (role: 'student' | 'manager') {
  return async function (request: FastifyRequest, reply: FastifyReply) {
  const user = getAuthenticatedUserFromRequest(request)

  if (user.role !== role) {
    return reply.status(403).send({ message: 'Forbidden: insufficient permissions' })
  }
}
}