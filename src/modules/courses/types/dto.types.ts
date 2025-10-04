import { Course } from "../course.entity";

export type courseResponse= Omit<Course , 'creatorId'>;
export type createOrUpdateCourse=Pick<Course , 'title'|'description'|'image'>

