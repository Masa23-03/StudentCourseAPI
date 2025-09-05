import { Request, Response, NextFunction } from "express";
import { HttpErrorStatus, StringObject } from "../../shared/utils/types.utils";
import {
  registerDTO,
  registerResponseDTO,
  loginDTO,
  loginResponseDTO,
  loginResponseDTOWithJWT,
} from "./types/dto.types";
import { authService } from "./auth.service";
import { zodValidation } from "../../shared/utils/zod.utils";
import { registerDTOSchema , loginDTOSchema } from "./utils/schema.util";
import { signJwt } from "./utils/jwt.util";

export class AuthController {
    private service=authService;
     public async register(req: Request<StringObject, StringObject, registerDTO>,res: Response<registerResponseDTO>){
       
            const payLoad=zodValidation(registerDTOSchema , req.body , 'AUTH');
            const user=await this.service.register(payLoad);
            if(!user){
                res.error({statusCode:HttpErrorStatus.ServerError , message:'internal server error' });
                return;
            }
            res.create(user);
        
     }
    public async login(req: Request<StringObject , StringObject , loginDTO>, res: Response<loginResponseDTOWithJWT | string>,next: NextFunction){
        const payLoad=zodValidation(loginDTOSchema , req.body , 'AUTH');
        const user=await this.service.login(payLoad);
             if(!user){
            res.error({statusCode:HttpErrorStatus.BadRequest , message:'wrong credentials' });
             return;
            }
        const token=signJwt({sub:user.id , name:user.name , role:user.role});
        res.ok({ user , token});


    } 

  
}
