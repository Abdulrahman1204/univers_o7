import { Router } from "express";
import { ctrlTeacherController } from "../../../controllers/users/teachers/Teacher.controller";
import upload from "../../../middlewares/cloudinary";
import verifyToken from "../../../middlewares/verifyToken";
import checkRole from "../../../middlewares/checkRole";

const router = Router();

// Teacher Profile Routes
router
  .route("/")
  .get(
    verifyToken,
    checkRole(["teacher"]),
    ctrlTeacherController.getProfileTeacher
  ) // GET /api/ctrl/teacher/:id
  .delete(
    verifyToken,
    checkRole(["teacher", "superAdmin"]),
    ctrlTeacherController.deleteTeacher
  ); // DELETE /api/ctrl/teacher/:id

// Update Routes
router
  .route("/updateaccount/:id")
  .put(
    verifyToken,
    checkRole(["teacher"]),
    ctrlTeacherController.updateProfileTeacher
  ); // PUT /api/ctrl/teacher/updateaccount/:id

router
  .route("/updateaccountbysuperadmin/:id")
  .put(
    verifyToken,
    checkRole(["superAdmin"]),
    ctrlTeacherController.updateProfileTeacherBySuperAdmin
  ); // PUT /api/ctrl/teacher/updateaccountbysuperadmin/:id

router
  .route("/updateprofilephoto/:id")
  .put(
    verifyToken,
    checkRole(["teacher"]),
    upload,
    ctrlTeacherController.updateProfilePhotoTeacher
  ); // PUT /api/ctrl/teacher/updateprofilephoto/:id

// Get All Teachers
router
  .route("/all")
  .get(
    verifyToken,
    checkRole(["superAdmin"]),
    ctrlTeacherController.getAllTeachers
  ); // GET /api/ctrl/teachers

export default router;
