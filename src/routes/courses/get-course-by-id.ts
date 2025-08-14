import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../../database/client"
import { courses } from "../../database/schema"
import z from "zod"
import { eq } from "drizzle-orm"

export const getCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/courses/:id',
    {
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
