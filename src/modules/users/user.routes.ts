import { Router } from "express";
import { UserController } from "./user.controller";
import { isAuthenticated , requireRole} from "../../shared/middlewares/auth.middleware";
import { RoleConst } from "../../shared/utils/types.utils";

const router=Router();

const userController=new UserController();
/*
GET /users/me → Get current user profile (protected).
PUT /users/me → Update current profile.
POST /users/coach → : create a COACH user
 */

router.get('/me' , isAuthenticated , userController.getMe);


router.put('/me' , isAuthenticated , userController.updateMe);


router.post('/coach' ,isAuthenticated ,requireRole(RoleConst.admin) ,  userController.createCoach );

export const userRouter = router;
