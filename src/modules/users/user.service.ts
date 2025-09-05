import { UserRepository } from "./user.repository";
import { Role, User } from "./user.entity";



class UserService{
private repo=new UserRepository();

 adminUserSeed(){
    const exist=this.repo.findByEmail('admin@no.com');
    if(!exist){
        this.repo.create({name:'Admin' , password:'admin123' , email:'admin@no.com' , role:'ADMIN'})
    }
}
getUsers(page:number , limit:number){
    return this.repo.findAll();

}
getUser(id:string):User|undefined{
    return this.repo.findById(id);
}
findUserByEmail(email:string): User|undefined{
    return this.repo.findByEmail(email);
}
createUser(name:string , email:string , password:string , role:Role = 'STUDENT'):User{
return this.repo.create({name:name , email:email , password:password , role:role});
}
updateUser(id:string , name?:string , email?:string , role?:Role): User|null{
    const payLoad:Partial<User>={};

    
    if(name) payLoad.name=name;
    if(email) payLoad.email=email;
    if(role) payLoad.role=role;

    return this.repo.update(id , payLoad);
}


deleteUser(id:string): boolean{
return this.repo.delete(id);
}

}

export const userService=new UserService();
