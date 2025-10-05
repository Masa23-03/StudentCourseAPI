import { CourseRepository } from "./course.repository";
import { Course } from "./course.entity";
import { removeFields } from "../../shared/utils/object.utils";
import { courseResponse } from "./types/dto.types";
import { UserRepository } from "../users/user.repository";

export class CourseService {
  private readonly repo;
  private readonly userRepo = new UserRepository();

  constructor() {
    this.repo = new CourseRepository();
  }
  async getCourses(page: number, limit: number) {
    const take = Math.max(1, Math.min(limit, 100));
    const skip = (Math.max(page, 1) - 1) * take;
    return await this.repo.findAll({
      skip,
      take,
      orderBy: { createdAt: "desc" },
    });
  }
  async getCourse(id: number) {
    const course = await this.repo.findById({ id } as any);
    return course;
  }

  async createCourse(
    title: string,
    description: string,
    creatorId: number,
    image?: string
  ) {
    //check id user exist
    await this.userRepo.findById({ id: creatorId } as any);

    const course: Omit<Course, "id"> = {
      title,
      description,
      creatorId,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: image ?? null,
    };

    const courseCreated = await this.repo.create(course);

    return courseCreated;
  }
  async updateCourse(
    id: number,
    title?: string,
    description?: string,
    image?: string
  ) {
    const course = await this.repo.findById({ id });
    if (!course) return null;

    const updatedCourse: Partial<Course> = {
      updatedAt: new Date(),
    };
    if (title) updatedCourse.title = title;
    if (description) updatedCourse.description = description;
    if (image) updatedCourse.image = image;

    const updateCourse = await this.repo.update({ id } as any, updatedCourse);
    if (!updateCourse) return null;
    return updateCourse;
  }

  async deleteCourse(id: number) {
    return await this.repo.delete({ id } as any);
  }
}
