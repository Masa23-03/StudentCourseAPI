import { User } from "./user.entity";
import { createArgonHash } from "../auth/utils/argon.util";
import { Role } from "../../shared/utils/types.utils";
import { UserRepository } from "./user.repository";

export class UserService {
  constructor(private readonly repo: UserRepository) {}

  async adminUserSeed() {
    const exist = await this.repo.findByEmail("admin@no.com");
    if (!exist) {
      const hashedPassword = await createArgonHash("admin123");
      this.repo.create({
        name: "Admin",
        password: hashedPassword,
        email: "admin@no.com",
        role: "ADMIN",
      });
    }
  }
  getUsers(page: number = 1, limit: number = 10) {
    return this.repo.findAll(page, limit);
  }
  getUser(id: string) {
    return this.repo.findById(id);
  }
  findUserByEmail(email: string): Promise<User | null> {
    return this.repo.findByEmail(email);
  }
  async createUser(
    name: string,
    email: string,
    password: string,
    role: Role = "STUDENT"
  ) {
    const user = await this.repo.create({
      name: name,
      email: email,
      password: password,
      role: role,
    });

    return user;
  }
  async updateUser(id: string, name?: string, email?: string) {
    const payLoad: Partial<User> = {};

    if (name) payLoad.name = name;
    if (email) payLoad.email = email;

    return await this.repo.update(id, payLoad);
  }

  deleteUser(id: string) {
    return this.repo.delete(id);
  }
}
