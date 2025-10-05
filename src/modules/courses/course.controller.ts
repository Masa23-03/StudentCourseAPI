import { Request, Response } from "express";
import { HttpErrorStatus, StringObject } from "../../shared/utils/types.utils";
import { CourseService } from "./course.service";
import { courseResponse, createOrUpdateCourse } from "./types/dto.types";
import { zodValidation } from "../../shared/utils/zod.utils";
import {
  updateCourseSchema,
  createOrUpdateCourseSchema,
} from "./utils/schema.util";

export class CourseController {
  constructor(private service: CourseService) {}

  //POST /courses → Create a new course (only COACH or ADMIN)
  create = async (
    req: Request<StringObject, StringObject, createOrUpdateCourse>,
    res: Response<courseResponse>
  ) => {
    const payLoad = zodValidation(
      createOrUpdateCourseSchema,
      req.body,
      "COURSE"
    );
    const user = req.user!;

    const image = req.file
      ? `/uploads/${req.file.filename}`
      : payLoad.image ?? undefined;
    const { title, description } = payLoad;
    const createdCourse = await this.service.createCourse(
      title,
      description,
      user.id,
      image
    );
    if (!createdCourse) {
      return res.error({
        statusCode: HttpErrorStatus.Forbidden,
        message: "Forbidden",
      });
    }
    res.create(createdCourse);
  };
  //GET /courses → Get all courses (public)
  getCourses = async (
    req: Request<
      StringObject,
      StringObject,
      StringObject,
      { page: string; limit: string }
    >,
    res: Response
  ) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const courses = await this.service.getCourses(page, limit);
    return res.ok(courses);
  };
  //GET /courses/:id → Get course by ID (public)
  getCourse = async (req: Request<{ id: string }>, res: Response) => {
    const course = await this.service.getCourse(Number(req.params.id));
    if (!course)
      return res.error({
        statusCode: HttpErrorStatus.NotFound,
        message: "Not Found",
      });
    return res.ok(course);
  };
  //PUT /courses/:id → Update course (only the course creator, role: COACH or ADMIN)
  updateCourse = async (
    req: Request<{ id: string }, StringObject, Partial<createOrUpdateCourse>>,
    res: Response<courseResponse>
  ) => {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.error({ statusCode: 400, message: "ID must be a number" });
    }
    const { title, description } = zodValidation(
      updateCourseSchema,
      req.body,
      "COURSE"
    );
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedCourse = await this.service.updateCourse(
      id,
      title,
      description,
      image
    );
    if (!updatedCourse) {
      return res.error({
        statusCode: HttpErrorStatus.NotFound,
        message: "Course not found",
      });
    }
    return res.ok(updatedCourse);
  };
  //DELETE /courses/:id → Delete course (only the course creator, role: COACH or ADMIN)
  deleteCourse = async (req: Request<{ id: string }>, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.error({ statusCode: 400, message: "ID must be a number" });
    }
    const deletedCourse = await this.service.deleteCourse(id);
    if (!deletedCourse)
      return res.error({
        statusCode: HttpErrorStatus.NotFound,
        message: "Course not found",
      });
    return res.ok({ deleted: deletedCourse });
  };
}
