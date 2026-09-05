import { Router , RequestHandler} from "express";
import { authController } from "./auth.index";

const router=Router();
const controller = authController

/*
POST /auth/register →Register as a (default role).
POST /auth/login → Authenticate and issue JWT token.
 */

router.post('/register' , controller.register.bind(controller) as RequestHandler);
router.post('/login' , controller.login.bind(controller) as RequestHandler);

export const authRouter=router;
