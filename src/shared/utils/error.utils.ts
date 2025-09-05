import type { Response } from "express"
import { ModuleNameType } from "./constants.utils"
import { ErrorStatusCode } from "./types.utils"
export class CustomError extends Error{
 
public errorType='custom';

constructor(message:string , public moduleName:ModuleNameType , public statusCode: ErrorStatusCode){

super(message);

}
}


export const HandleError=(err:unknown, res:Response)=>{
if(err instanceof CustomError){
    res.error({statusCode:err.statusCode , message:err.message});

    return
}
//500
res.error({statusCode:500 , message:'internal server error'});

}