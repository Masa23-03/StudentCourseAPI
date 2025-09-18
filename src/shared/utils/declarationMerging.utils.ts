//? declaration merging.ts 
import { UnifiedErrorApiResponse } from "../middlewares/response.middleware";
import { User } from "../../modules/users/user.entity";
import { Course } from "../../modules/courses/course.entity";

export type MyEnvs={
PORT:number,
JWT_SECRET:string,
MAX_IMAGE_SIZE_MB:number,
NODE_ENV:"development"|"staging"|"production"|"test",
}

declare global{ 
    namespace NodeJS{
    interface ProcessEnv extends MyEnvs{}
}
}

declare global{
    namespace Express{
        interface Response{
            create:(data:object)=>this;
            ok:(data:object)=>this;
            error:(error:UnifiedErrorApiResponse)=>this;

        }

        interface Request{
            user?:Pick<User , 'id'|'name'|'role'>
            
            
        }
    }
}