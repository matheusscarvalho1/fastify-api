import { test, expect } from "vitest"
import request from 'supertest'
import { server } from '../../app'
import { faker } from "@faker-js/faker"
import { makeCourse } from "../../tests/factories/make-course"

test('delete courses by id', async () => {
 await server.ready()

 const course = await makeCourse()

 const response = await request(server.server)
 .delete(`/courses/${course.id}`)


 expect(response.status).toEqual(200)

 
})

test('return 404 for delete a non existing courses', async () => {
 await server.ready()


 const response = await request(server.server)
 .delete(`/courses/0198b045-6fcc-73ca-bf69-7647ec58d66a`)

 expect(response.status).toEqual(404)

 
})
