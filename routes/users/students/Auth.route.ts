import { Router } from "express";
import { authStudentController } from "../../../controllers/users/students/Auth.controller";
import upload from "../../../middlewares/cloudinary";

const router = Router();

// ~ POST /api/auth/student/register ~ Create New Student
router.route("/register").post(upload, authStudentController.createNewStudent);

// ~ POST /api/auth/student/login ~ Login Student
router.route("/login").post(authStudentController.loginStudent);

export default router;
