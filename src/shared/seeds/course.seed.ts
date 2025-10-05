import { faker } from "@faker-js/faker";
import { Course } from "../../modules/courses/course.entity";
import { COURSE_DATASET } from "../data/course.dataset";

export const createRandomCourse = (
  role: "ADMIN" | "COACH" = "ADMIN"
): Omit<Course, "id" | "image" | `creatorId`> => {
  const courseElement = faker.helpers.arrayElement(COURSE_DATASET);

  const randomCourse = {
    title: courseElement.name,
    description: courseElement.description,
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  };
  return randomCourse;
};
