import { Course } from "./course.entity";

import { Repository } from "../../shared/genericRepo";


export class CourseRepository extends Repository<Course>{
constructor(coursesArr: Course[]){
    super(coursesArr);
}

}