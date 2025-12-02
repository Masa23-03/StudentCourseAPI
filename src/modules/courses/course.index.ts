import { CourseController } from "./course.controller";
import { CourseRepository } from "./course.repository";
import { CourseService } from "./course.service";
export const courseRepo = new CourseRepository();

export const courseService = new CourseService(courseRepo);
export const courseController = new CourseController(courseService);
