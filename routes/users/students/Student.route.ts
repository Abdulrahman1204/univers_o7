import { Router } from "express";
import { ctrlStudentController } from "../../../controllers/users/students/Student.controller";
import upload from "../../../middlewares/cloudinary";
import verifyToken from "../../../middlewares/verifyToken";
import checkRole from "../../../middlewares/checkRole";

const router = Router();

// Student Profile Routes
router
  .route("/:id")
  .get(
    verifyToken,
    checkRole(["student"]),
    ctrlStudentController.getProfileStudent
  ) // GET /api/ctrl/student/:id
  .delete(
    verifyToken,
    checkRole(["student", "superAdmin"]),
    ctrlStudentController.deleteStudent
  ); // DELETE /api/ctrl/student/:id

// Update Routes
router
  .route("/updateaccount/:id")
  .put(
    verifyToken,
    checkRole(["student"]),
    ctrlStudentController.updateProfileStudent
  ); // PUT /api/ctrl/student/updateaccount/:id

router
  .route("/updateaccountbysuperadmin/:id")
  .put(
    verifyToken,
    checkRole(["superAdmin"]),
    ctrlStudentController.updateProfileStudentBySuperAdmin
  ); // PUT /api/ctrl/student/updateaccountbysuperadmin/:id

router
  .route("/updateprofilephoto/:id")
  .put(
    verifyToken,
    checkRole(["student"]),
    upload,
    ctrlStudentController.updateProfilePhotoStudent
  ); // PUT /api/ctrl/student/updateprofilephoto/:id

// Get All Students
router
  .route("/")
  .get(
    verifyToken,
    checkRole(["superAdmin"]),
    ctrlStudentController.getAllStudents
  ); // GET /api/ctrl/students

export default router;
