import { MongooseRepository } from "../../shared/genericRepo";
import { User } from "./user.entity";
import { UserModel } from "./user.model";

export class UserRepository extends MongooseRepository<User> {
  constructor() {
    super(UserModel);
  }
  async findByEmail(email: string): Promise<User | null> {
    const record = await this.model.findOne({ email }).exec();
    return record as User | null;
  }
}
