import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../../database/client"
import { courses } from "../../database/schema"
import z from "zod"
import { eq } from "drizzle-orm"
import { checkUserRole } from "../hooks/check-user-role"
import { checkRequestJWT } from "../hooks/check-request-jwt"

export const deleteCourse: FastifyPluginAsyncZod = async (server) => {
    server.delete('/courses/:id', {
          preHandler: [
              checkRequestJWT,
              checkUserRole('manager'),
            ],
          schema: {
            tags: ['courses'],
            summary: 'Delete course by ID',
            params: z.object({
              id: z.uuid(),
            }),
            response: {
           200: z.object({
              message: z.string(),
            }),
            404: z.object({
              message: z.string(),
            }),
            },
          },
        }, 
        async (request, reply) => {
        const { id } = request.params

        const result = await db
        .delete(courses)
        .where(eq(courses.id, id))
        .returning()

        if(result.length === 0){
            return reply.status(404).send({ message: 'Curso não encontrado' })
        }

    return reply.status(200).send({ message: 'Curso apagado' })
 })

}