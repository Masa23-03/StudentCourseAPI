import { CoursePrisma } from "../../shared/services/prisma.service";
import { Repository } from "../../shared/genericRepo";
import { Course } from "./course.entity";
export class CourseRepository extends Repository<Course, typeof CoursePrisma> {
  constructor() {
    super(CoursePrisma);
  }
}
