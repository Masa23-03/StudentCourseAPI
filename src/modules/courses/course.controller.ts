import { Request, Response } from "express";
import { courseService } from "./course.service";
import { HttpErrorStatus } from "../../shared/utils/types.utils";


export class CourseController{
    private service = courseService;


//POST /courses → Create a new course (only COACH or ADMIN)
create= (req:Request , res:Response)=>{
    const user=req.user!;
    const image = req.file? `/uploads/${req.file.filename}`: undefined;
    const {title , description }=req.body as {title:string ; description:string};
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
updateCourse= (req:  Request<{ id: string }>, res: Response) =>{
    const user=req.user!;
    const {id}=req.params;
    const image = req.file? `/uploads/${req.file.filename}`: undefined;
    const { title, description } = req.body as { title?: string; description?: string };
    const updatedCourse=this.service.updateCourse(user.id , id , title , description , image);
    if(!updatedCourse){
        return res.error({statusCode:500 , message:'Failed to update'});

    }
    res.ok(updatedCourse);
}
//DELETE /courses/:id → Delete course (only the course creator, role: COACH or ADMIN)
 deleteCourse= (req:  Request<{ id: string }>, res: Response) =>{
     const user = req.user!;
    const { id } = req.params;
    const deletedCourse = courseService.deleteCourse(user.id, id);
    if(!deletedCourse)return res.error({statusCode:500 , message:'Failed to delete'});
    res.ok({deleted: deletedCourse});
 }


}