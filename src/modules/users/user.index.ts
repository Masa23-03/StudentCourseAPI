import { UserController } from "./user.controller";
import { UserService } from "./user.service";

export const userService=new UserService();

export const userController=new UserController(userService);

