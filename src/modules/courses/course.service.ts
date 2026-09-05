import { CourseRepository } from "./course.repository"
import { userService } from "../users/user.service";
import { Course } from "./course.entity"
import { removeFields } from "../../shared/utils/object.utils";


class CourseService{
private repo=new CourseRepository();
getCourses(){
    return this.repo.findAll();
}
getCourse(id:string): Omit<Course , 'creatorId'>|null {
    const course=this.repo.findById(id);
    if(!course)return null;
    const courseWithoutUserId=removeFields(course , ['creatorId']);
    return courseWithoutUserId;
 
}


createCourse(title:string , description:string ,creatorId:string , image?:string  ):Omit<Course , 'creatorId'> | null{
//check id user exist
const creator=userService.getUser(creatorId);
if(!creator)return null;
//check user role ==> only admin and coach can create course
if (creator.role==='STUDENT') return null;


const course:Omit<Course, 'id' | 'createdAt'|'updatedAt'> ={

title , 
description , 
creatorId 
}
if(image) course.image=image;

const courseCreated= this.repo.create(course);
const courseWithoutUserId=removeFields(courseCreated , ['creatorId']);
return courseWithoutUserId;

}
updateCourse(requestedId:string , courseId:string ,  title?:string , description?:string , image?:string ):Omit<Course , 'creatorId'> | null{

const course = this.repo.findById(courseId); 
if(!course)return null;
const user=userService.getUser(requestedId);
if(!user)return null;

if(user.id === course.creatorId){
    const updatedCourse:Partial<Course> = {

    }
    if(title)updatedCourse.title=title;
    if(description)updatedCourse.description=description;
    if(image)updatedCourse.image=image;
    
    const updateCourse= this.repo.update(courseId , updatedCourse);
    if(!updateCourse)return null;
    return removeFields(updateCourse, ['creatorId']);
}
return null;

}
deleteCourse(requestedId:string , id:string):boolean{
    const course=this.repo.findById(id);
    if(!course)return false;

    const user=userService.getUser(requestedId);
    if(!user)return false;
    
    if(user.id === course.creatorId)return this.repo.delete(id);
    else return false;
    
}

}

export const courseService=new CourseService();
