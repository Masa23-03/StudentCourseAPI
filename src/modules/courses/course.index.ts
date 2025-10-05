import { CourseController } from "./course.controller";
import { CourseService } from "./course.service";

export const courseService=new CourseService();
export const courseController=new CourseController(courseService);
