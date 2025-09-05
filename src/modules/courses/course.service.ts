import { CourseRepository } from "./course.repository"
import { userService } from "../users/user.service";
import { Course } from "./course.entity"


class CourseService{
private repo=new CourseRepository();
getCourses(){
    return this.repo.findAll();
}
getCourse(id:string): Course|undefined {
return this.repo.findById(id);
}


createCourse(title:string , description:string ,creatorId:string , image?:string  ):Course | null{
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

return this.repo.create(course);

}
updateCourse(requestedId:string , courseId:string ,  title?:string , description?:string , image?:string ): Course |null{

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
    return this.repo.update(courseId , updatedCourse);
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
