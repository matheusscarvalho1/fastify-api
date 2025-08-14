import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../../database/client"
import { courses } from "../../database/schema"
import z from "zod"
import { eq } from "drizzle-orm"

export const deleteCourseRoute: FastifyPluginAsyncZod = async (server) => {
    server.delete('/courses/:id', async (request, reply) => {
     type ParamsType = {
        id: string
    }

    const params = request.params as ParamsType
    const courseId = params.id

    const result = await db
    .delete(courses)
    .where(eq(courses.id, courseId))

    if(!result){
        return reply.status(404).send({ message: 'Curso não encontrado' })
    }

   return reply.status(200).send({ message: 'Curso apagado' })
 })

}