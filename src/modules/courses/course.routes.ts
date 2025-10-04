import { Router } from "express";
import { isAuthenticated, checkRole, isAuthorized } from "../../shared/middlewares/auth.middleware";
import { uploadSingle } from "../../shared/config/multer.config";
import { RoleConst } from "../../shared/utils/types.utils";
import { courseController  } from "./course.index";

const router=Router();
const controller=courseController;

/*
POST /courses → Create a new course (only COACH or ADMIN)
GET /courses → Get all courses (public)
GET /courses/:id → Get course by ID (public)
PUT /courses/:id → Update course (only the course creator, role: COACH or ADMIN)
DELETE /courses/:id → Delete course (only the course creator, role: COACH or ADMIN)
 */

router.post('/' , isAuthenticated , checkRole(RoleConst.admin,RoleConst.coach),  uploadSingle('image'), controller.create);
router.get('/' ,controller.getCourses );
router.get('/:id', controller.getCourse);
router.put('/:id' ,
    isAuthenticated ,
    checkRole(RoleConst.admin,RoleConst.coach),
    isAuthorized,
    uploadSingle('image'), controller.updateCourse);
router.delete('/:id' 
    , isAuthenticated 
    ,  checkRole(RoleConst.admin,RoleConst.coach)
    , isAuthorized
    ,controller.deleteCourse );

export const courseRouter = router;