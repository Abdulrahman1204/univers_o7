import { Router } from "express";
import { subjectController } from "../../../controllers/exam/subject/Subject.controller";

const router = Router();

// Public routes
router.route("/")
  .get(subjectController.getAllSubjects);

router.route("/class/:classId")
  .get(subjectController.getSubjectsByClass);

router.route("/")
  .post(subjectController.createSubject);

router.route("/:id")
  .get(subjectController.getSubject)
  .put(subjectController.updateSubject)
  .delete(subjectController.deleteSubject);

export default router;