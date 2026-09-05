import { Repository } from "../../shared/genericRepo";
import { UserPrisma } from "../../shared/services/prisma.service";
import { User } from "./user.entity";

export class UserRepository extends Repository<User, typeof UserPrisma> {
  constructor() {
    super(UserPrisma);
  }

  findByEmail(email: string) {
    return this.model.findUnique({ where: { email } });
  }
}
