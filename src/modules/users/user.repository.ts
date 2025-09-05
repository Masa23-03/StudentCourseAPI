import { Repository } from "../../shared/genericRepo";

import { User } from "./user.entity";

export class UserRepository extends Repository<User>{
constructor(){super()};
}