import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../../database/client"
import { courses } from "../../database/schema"
import z from "zod"

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
    server.get('/courses', {
          schema: {
            tags: ['courses'],
            summary: 'Get all courses',
            response: {
                200: z.object({
                    courses: z.array(z.object({
                    id: z.uuid(),
                    title: z.string(),
                    description: z.string().nullable(),
                }))
                })
            }
          },
        
    }, async (request, reply) => {
    const result = await db.select({
      id: courses.id,
      title: courses.title,
      description: courses.description
    }).from(courses)

   return reply.send({ courses: result })
})
}