import { test, expect } from "vitest"
import request from 'supertest'
import { server } from '../../app'
import { faker } from "@faker-js/faker"
import { makeAuthenticatedUser } from "../../tests/factories/make-user"

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

// Testes end-to-end não será rodado na sua máquina para ver se esta tudo funcionando
// Os testes rodam no ambiente de CI / Github Actions, la dentro o banco vai estar sempre zerado, o ambiente de CI sempre vai criar um banco do zero
// Não tem problema o banco ficar rodando migrate toda vez que for executar os testes, ele fica salvo quais migrations ele já executou