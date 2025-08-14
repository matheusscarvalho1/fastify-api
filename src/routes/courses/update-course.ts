import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../../database/client"
import { courses } from "../../database/schema"
import z from "zod"
import { eq } from "drizzle-orm"

export const updateCourseRoute: FastifyPluginAsyncZod = async (server) => {
    server.put('/courses/:id', async (request, reply) => {
     type ParamsType = {
        id: string
    }
      type BodyType = {
        title: string,
        description?: string
    }

    const params = request.params as ParamsType
    const body = request.body as BodyType
    
    const courseId = params.id
    const courseTitle = body.title

    if(!courseTitle) {
        return reply.status(422).send({ message: "Título obrigatório" })
    }
    

    
    const result = await db
    .update(courses)
    .set({ title: courseTitle })
    .where(eq(courses.id, courseId))

    if(!result){
        return reply.status(404).send({ message: 'Curso não encontrado' })
    }

   return reply.status(200).send({ message: 'Curso atualizado' })
 }) 

}