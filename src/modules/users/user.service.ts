import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import { createArgonHash } from "../auth/utils/argon.util";
import { removeFields } from "../../shared/utils/object.utils";
import { Role } from "../../shared/utils/types.utils";

export class UserService {
  private readonly repo: UserRepository;
  constructor() {
    this.repo = new UserRepository();
  }

  async adminUserSeed() {
    const exist = await this.repo.findByEmail("admin@no.com");
    if (!exist) {
      const hashedPassword = await createArgonHash("admin123");
      await this.repo.create({
        name: "Admin",
        password: hashedPassword,
        email: "admin@no.com",
        role: "ADMIN",
      });
    }
  }
  async getUsers(page: number, limit: number) {
    const take = Math.max(1, Math.min(limit, 100));
    const skip = (Math.max(page, 1) - 1) * take;
    const users = await this.repo.findAll({
      skip,
      take,
      orderBy: { createdAt: "desc" },
    });
    return users.map((users) => removeFields(users, ["password"]));
  }

  async getUser(id: number) {
    const user = await this.repo.findById({ id } as any);
    return removeFields(user, ["password"]);
  }
  async findUserByEmail(email: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) return null;
    return removeFields(user, ["password"]);
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

    return removeFields(user, ["password"]);
  }
  async updateUser(id: number, name?: string, email?: string) {
    const payLoad: Partial<User> = {};

    if (name) payLoad.name = name;
    if (email) payLoad.email = email;

    const user = await this.repo.update({ id } as any, payLoad);
    return removeFields(user, ["password"]);
  }

  async deleteUser(id: number) {
    const user = await this.repo.delete({ id } as any);
    if (!user) return null;
    return removeFields(user, ["password"]);
  }
}
