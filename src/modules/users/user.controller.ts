import { userService } from "./user.service";
import { StringObject } from "../../shared/utils/types.utils";
import { Request , Response , NextFunction } from "express";

export class userController{
    private service=userService;

//getUsers 
getUsers= (req:Request<StringObject , StringObject , StringObject , {page:string , limit:string}> , res:Response)=>{
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const users=this.service.getUsers(page , limit);
    res.ok(users);


}
//getUser
getUser =(req:Request<{id:string}> , res:Response)=>{
    const id=req.params.id;
    if(!id)return res.error({
        statusCode:400 , 
        message: 'ID required'
    })

    const user=this.service.getUser(id);
    if(!user)return res.error({
        statusCode:404 , 
        message: 'User not found'
    }) 
    res.ok(user);
}
//createUser 
createUser=(req:Request, res:Response)=>{
    const {name , email , password}=req.body;
    
}
//updateUser
//deleteUser

}