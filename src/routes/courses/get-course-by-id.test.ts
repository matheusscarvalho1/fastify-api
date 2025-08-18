import { test, expect } from "vitest"
import request from 'supertest'
import { server } from '../../app'
import { faker } from "@faker-js/faker"
import { makeCourse } from "../../tests/factories/make-course"
import { makeAuthenticatedUser } from "../../tests/factories/make-user"

test('get courses by id', async () => {
 await server.ready()

 const { token } = await makeAuthenticatedUser('manager')
 const course = await makeCourse()

 const response = await request(server.server)
 .get(`/courses/${course.id}`)
 .set('Authorization', token)
 
 expect(response.status).toEqual(200)
 expect(response.body).toEqual({
  course: {
   id: expect.any(String),
   title: expect.any(String),
   description: null,
  }
 })
 
})

test('return 404 to get a non existing courses', async () => {
 await server.ready()

 const { token } = await makeAuthenticatedUser('manager')

 const response = await request(server.server)
 .get(`/courses/0198b045-6fcc-73ca-bf69-7647ec58d66a`)
 .set('Authorization', token)

 expect(response.status).toEqual(404)

 
})
