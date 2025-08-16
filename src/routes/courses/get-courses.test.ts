import { test, expect } from "vitest"
import { randomUUID } from 'node:crypto'
import request from 'supertest'
import { server } from '../../app'
import { faker } from "@faker-js/faker"
import { makeCourse } from "../../tests/factories/make-course"
import { courses } from "../../database/schema"

test('get courses', async () => {
 await server.ready()

 const titleId = randomUUID()

 const course = await makeCourse(titleId)

 const response = await request(server.server)
 .get(`/courses?search=${titleId}`)


 expect(response.status).toEqual(200)

 expect(response.body).toEqual({
  courses: [
   {
    id: expect.any(String),
    title: titleId,
    description: null,
    enrollments: 0,
   }
  ],
  total: 1,
 })

 console.log(response.body)
 
})
