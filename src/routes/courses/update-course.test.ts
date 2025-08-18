import { test, expect } from "vitest"
import request from "supertest"
import { server } from "../../app"
import { makeCourse } from "../../tests/factories/make-course"
import { makeAuthenticatedUser } from "../../tests/factories/make-user"

test('update a course successfully', async () => {
  await server.ready()

  const { token } = await makeAuthenticatedUser('manager')
  const course = await makeCourse()

  const response = await request(server.server)
    .delete(`/courses/${course.id}`)
    .set('Authorization', token)

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    message: "Curso apagado"
  })
})

test('return 404 when updating a non-existing course', async () => {
  await server.ready()
  
  const { token } = await makeAuthenticatedUser('manager')

  const nonExistingId = '0198b045-6fcc-73ca-bf69-7647ec58d66a'

   const response = await request(server.server)
    .put(`/courses/${nonExistingId}`)
    .set('Authorization', token)
    .send({
      title: 'Valid Title',
      description: 'Valid description' 
    })

  expect(response.status).toEqual(404)
  expect(response.body).toEqual({
    message: "Curso não encontrado"
  })
})
