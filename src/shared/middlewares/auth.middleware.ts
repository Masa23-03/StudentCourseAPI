import { Request , Response , NextFunction } from "express" 
import { verifyJwt } from "../../modules/auth/utils/jwt.util"
import { Role } from "../../modules/users/user.entity"
import { CustomError } from "../utils/error.utils"
import { HttpErrorStatus } from "../utils/types.utils"

export const isAuthenticated= (req:Request , res:Response , next:NextFunction)=>{
const authHeader=req.headers.authorization;
if(authHeader){
    const jwt=authHeader.replace(`Bearer `, '');
    try {
        const payLoad=verifyJwt(jwt);
       
        req.user={id:payLoad.sub , name:payLoad.name , role:(payLoad.role) as Role };

        next();
        return;

        
    } catch (error) {
        console.log('jwt is wrong');
    }
}
next(new CustomError('user is not authenticated' , 'AUTH' ,HttpErrorStatus.Unauthorized ))
}