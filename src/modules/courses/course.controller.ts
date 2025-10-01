import { Request, Response } from "express";
import { HttpErrorStatus, StringObject } from "../../shared/utils/types.utils";
import { CourseService } from "./course.service";
import { courseResponse, createOrUpdateCourse } from "./types/dto.types";
import { zodValidation } from "../../shared/utils/zod.utils";
import { updateCourseSchema, createOrUpdateCourseSchema } from "./utils/schema.util";

export class CourseController{
   constructor(private service:CourseService){

    }


//POST /courses → Create a new course (only COACH or ADMIN)
create= (req:Request<StringObject, StringObject , createOrUpdateCourse> , res:Response<courseResponse>)=>{
    const payLoad=zodValidation(createOrUpdateCourseSchema , req.body , 'COURSE');
    const user=req.user!;
   
    const image = req.file ? `/uploads/${req.file.filename}` : payLoad.image;
    const {title , description }=payLoad 
    const createdCourse=this.service.createCourse(title , description , user.id , image);
    if(!createdCourse){
        return res.error({statusCode:HttpErrorStatus.Forbidden , message:'Forbidden'});

    }
    res.create(createdCourse);


}
//GET /courses → Get all courses (public)
getCourses=(req:Request , res:Response)=>{
    const courses=this.service.getCourses();
    res.ok(courses);


}
//GET /courses/:id → Get course by ID (public)
getCourse=(req:Request<{ id: string }> , res:Response)=>{
    const course=this.service.getCourse(req.params.id);
    if(!course)return res.error({statusCode:HttpErrorStatus.NotFound , message:'Not Found'});
    res.ok(course);

}
//PUT /courses/:id → Update course (only the course creator, role: COACH or ADMIN)
updateCourse= (req:  Request<{ id: string }, StringObject ,Partial<createOrUpdateCourse>>, res: Response<courseResponse>) =>{
    
    const {id}=req.params;
    const { title, description }=zodValidation(updateCourseSchema , req.body , 'COURSE');
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;
    
    
    const updatedCourse=this.service.updateCourse( id , title , description , image);
    if(!updatedCourse){
        return res.error({statusCode:HttpErrorStatus.NotFound , message:'Course not found'});

    }
    res.ok(updatedCourse);
}
//DELETE /courses/:id → Delete course (only the course creator, role: COACH or ADMIN)
 deleteCourse= (req:  Request<{ id: string }>, res: Response) =>{
   
    const { id } = req.params;
    const deletedCourse = this.service.deleteCourse( id);
    if(!deletedCourse)return res.error({statusCode:HttpErrorStatus.NotFound , message:'Course not found'});
    res.ok({deleted: deletedCourse});
 }


}