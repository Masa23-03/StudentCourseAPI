import { UserRepository } from "./user.repository";
import {  User } from "./user.entity";
import { createArgonHash } from "../auth/utils/argon.util";
import { removeFields } from "../../shared/utils/object.utils";
import { Role } from "../../shared/utils/types.utils";
import { usersData } from "./user.data";



export class UserService{
    private readonly repo:UserRepository;
    constructor(){
        this.repo=new UserRepository(usersData);
    }


async  adminUserSeed(){
    const exist=this.repo.findByEmail('admin@no.com');
    if(!exist){
        const hashedPassword=await createArgonHash('admin123');
        this.repo.create({
            name:'Admin' , 
            password:hashedPassword , 
            email:'admin@no.com' , 
            role:'ADMIN',
            createdAt:new Date(),
            updatedAt:new Date()
        })
    }
}
getUsers(page:number , limit:number){
    return this.repo.findAll();

}
 getUser(id:string):Omit<User,'password'>|null{
    const user=this.repo.findById(id);
    if(!user)return null;
    const userWithoutPassword=removeFields(user , ['password']);
    return userWithoutPassword;

}
findUserByEmail(email:string): User|undefined{
    return this.repo.findByEmail(email);
}
createUser(name:string , email:string , password:string , role:Role = 'STUDENT'):Omit<User,'password'>{
    const user=this.repo.create({
        name:name , 
        email:email , 
        password:password , 
        role:role,
        createdAt:new Date(),
        updatedAt:new Date()
    });
    
     const userWithoutPassword=removeFields(user , ['password']);
    return userWithoutPassword;
 
}
updateUser(id:string , name?:string , email?:string): User|null{
    const payLoad:Partial<User>={};

    
    if(name) payLoad.name=name;
    if(email) payLoad.email=email;
    payLoad.updatedAt=new Date();

    

    return this.repo.update(id , payLoad);
}


deleteUser(id:string): boolean{
return this.repo.delete(id);
}

}

