import { CourseController } from "./course.controller";
import { CourseRepository } from "./course.repository";
import { CourseService } from "./course.service";

export const courseService = new CourseService();
export const courseController = new CourseController(courseService);
export const courseRepo = new CourseRepository();
