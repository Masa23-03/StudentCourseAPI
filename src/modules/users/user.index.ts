import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

export const userService = new UserService();

export const userController = new UserController(userService);

export const userRepo = new UserRepository();
