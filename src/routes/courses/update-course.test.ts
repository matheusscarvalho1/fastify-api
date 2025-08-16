import { test, expect } from "vitest"
import request from "supertest"
import { server } from "../../app"
import { makeCourse } from "../../tests/factories/make-course"

test('delete course successfully', async () => {
  await server.ready()

  const course = await makeCourse()

  const response = await request(server.server)
    .delete(`/courses/${course.id}`)

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    message: "Curso apagado"
  })
})

test('return 404 when deleting a non-existing course', async () => {
  await server.ready()

  const response = await request(server.server)
    .delete(`/courses/0198b045-6fcc-73ca-bf69-7647ec58d66a`)

  expect(response.status).toEqual(404)
  expect(response.body).toEqual({
    message: "Curso não encontrado"
  })
})
