import { Router } from "express";
import { classController } from "../../../controllers/exam/class/Class.controller";
import verifyToken from "../../../middlewares/verifyToken";
import checkRole from "../../../middlewares/checkRole";

const router = Router();

// Public routes
router.route("/").get(verifyToken, classController.getAllClasses);

router
  .route("/")
  .post(
    verifyToken,
    checkRole(["superAdmin", "admin"]),
    classController.createClass
  );

router
  .route("/:id")
  .get(
    verifyToken,
    checkRole(["superAdmin", "admin"]),
    classController.getClass
  )
  .put(
    verifyToken,
    checkRole(["superAdmin", "admin"]),
    classController.updateClass
  )
  .delete(
    verifyToken,
    checkRole(["superAdmin", "admin"]),
    classController.deleteClass
  );

export default router;
