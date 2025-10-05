import { faker } from "@faker-js/faker";
import { Course } from "../../modules/courses/course.entity";
import { COURSE_DATASET } from "../data/course.dataset";
import { usersData } from "../../modules/users/user.data";
import { CustomError } from "../utils/error.utils";
import { User } from "../../modules/users/user.entity";

function pickUserIdByRole(role: "ADMIN" | "COACH" = "ADMIN"): string {
  const u = usersData.find((x: User) => x.role === role);
  if (!u) {
    throw new Error(`No seeded user with role ${role}`);
  }
  return u.id;
}

export const createRandomCourse = (
  role: "ADMIN" | "COACH" = "ADMIN"
): Course => {
  const courseElement = faker.helpers.arrayElement(COURSE_DATASET);

  const randomCourse: Course = {
    id: faker.string.uuid(),
    title: courseElement.name,
    description: courseElement.description,
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
    creatorId: pickUserIdByRole(role),
  };
  return randomCourse;
};
