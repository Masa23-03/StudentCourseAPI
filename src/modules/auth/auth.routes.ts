import { Router , RequestHandler} from "express";
import { AuthController } from "./auth.controller";

const router=Router();
const authController = new AuthController();

/*
POST /auth/register →Register as a (default role).
POST /auth/login → Authenticate and issue JWT token.
 */

router.post('/register' , authController.register.bind(authController) as RequestHandler);
router.post('/login' , authController.login.bind(authController) as RequestHandler);

export const authRouter=router;
