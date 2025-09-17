import { Repository } from "../../shared/genericRepo";
import { usersData } from "./user.data";

import { User } from "./user.entity";

export class UserRepository extends Repository<User>{

 constructor(usersArr: User[]) {
    super(usersArr);
  }

findByEmail(email:string):User|undefined{
    return this.findAll().find((u) => u.email === email);

}
}
