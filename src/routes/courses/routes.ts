import { FastifyInstance } from "fastify"
import { createCourse } from "./create-course"
import { getCourses } from "./get-courses"
import { getCourseById } from "./get-course-by-id"
import { updateCourse } from "./update-course"
import { deleteCourse } from "./delete-course"

export async function coursesRoutes(app: FastifyInstance) {
  await app.register(createCourse)
  await app.register(getCourses)
  await app.register(getCourseById)
  await app.register(updateCourse)
  await app.register(deleteCourse)
}
