import { Router } from "express";
import { classController } from "../../../controllers/exam/class/Class.controller";

const router = Router();

// Public routes
router.route("/").get(classController.getAllClasses);

router.route("/").post(classController.createClass);

router
  .route("/:id")
  .get(classController.getClass)
  .put(classController.updateClass)
  .delete(classController.deleteClass);

export default router;
