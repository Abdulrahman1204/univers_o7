import { Router } from "express";
import { authAdminController } from "../../../controllers/users/admins/Auth.controller";
import upload from "../../../middlewares/cloudinary";
import verifyToken from "../../../middlewares/verifyToken";
import checkRole from "../../../middlewares/checkRole";

const router = Router();

// ~ POST /api/auth/admin/register ~ Create New Admin
router
  .route("/register")
  .post(
    verifyToken,
    checkRole(["superAdmin"]),
    upload,
    authAdminController.createNewAdmin
  );

// ~ POST /api/auth/admin/login ~ Login Admin
router.route("/login").post(authAdminController.loginAdmin);

export default router;
