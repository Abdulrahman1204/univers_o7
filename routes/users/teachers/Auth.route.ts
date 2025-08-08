import { Router } from "express";
import { authTeacherController } from "../../../controllers/users/teachers/Auth.controller";
import upload from "../../../middlewares/cloudinary";
import verifyToken from "../../../middlewares/verifyToken";
import checkRole from "../../../middlewares/checkRole";

const router = Router();

// ~ POST /api/auth/teacher/register ~ Register New Teacher
router
  .route("/register")
  .post(
    verifyToken,
    checkRole(["admin", "superAdmin"]),
    upload,
    authTeacherController.createNewTeacher
  );

// ~ POST /api/auth/teacher/login ~ Teacher Login
router.route("/login").post(authTeacherController.loginTeacher);

export default router;
