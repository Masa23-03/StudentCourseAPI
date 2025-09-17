import { Router } from "express";
import { isAuthenticated , requireRole} from "../../shared/middlewares/auth.middleware";
import { RoleConst } from "../../shared/utils/types.utils";
import { userController } from "./user.index";

const router=Router();

const controller=userController
/*
GET /users/me → Get current user profile (protected).
PUT /users/me → Update current profile.
POST /users/coach → : create a COACH user
 */

router.get('/me' , isAuthenticated , controller.getMe);


router.put('/me' , isAuthenticated , controller.updateMe);


router.post('/coach' ,isAuthenticated ,requireRole(RoleConst.admin) ,  controller.createCoach );

export const userRouter = router;
