import { uniqueIndex } from 'drizzle-orm/pg-core'
import { timestamp } from 'drizzle-orm/pg-core'
import { pgTable, uuid, text, pgEnum } from 'drizzle-orm/pg-core'

export const userRole = pgEnum('user_role', [
  'student',
  'manager'
])

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  role: userRole().notNull().default('student'),
})

export const courses = pgTable('courses', {
    id: uuid().primaryKey().defaultRandom(),
    title: text().notNull().unique(),
    description: text(),

})

export const enrollments = pgTable('enrollments', {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid().notNull().references(() => users.id),
    courseId: uuid().notNull().references(() => courses.id),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    // Para previnir que o usuário se inscreva no mesmo curso 2 ou mais vezes
}, table => {
    return [uniqueIndex().on(table.userId, table.courseId)]
})

// No drizzle a gente não vai ter essa relação 1:1, N:1, N:N então, isso fica na hora que você vai criar o schema do seu banco
// 1 usuário pode estar matriculado em quantos curso? (Vários) =  N
// 1 curso pode ter quantos alunos matriculados? (Vários) = N
// Então a relação é N-N, e todo relacionamento N-N gera uma tabela 'pivot' que é a enrollments