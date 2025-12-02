import { MongooseRepository } from "../../shared/genericRepo";
import { Course } from "./course.entity";
import { CourseModel } from "./course.model";

export class CourseRepository extends MongooseRepository<Course> {
  constructor() {
    super(CourseModel);
  }
}
