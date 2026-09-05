import { Repository } from "../../shared/genericRepo";

import { User } from "./user.entity";

export class UserRepository extends Repository<User>{



findByEmail(email:string):User|undefined{
    return this.findAll().find((u) => u.email === email);

}
}
