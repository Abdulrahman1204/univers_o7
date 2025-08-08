import { Router } from "express";
import { authTeacherController } from "../../../controllers/users/teachers/Auth.controller";
import upload from "../../../middlewares/cloudinary";

const router = Router();

// ~ POST /api/auth/teacher/register ~ Register New Teacher
router.post(
  "/register",
  upload,
  authTeacherController.createNewTeacher
);

// ~ POST /api/auth/teacher/login ~ Teacher Login
router.post("/login", authTeacherController.loginTeacher);

export default router;