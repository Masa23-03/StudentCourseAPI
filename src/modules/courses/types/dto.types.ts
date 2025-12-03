import { Course } from "../course.entity";

export type courseResponse = Omit<Course, "creatorId">;
export type createOrUpdateCourse = Omit<
  Course,
  "id" | "createdAt" | "updatedAt" | "creatorId"
> & { image?: Course["image"] };
