import { courseService } from "../course.index";
import { createCoachUser } from "../../../shared/seeds/user.seed";
import { userRepo } from "../../users/user.index";
import { COURSE_DATASET } from "../../../shared/data/course.dataset";
import { faker } from "@faker-js/faker";
import { Course } from "../course.entity";
import { authedTestAgent } from "../../../shared/tests/helpers/supertest.helper";

describe("POST /api/v1/courses", () => {
  it("POST /api/v1/courses COACH or ADMIN can create a course with valid data.", async () => {
    const newCoachSeed = createCoachUser();
    const user = await userRepo.create({
      name: newCoachSeed.name,
      password: newCoachSeed.password,
      email: newCoachSeed.email,
      role: newCoachSeed.role,
    });
    const courseElement = faker.helpers.arrayElement(COURSE_DATASET);

    const newCourseSeed: Omit<
      Course,
      "id" | "createdAt" | "updatedAt" | "image"
    > = {
      title: courseElement.name,
      description: courseElement.description,
      creatorId: user.id,
    };

    const res = await authedTestAgent
      .post("/api/v1/courses")
      .send(newCourseSeed);
    expect(res.statusCode).toBe(201);
    console.log(res.body.data, " data");

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

    console.log(res.body);
  });
});
