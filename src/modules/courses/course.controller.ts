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
    console.log(req.file);

    const image = req.file ? `/uploads/${req.file.filename}` : undefined;
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
      { page?: string; limit?: string }
    >,
    res: Response
  ) => {
    const { page, limit } = req.query;

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;

    const { records, totalRecords } = await this.service.getCourses(
      pageNum,
      limitNum
    );

    res.paginationResponse(records, {
      page: pageNum,
      limit: limitNum,
      totalRecords,
    });
  };

  //GET /courses/:id → Get course by ID (public)
  getCourse = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    if (!id) return res.error({ statusCode: 400, message: "ID required" });

    const course = await this.service.getCourse(id);
    if (!course)
      return res.error({
        statusCode: HttpErrorStatus.NotFound,
        message: "Not Found",
      });
    res.ok(course);
  };
  //PUT /courses/:id → Update course (only the course creator, role: COACH or ADMIN)
  updateCourse = async (
    req: Request<{ id: string }, StringObject, Partial<createOrUpdateCourse>>,
    res: Response<courseResponse>
  ) => {
    const id = req.params.id;
    if (!id) return res.error({ statusCode: 400, message: "ID required" });

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
    res.ok(updatedCourse);
  };
  //DELETE /courses/:id → Delete course (only the course creator, role: COACH or ADMIN)
  deleteCourse = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    if (!id) return res.error({ statusCode: 400, message: "ID required" });
    const deletedCourse = await this.service.deleteCourse(id);
    if (!deletedCourse)
      return res.error({
        statusCode: HttpErrorStatus.NotFound,
        message: "Course not found",
      });
    res.ok({});
  };
}
