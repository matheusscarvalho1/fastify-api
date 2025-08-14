import fastify from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'

import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform} from 'fastify-type-provider-zod'

import { createCourseRoute } from './src/routes/courses/create-course.ts';
import { getCourseByIdRoute } from './src/routes/courses/get-course-by-id.ts';
import { deleteCourseRoute } from './src/routes/courses/delete-course.ts';
import { getCoursesRoute } from './src/routes/courses/get-courses.ts';
import { updateCourseRoute } from './src/routes/courses/update-course.ts';
import scalarAPIReference from '@scalar/fastify-api-reference'

const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
    },
}).withTypeProvider<ZodTypeProvider>();

if(process.env.NODE_ENV === 'development') {
  server.register(fastifySwagger, {
  openapi:{
    info: {
      title: 'APIs Fastify',
      version: '1.0.0',
    }
  },
  transform: jsonSchemaTransform,
})

// server.register(scalarAPIReference, {
//   routePrefix: '/docs',
//   configuration: {
//     theme: 'kepler',
//   }
// })

//SWAGGER UI
server.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})
}




// Serialização é uma forma de eu converter os dados de saida em um outro formato
server.setSerializerCompiler(serializerCompiler)
// Validação é uma checagem nos dados de entrada
server.setValidatorCompiler(validatorCompiler)



server.get('/', (request, reply) => {
// Sempre retornar um objeto das minhas rotas
   return reply.send({ message: 'Hello World!' })
}) 

server.register(createCourseRoute)
server.register(getCoursesRoute)
server.register(getCourseByIdRoute)
server.register(updateCourseRoute)
server.register(deleteCourseRoute)
 

server.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running!')
})