import { courseService } from "../course.index";
import { createCoachUser } from "../../../shared/seeds/user.seed";
import { userRepo } from "../../users/user.index";
import { COURSE_DATASET } from "../../../shared/data/course.dataset";
import { faker } from "@faker-js/faker";
import { Course } from "../course.entity";
import { makeAuthedTestAgent } from "../../../shared/tests/helpers/supertest.helper";
import { COURSE_ENDPOINT } from "../../../shared/utils/constants.utils";
import { Role } from "../../../shared/utils/types.utils";
import mongoose from "mongoose";

describe("POST /api/v1/courses", () => {
  it("POST /api/v1/courses COACH or ADMIN can create a course with valid data.", async () => {
    const seed = createCoachUser();

    const user = await userRepo.create({
      name: seed.name,
      password: seed.password,
      email: faker.internet.email().toLowerCase(),
      role: "COACH",
    });

    const userId = (user as any).id ?? (user as any)._id?.toString();

    const courseElement = faker.helpers.arrayElement(COURSE_DATASET);

    const newCourseSeed: Omit<
      Course,
      "id" | "createdAt" | "updatedAt" | "creatorId"
    > = {
      title: courseElement.name,
      description: courseElement.description,
      image: null,
    };

    const agent = makeAuthedTestAgent({
      id: userId,
      name: user.name,
      role: user.role,
    });

    const res = await agent.post(COURSE_ENDPOINT).send(newCourseSeed);
    console.log("STATUS:", res.statusCode, "BODY:", res.body);

    expect(res.statusCode).toBe(201);

    expect(res.body).toEqual({
      success: true,
      data: expect.objectContaining({
        title: newCourseSeed.title,
        description: newCourseSeed.description,
      }),
    });

    const createdCourse = await courseService.getCourse(res.body.data.id);

    expect(createdCourse).toBeDefined();
    expect(createdCourse).not.toBeNull();
    expect(Object.keys(createdCourse as any).length).toBeGreaterThanOrEqual(5);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
