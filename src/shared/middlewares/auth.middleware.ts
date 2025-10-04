import { Request , Response , NextFunction } from "express" 
import { verifyJwt } from "../../modules/auth/utils/jwt.util"
import { Role } from "../utils/types.utils"
import { CustomError } from "../utils/error.utils"
import { HttpErrorStatus } from "../utils/types.utils"
import { userService } from "../../modules/users/user.index"
import { courseService } from "../../modules/courses/course.index"



export const isAuthenticated= (req:Request , res:Response , next:NextFunction)=>{
  const authHeader = req.headers.authorization?.trim();
  
if(authHeader){
    const jwtToken=authHeader.replace(`Bearer `, '');
    try {
        const payLoad=verifyJwt(jwtToken);
        const user=userService.getUser(payLoad.sub);
        if(!user) return next(new CustomError('user is not authenticated' , 'AUTH' ,HttpErrorStatus.Unauthorized));
       
        req.user={id:user.id , name:user.name , role:user.role };

       return next();
        

        
    } catch (error) {
        console.log('jwt is wrong');
        return next(new CustomError('invalid token' , 'AUTH' ,HttpErrorStatus.Unauthorized ));
    }
}
return next(new CustomError('user is not authenticated' , 'AUTH' ,HttpErrorStatus.Unauthorized ))
}


export const checkRole= (...roles :Role[] )=>{
    return (req:Request , res:Response , next:NextFunction)=>{
        if(!req.user){
             return next(new CustomError("user is not authenticated", "AUTH", HttpErrorStatus.Unauthorized));
        }
        if(!roles.includes(req.user.role)){
            return next(new CustomError("Forbidden", "AUTH", HttpErrorStatus.Forbidden));
        }
        next();

    }
}

export const isAuthorized= (req:Request , res:Response , next:NextFunction)=>{
    const user=req.user!;
    const courseId=req.params.id!;
    const course = courseService['repo']?.findById(courseId);
    
    if (!course) {
        return next(new CustomError('Course not found', 'COURSE', HttpErrorStatus.NotFound));
    }

    if(user.id !== course.creatorId){
       return next( new CustomError('Unauthorized' , 'COURSE' , HttpErrorStatus.Unauthorized))
    }
    return next();
}

