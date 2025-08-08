import { Router } from "express";
import { ctrlAdminController } from "../../../controllers/users/admins/Admin.controller";
import upload from "../../../middlewares/cloudinary";
import verifyToken from "../../../middlewares/verifyToken";
import checkRole from "../../../middlewares/checkRole";

const router = Router();

// ~ GET /api/ctrl/admin/:id ~ Get Profile Admin
router
  .route("/")
  .get(
    verifyToken,
    checkRole(["superAdmin", "admin", "sales"]),
    ctrlAdminController.getProfileAdmin
  );

// ~ PUT /api/ctrl/admin/updateaccount/:id ~ Update Admin
router
  .route("/updateaccount/:id")
  .put(
    verifyToken,
    checkRole(["superAdmin", "admin", "sales"]),
    ctrlAdminController.updateProfileAdmin
  );

// ~ PUT /api/ctrl/admin/updateaccountbysuperadmin/:id ~ Update Admin by Super Admin
router
  .route("/updateaccountbysuperadmin/:id")
  .put(
    verifyToken,
    checkRole(["superAdmin"]),
    ctrlAdminController.updateProfileAdminBySuperAdmin
  );

// ~ PUT /api/ctrl/admin/updateprofilephoto/:id ~ Update Profile Photo
router
  .route("/updateprofilephoto/:id")
  .put(
    verifyToken,
    checkRole(["superAdmin", "admin", "sales"]),
    upload,
    ctrlAdminController.updateProfilePhotoAdmin
  );

// ~ GET /api/ctrl/admins ~ Get All Admins
router
  .route("/")
  .get(
    verifyToken,
    checkRole(["superAdmin"]),
    ctrlAdminController.getAllAdmins
  );

// ~ DELETE /api/ctrl/admin/:id ~ Delete Admin
router
  .route("/:id")
  .delete(
    verifyToken,
    checkRole(["superAdmin", "admin", "sales"]),
    ctrlAdminController.deleteAdmin
  );

export default router;
