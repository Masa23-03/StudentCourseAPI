import { CourseRepository } from "./course.repository";
import { Course } from "./course.entity";
import { removeFields } from "../../shared/utils/object.utils";
import { coursesData } from "./course.data";
import { userService } from "../users/user.index";
import { courseResponse } from "./types/dto.types";
import { courseRepo } from "./course.index";
import { CreatePayload } from "../../shared/utils/types.utils";

export class CourseService {
  getCourses(page: number = 1, limit: number = 10) {
    return courseRepo.findAll(page, limit);
  }
  getCourse(id: string) {
    return courseRepo.findById(id);
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

    return courseRepo.create({
      title: title,
      description: description,
      creatorId: creatorId,
      image: image ?? null,
    });
  }
  updateCourse(
    courseId: string,
    title?: string,
    description?: string,
    image?: string
  ) {
    const course = courseRepo.findById(courseId);
    if (!course) return null;

    const updatedCourse: Partial<Course> = {
      updatedAt: new Date(),
    };
    if (title) updatedCourse.title = title;
    if (description) updatedCourse.description = description;
    if (image) updatedCourse.image = image;
    return courseRepo.update(courseId, updatedCourse);
  }
  deleteCourse(id: string) {
    return courseRepo.delete(id);
  }
}
