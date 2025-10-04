import { CourseRepository } from "./course.repository"
import { Course } from "./course.entity"
import { removeFields } from "../../shared/utils/object.utils";
import { coursesData } from "./course.data";
import { userService } from "../users/user.index";
import { courseResponse } from "./types/dto.types";


export class CourseService{
    
private readonly repo;
constructor(){
    this.repo=new CourseRepository(coursesData);

}
getCourses(){
    return this.repo.findAll();
}
getCourse(id:string): courseResponse|null {
    const course=this.repo.findById(id);
    if(!course)return null;
    const courseWithoutUserId=removeFields(course , ['creatorId']);
    return courseWithoutUserId;
 
}


createCourse(title:string , description:string ,creatorId:string , image?:string  ):courseResponse | null{
//check id user exist
const creator=userService.getUser(creatorId);
if(!creator)return null;
//check user role ==> only admin and coach can create course
if (creator.role==='STUDENT') return null;


const course:Omit<Course, 'id' > ={

title , 
description , 
creatorId ,
createdAt:new Date(),
updatedAt:new Date(),

}
if(image) course.image=image;

const courseCreated= this.repo.create(course);
const courseWithoutUserId=removeFields(courseCreated , ['creatorId']);
return courseWithoutUserId;

}
updateCourse( courseId:string ,  title?:string , description?:string , image?:string ):courseResponse | null{

const course = this.repo.findById(courseId); 
if(!course)return null;



    const updatedCourse:Partial<Course> = {
        updatedAt:new Date()
    }
    if(title)updatedCourse.title=title;
    if(description)updatedCourse.description=description;
    if(image)updatedCourse.image=image;
    
    
    const updateCourse= this.repo.update(courseId , updatedCourse);
    if(!updateCourse)return null;
    return removeFields(updateCourse, ['creatorId']);
    return null;


}
deleteCourse(id:string):boolean{

    return this.repo.delete(id);
    
}

}


