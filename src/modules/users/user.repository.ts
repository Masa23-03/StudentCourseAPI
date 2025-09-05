import { Repository } from "../../shared/genericRepo";

import { User } from "./user.entity";

export class UserRepository extends Repository<User>{
constructor(){super()};
findByEmail(email:string):User|undefined{
    return this.findAll().find((user) => user.email === email);
    
}
}