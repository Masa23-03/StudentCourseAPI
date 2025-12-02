import { MongooseRepository } from "../../shared/genericRepo";
import { Course } from "./course.entity";

export class CourseRepository extends MongooseRepository<Course> {}
