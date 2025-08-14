import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../../database/client"
import { courses } from "../../database/schema"
import z from "zod"
import { eq } from "drizzle-orm"

export const updateCourse: FastifyPluginAsyncZod = async (server) => {
  server.put('/courses/:id', {
    schema: {
      tags: ['courses'],
      summary: 'Update course by ID',
      description: 'This route updates a course in the database',
      params: z.object({
        id: z.uuid(),
      }),
      body: z.object({
        title: z.string().min(5, 'Título precisa ter 5 caracteres'),
        description: z.string().min(5).optional(),
      }),
      response: {
        200: z.object({
          course: z.object({
            id: z.uuid(),
            title: z.string(),
            description: z.string().nullable(),
          }),
          message: z.string(),
        }),
        404: z.object({
          message: z.string(),
        }),
        422: z.object({
          message: z.string(),
        }),
      },
    },
  }, async (request, reply) => {
    const { id } = request.params
    const { title, description } = request.body

    const [updatedCourse] = await db
      .update(courses)
      .set({ title, description })
      .where(eq(courses.id, id))
      .returning()

    if (!updatedCourse) {
      return reply.status(404).send({ message: 'Curso não encontrado' })
    }

    return reply.status(200).send({
      course: updatedCourse,
      message: 'Curso atualizado',
    })
  })
}
