import { Router } from "express";
import { ctrlTeacherController } from "../../../controllers/users/teachers/Teacher.controller";
import upload from "../../../middlewares/cloudinary";

const router = Router();

// Teacher Profile Routes
router
  .route("/:id")
  .get(ctrlTeacherController.getProfileTeacher) // GET /api/ctrl/teacher/:id
  .delete(
    // Optional protection
    ctrlTeacherController.deleteTeacher
  ); // DELETE /api/ctrl/teacher/:id

// Update Routes
router
  .route("/updateaccount/:id")
  .put(ctrlTeacherController.updateProfileTeacher); // PUT /api/ctrl/teacher/updateaccount/:id

router
  .route("/updateaccountbysuperadmin/:id")
  .put(ctrlTeacherController.updateProfileTeacherBySuperAdmin); // PUT /api/ctrl/teacher/updateaccountbysuperadmin/:id

router
  .route("/updateprofilephoto/:id")
  .put(upload, ctrlTeacherController.updateProfilePhotoTeacher); // PUT /api/ctrl/teacher/updateprofilephoto/:id

// Get All Teachers
router.route("/").get(ctrlTeacherController.getAllTeachers); // GET /api/ctrl/teachers

export default router;
