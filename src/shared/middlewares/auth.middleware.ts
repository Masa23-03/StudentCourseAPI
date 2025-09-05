import { Request , Response , NextFunction } from "express" 
import { verifyJwt } from "../../modules/auth/utils/jwt.util"
import { Role } from "../../modules/users/user.entity"
import { CustomError } from "../utils/error.utils"
import { HttpErrorStatus } from "../utils/types.utils"
import { userService } from "../../modules/users/user.service"



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
        next(new CustomError('invalid token' , 'AUTH' ,HttpErrorStatus.Unauthorized ));
    }
}
next(new CustomError('user is not authenticated' , 'AUTH' ,HttpErrorStatus.Unauthorized ))
}


export const requireRole= (...roles :Role[] )=>{
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

