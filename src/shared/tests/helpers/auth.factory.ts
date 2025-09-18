import { usersData } from "../../../modules/users/user.data";
import { User  } from "../../../modules/users/user.entity";
import { CustomError } from "../../utils/error.utils";
import {HttpErrorStatus ,  Role } from "../../utils/types.utils";
import { signJwt } from "../../../modules/auth/utils/jwt.util";

export function getSeededUserByRole(role:Role , index=0 ):User{
    const seededUsers=usersData.filter( (user) => user.role === role);
    const user=seededUsers[index];
    if(!user)throw new CustomError(`seeded user with ${role} not fount` , 'USER' , HttpErrorStatus.NotFound);

    return user;


    
}

export function makeTokenForSeededUser(role: Role, index = 0):string{
   const seededUser=getSeededUserByRole(role , index);
    const token=signJwt({'name':seededUser.name , 'sub':seededUser.id , 'role':seededUser.role});
    return token;

} 