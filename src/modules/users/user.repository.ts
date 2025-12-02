import { MongooseRepository } from "../../shared/genericRepo";
import { User } from "./user.entity";

export class UserRepository extends MongooseRepository<User> {
  async findByEmail(email: string): Promise<User | null> {
    const record = await this.model.findOne({ email }).exec();
    return record as User | null;
  }
}
