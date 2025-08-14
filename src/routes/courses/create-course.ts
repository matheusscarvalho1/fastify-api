import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../../database/client"
import { courses } from "../../database/schema"
import z from "zod"

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
    server.post('/courses', {
  schema: {
    tags: ['courses'],
    summary: 'Create a course',
    description: 'This route recieve a title and a optional description and create a course on database',
    body: z.object({
      title: z.string().min(5, 'Título precisa ter 5 caracteres'),
      description: z.string().min(5).optional()
    }),
    response: {
        201: z.object({ courseId: z.uuid() }).describe('Course created successfully')
    }
  },
}, async (request, reply) => {

    const { title, description } = request.body

    const result = await db
    .insert(courses)
    .values({ title: title, description: description})
    // Com o returning ele retorna o valor inserido
    .returning()
   
    // Sempre teremos um array retornado do banco de dados
    return reply.status(201).send({ courseId: result[0].id })
})
}