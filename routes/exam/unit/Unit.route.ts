import { Router } from "express";
import { unitController } from "../../../controllers/exam/unit/Unit.controller";

const router = Router();

// Public routes
router.route("/")
  .get(unitController.getAllUnits);

router.route("/subject/:subjectId")
  .get(unitController.getUnitsBySubject);

router.route("/")
  .post(unitController.createUnit);

router.route("/:id")
  .get(unitController.getUnit)
  .put(unitController.updateUnit)
  .delete(unitController.deleteUnit);

export default router;