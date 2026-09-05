import { faker } from "@faker-js/faker";
import { Course } from "../../modules/courses/course.entity";
import { COURSE_DATASET } from "../data/course.dataset";

export const createRandomCourse = (role: "ADMIN" | "COACH" = "ADMIN") => {
  const courseElement = faker.helpers.arrayElement(COURSE_DATASET);

  const randomCourse: Omit<
    Course,
    "authorId" | "id" | "updatedAt" | "createdAt" | "image" | "creatorId"
  > = {
    title: courseElement.name,
    description: courseElement.description,
  };
  return randomCourse;
};
