import { UserRepository } from "./user.repository";
import { Role, User } from "./user.entity";
import { createArgonHash } from "../auth/utils/argon.util";
import { removeFields } from "../../shared/utils/object.utils";



class UserService{
private repo=new UserRepository();

async  adminUserSeed(){
    const exist=this.repo.findByEmail('admin@no.com');
    if(!exist){
        const hashedPassword=await createArgonHash('admin123');
        this.repo.create({name:'Admin' , password:hashedPassword , email:'admin@no.com' , role:'ADMIN'})
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
    const user=this.repo.create({name:name , email:email , password:password , role:role});
    
     const userWithoutPassword=removeFields(user , ['password']);
    return userWithoutPassword;
 
}
updateUser(id:string , name?:string , email?:string): User|null{
    const payLoad:Partial<User>={};

    
    if(name) payLoad.name=name;
    if(email) payLoad.email=email;
    

    return this.repo.update(id , payLoad);
}


deleteUser(id:string): boolean{
return this.repo.delete(id);
}

}

export const userService=new UserService();
