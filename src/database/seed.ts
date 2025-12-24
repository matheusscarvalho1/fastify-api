import { db } from "./client"
import { courses, enrollments, users } from "./schema"
import { hash } from 'argon2'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { email } from "zod"

async function seed() {
 const passwordHash = await hash('Teste@123')

 const usersInsert = await db.insert(users).values([
   {
    name: 'test', 
    email: 'test@email.com',
    password: passwordHash,
    role: 'manager',
   },
  {
    name: faker.person.fullName(), 
    email: faker.internet.email(),
    password: passwordHash,
    role: 'student',
   },
  {
    name: faker.person.fullName(), 
    email: faker.internet.email(),
    password: passwordHash,
    role: 'student',
   },
  {
    name: faker.person.fullName(), 
    email: faker.internet.email(),
    password: passwordHash,
    role: 'student',
   },
  {
    name: faker.person.fullName(), 
    email: faker.internet.email(),
    password: passwordHash,
    role: 'student',
   },
  {
    name: faker.person.fullName(), 
    email: faker.internet.email(),
    password: passwordHash,
    role: 'student',
   },
  {
    name: faker.person.fullName(), 
    email: faker.internet.email(),
    password: passwordHash,
    role: 'student',
   },
  {
    name: faker.person.fullName(), 
    email: faker.internet.email(),
    password: passwordHash,
    role: 'student',
   }
 ]).returning()

 const coursesInsert = await db.insert(courses).values([
  { title: faker.lorem.words(8), description: faker.lorem.paragraph() },
  { title: faker.lorem.words(8), description: faker.lorem.paragraph() },
  { title: faker.lorem.words(8), description: faker.lorem.paragraph() },
 ]).returning()

 await db.insert(enrollments).values([
  { courseId: coursesInsert[0].id, userId: usersInsert[0].id },
  { courseId: coursesInsert[0].id, userId: usersInsert[1].id },
  { courseId: coursesInsert[0].id, userId: usersInsert[2].id },
  { courseId: coursesInsert[1].id, userId: usersInsert[3].id },
  { courseId: coursesInsert[1].id, userId: usersInsert[4].id },
  { courseId: coursesInsert[1].id, userId: usersInsert[5].id },
  { courseId: coursesInsert[2].id, userId: usersInsert[6].id },
 ])
}

seed()