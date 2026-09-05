import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

export const userRepo = new UserRepository();
export const userService = new UserService(userRepo);

export const userController = new UserController(userService);
