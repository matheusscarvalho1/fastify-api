import { test, expect, beforeEach, afterAll } from "vitest"
import request from 'supertest'
import { server } from '../../app'
import { faker } from "@faker-js/faker"
import { makeAuthenticatedUser } from "../../tests/factories/make-user"
import { db } from "../../database/client"
import { courses, users } from "../../database/schema"

// Limpa o banco antes de cada teste para evitar erro de "Email ou Título já existe"
beforeEach(async () => {
  await db.delete(courses)
  await db.delete(users)
})

// Fecha a conexão com o banco após todos os testes para não travar o Docker
afterAll(async () => {
  await server.close()
})

test('create a course', async () => {
 await server.ready()

 const { token } = await makeAuthenticatedUser('manager')
 const response = await request(server.server)
 .post('/courses')
 .set('Content-Type', 'application/json')
 .set('Authorization', token)
 .send({
  title: faker.lorem.words(4)
 })

 expect(response.status).toEqual(201)
 expect(response.body).toEqual({
  courseId: expect.any(String),
 })

 console.log(response.body)
 
})
