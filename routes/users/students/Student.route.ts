import { Router } from "express";
import { ctrlStudentController } from "../../../controllers/users/students/Student.controller";
import upload from "../../../middlewares/cloudinary";

const router = Router();

// Student Profile Routes
router.route("/:id")
  .get(ctrlStudentController.getProfileStudent) // GET /api/ctrl/student/:id
  .delete(ctrlStudentController.deleteStudent); // DELETE /api/ctrl/student/:id

// Update Routes
router.route("/updateaccount/:id")
  .put(ctrlStudentController.updateProfileStudent); // PUT /api/ctrl/student/updateaccount/:id

router.route("/updateaccountbysuperadmin/:id")
  .put(ctrlStudentController.updateProfileStudentBySuperAdmin); // PUT /api/ctrl/student/updateaccountbysuperadmin/:id

router.route("/updateprofilephoto/:id")
  .put(upload, ctrlStudentController.updateProfilePhotoStudent); // PUT /api/ctrl/student/updateprofilephoto/:id

// Get All Students
router.route("/")
  .get(ctrlStudentController.getAllStudents); // GET /api/ctrl/students

export default router;