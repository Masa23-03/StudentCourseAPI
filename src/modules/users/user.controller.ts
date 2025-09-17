import { HttpErrorStatus, StringObject } from "../../shared/utils/types.utils";
import { Request , Response , NextFunction } from "express";
import { UserService } from "./user.service";



export class UserController{
  constructor(  private service:UserService){

  }

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
//getMe
getMe=(req: Request , res:Response)=>{
    const me=req.user!;
    const user=this.service.getUser(me.id);
    if(!user)return res.error({statusCode:HttpErrorStatus.Unauthorized , message:'User not found'});
    
    res.ok(user);


}
 //updateMe
 updateMe=(req:Request , res:Response)=>{
const me=req.user!;
const {name , email}=req.body as {name?:string , email?:string}
const updated=this.service.updateUser(me.id , name , email);
if(!updated) return res.error({ statusCode:HttpErrorStatus.NotFound , message:'User not found'});
res.ok(updated);


 }
 //createCoach 
 createCoach=(req:Request, res:Response)=>{
 const { name, email, password } = req.body as { name: string; email: string; password: string };
 const exist=this.service.findUserByEmail(email);
 if(exist){
    return res.error({statusCode:HttpErrorStatus.BadRequest , message:'User with this email already exist'});

 }

 const coach=this.service.createUser(name , email , password , 'COACH');
 res.ok(coach);


 }
//createUser 
createUser=(req:Request, res:Response)=>{
    const {name , email , password}=req.body;
    const created=this.service.createUser(name , email , password);
    //if(!created) return res.error({ statusCode:HttpErrorStatus.BadRequest , message:'Bad request'});
    res.ok(created);


}


}