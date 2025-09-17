import { faker } from "@faker-js/faker";
import { createRandomCourse } from "../../seeds/course.seed";
import { Course } from "./course.entity";

export const coursesData:Course[]= faker.helpers.multiple( ()=> createRandomCourse() , {count:5});
