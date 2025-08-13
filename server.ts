import fastify from 'fastify'
import crypto from 'node:crypto'

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
});

const courses = [
    { id: '1', title: 'Curso de Node.js'},
    { id: '2', title: 'Curso de React'},
    { id: '3', title: 'Curso de React Native'},
]

server.get('/', (request, reply) => {
// Sempre retornar um objeto das minhas rotas
   return reply.send({ message: 'Hello World!' })
}) 

server.get('/courses', (request, reply) => {
   return reply.send({ courses })
})

server.get('/courses/:id', (request, reply) => {
    type ParamsType = {
        id: string
    }

    const params = request.params as ParamsType
    const courseId = params.id

    const course = courses.find(course => course.id === courseId)

    if (course) {
        return { course }
    } 
   return reply.status(404).send()
}) 

server.post('/courses', (request, reply) => {

     type BodyType = {
        title: string
    }

    const courseId = crypto.randomUUID();

    const body = request.body as BodyType
    const courseTitle = body.title

    if(!courseTitle) {
        return reply.status(422).send({ message: "Título obrigatório" })
    }

    const existingCourse = courses.some(course => course.title === courseTitle);
    if (existingCourse) {
        return reply.status(400).send({ message: 'Curso já existe.' });
    }

    courses.push({ id: courseId, title: courseTitle })
   
    return reply.status(201).send({courseId})
})

server.delete('/courses/:id', (request, reply) => {
     type ParamsType = {
        id: string
    }

    const params = request.params as ParamsType
    const courseId = params.id

    const courseIndex = courses.findIndex(course => course.id === courseId)

    if (courseIndex !== -1) {
        const deletedCourse = courses.splice(courseIndex, 1)
        return { deletedCourse };
    } 
   return reply.status(404).send({ message: 'Curso não encontrado.' })
}) 

server.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running!')
})