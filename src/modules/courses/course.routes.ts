import { Router } from "express";
import { CourseController } from "./course.controller";
import { isAuthenticated, requireRole } from "../../shared/middlewares/auth.middleware";
import { uploadSingle } from "../../shared/config/multer.config";

const router=Router();
const courseController=new CourseController;

/*
POST /courses → Create a new course (only COACH or ADMIN)
GET /courses → Get all courses (public)
GET /courses/:id → Get course by ID (public)
PUT /courses/:id → Update course (only the course creator, role: COACH or ADMIN)
DELETE /courses/:id → Delete course (only the course creator, role: COACH or ADMIN)
 */

router.post('/' , isAuthenticated , requireRole('ADMIN', 'COACH'),  uploadSingle('image'), courseController.create);
router.get('/' ,courseController.getCourse );
router.get('/:id', courseController.getCourse);
router.put('/:id' , isAuthenticated ,  requireRole('ADMIN', 'COACH'),uploadSingle('image'), courseController.updateCourse);
router.delete(':id' , isAuthenticated ,  requireRole('ADMIN', 'COACH'),courseController.deleteCourse );

export const courseRouter = router;