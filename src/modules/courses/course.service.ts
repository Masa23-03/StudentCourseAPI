import { CourseRepository } from "./course.repository";
import { Course } from "./course.entity";
import { userService } from "../users/user.index";

export class CourseService {
  constructor(private readonly repo: CourseRepository) {}

  getCourses(page: number = 1, limit: number = 10) {
    return this.repo.findAllWithCreator(page, limit);
  }
  getCourse(id: string) {
    return this.repo.findByIdWithCreator(id);
  }

  async createCourse(
    title: string,
    description: string,
    creatorId: string,
    image?: string
  ) {
    //check id user exist
    const creator = await userService.getUser(creatorId);
    if (!creator) return null;
    //check user role ==> only admin and coach can create course
    if (creator.role === "STUDENT") return null;

    return this.repo.createCourse({
      title: title,
      description: description,
      creatorId: creatorId,
      image: image ?? null,
    });
  }
  async updateCourse(
    courseId: string,
    title?: string,
    description?: string,
    image?: string
  ) {
    const course = await this.repo.findById(courseId);
    if (!course) return null;

    const updatedCourse: Partial<Course> = {
      updatedAt: new Date(),
    };
    if (title) updatedCourse.title = title;
    if (description) updatedCourse.description = description;
    if (image) updatedCourse.image = image;
    return this.repo.update(courseId, updatedCourse);
  }
  deleteCourse(id: string) {
    return this.repo.delete(id);
  }
}
