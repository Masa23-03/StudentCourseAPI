import { faker } from "@faker-js/faker";
import { Course } from "../../modules/courses/course.entity";
import { COURSE_DATASET } from "../data/course.dataset";
import { Prisma } from "../../generated/prisma";

export const createRandomCourse = (
  creatorId?: number
):
  | Prisma.CourseUncheckedCreateInput
  | Prisma.CourseCreateWithoutCreatorInput => {
  const courseElement = faker.helpers.arrayElement(COURSE_DATASET);

  const course = {
    title: courseElement.name,
    description: courseElement.description,
    image: null,
  };

  return creatorId ? { ...course, creatorId } : course;
};
