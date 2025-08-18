import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../../database/client"
import { courses, enrollments } from "../../database/schema"
// ilike -> Do drizzle encontra dados não diferenciando letras maiusculas e minusculas
import { ilike, asc, and, SQL, eq, count } from 'drizzle-orm'
import z from "zod"
import { checkRequestJWT } from "../hooks/check-request-jwt"
import { checkUserRole } from "../hooks/check-user-role"

// Search parms -> Usados em filtros, eles não são obrigatórios
// Todo 'querystring' é opcional

export const getCourses: FastifyPluginAsyncZod = async (server) => {
    server.get('/courses', {
          preHandler: [
              checkRequestJWT,
              checkUserRole('manager'),
            ],
          schema: {
            tags: ['courses'],
            summary: 'Get all courses',
            querystring: z.object({
              search: z.string().optional(),
              orderBy: z.enum(['id','title']).optional().default('id'),
              page: z.coerce.number().optional().default(1)
            }),
            response: {
                200: z.object({
                    courses: z.array(z.object({
                    id: z.uuid(),
                    title: z.string(),
                    description: z.string().nullable(),
                    enrollments: z.number(),
                })),
                total: z.number(),
                })
            }
          },
        
    }, async (request, reply) => {
    const { search, orderBy, page } = request.query

    const conditions: SQL[] = []

    if (search) {
      conditions.push(ilike(courses.title, `%${search}%`))
    }

    const [result, total] = await Promise.all([
      db.select({
      id: courses.id,
      title: courses.title,
      description: courses.description,
      enrollments: count(enrollments.id)
    }).from(courses)
    .leftJoin(enrollments, eq(enrollments.courseId, courses.id))
    .orderBy(asc(courses[orderBy]))
    .limit(10)
    .offset((page - 1) * 2)
    .where(and(...conditions))
    .groupBy(courses.id),
    db.$count(courses, and(...conditions))
    ])  
    
    // Inner join - Precisam que os dois lados existam, então cursos que não tem nenhuma matricula foram removidos do resultado
    // Se usar um Left Join - Precisa que apenas o lado esquerdo da relação exista - Lado esquerdo é sempre quem está no nosso 'from', lado direito é quem ta dentro do join
   return reply.send({ courses: result, total })
})
}