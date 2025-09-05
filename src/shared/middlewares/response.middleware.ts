import { RequestHandler } from "express";
import { ApiStatusCode } from "../utils/types.utils";
import { Response , Request , NextFunction } from "express";
import { error } from "console";

export type UnifiedErrorApiResponse={
statusCode:ApiStatusCode,
message:string
}

export type SuccessfulApiResponse={
success:true,
data:object
}

export type UnSuccessfulApiResponse={
success:false,
error:UnifiedErrorApiResponse

}
export type UnifiedApiResponse=|SuccessfulApiResponse|UnSuccessfulApiResponse;

const formatApiResponse=(res:UnifiedApiResponse)=>res;

export const ResponseEnhancer=(req:Request, res:Response , next:NextFunction)=>{
    res.ok= (data)=>res.status(200).json(formatApiResponse({success:true , data}));
    res.create= (data)=>res.status(201).json(formatApiResponse({success:true , data}));
    res.error= (err)=>res.status(err.statusCode).json(formatApiResponse({success:false ,error:err }));

    next();

}