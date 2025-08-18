import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../../database/client"
import { courses } from "../../database/schema"
import z from "zod"
import { eq } from "drizzle-orm"
import { checkRequestJWT } from "../hooks/check-request-jwt"
import { getAuthenticatedUserFromRequest } from "../../utils/get-authenticated-user-from-request"
import { checkUserRole } from "../hooks/check-user-role"

export const getCourseById: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/courses/:id',
    {
      preHandler: [
        checkRequestJWT,
        checkUserRole('manager'),
      ],
      schema: {
        tags: ['courses'],
        summary: 'Get course by ID',
        description: 'This route get courses on database',
        params: z.object({
          id: z.uuid(),
        }),
        response: {
          200: z.object({
            course: z.object({
              id: z.uuid(),
              title: z.string(),
              description: z.string().nullable(),
            }),
          }),
          404: z.null().describe('Course not found'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await db
        .select()
        .from(courses)
        .where(eq(courses.id, id))

      if (result.length > 0) {
        return { course: result[0] }
      }
      return reply.status(404).send()
    }
  )
}
