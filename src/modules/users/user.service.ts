import { User } from "./user.entity";
import { createArgonHash } from "../auth/utils/argon.util";
import { removeFields } from "../../shared/utils/object.utils";
import { Role } from "../../shared/utils/types.utils";
import { userRepo } from "./user.index";

export class UserService {
  async adminUserSeed() {
    const exist = userRepo.findByEmail("admin@no.com");
    if (!exist) {
      const hashedPassword = await createArgonHash("admin123");
      userRepo.create({
        name: "Admin",
        password: hashedPassword,
        email: "admin@no.com",
        role: "ADMIN",
      });
    }
  }
  getUsers(page: number = 1, limit: number = 10) {
    return userRepo.findAll(page, limit);
  }
  getUser(id: string) {
    return userRepo.findById(id);
  }
  findUserByEmail(email: string): Promise<User | null> {
    return userRepo.findByEmail(email);
  }
  createUser(
    name: string,
    email: string,
    password: string,
    role: Role = "STUDENT"
  ) {
    const user = userRepo.create({
      name: name,
      email: email,
      password: password,
      role: role,
    });

    return user;
  }
  updateUser(id: string, name?: string, email?: string) {
    const payLoad: Partial<User> = {};

    if (name) payLoad.name = name;
    if (email) payLoad.email = email;

    return userRepo.update(id, payLoad);
  }

  deleteUser(id: string): Promise<boolean> {
    return userRepo.delete(id);
  }
}
