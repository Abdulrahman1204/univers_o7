import { Router } from "express";
import { ctrlAdminController } from "../../../controllers/users/admins/Admin.controller";
import upload from "../../../middlewares/cloudinary";

const router = Router();

// ~ GET /api/ctrl/admin/:id ~ Get Profile Admin
router.route("/:id").get(ctrlAdminController.getProfileAdmin);

// ~ PUT /api/ctrl/admin/updateaccount/:id ~ Update Admin
router.route("/updateaccount/:id").put(ctrlAdminController.updateProfileAdmin);

// ~ PUT /api/ctrl/admin/updateaccountbysuperadmin/:id ~ Update Admin by Super Admin
router
  .route("/updateaccountbysuperadmin/:id")
  .put(ctrlAdminController.updateProfileAdminBySuperAdmin);

// ~ PUT /api/ctrl/admin/updateprofilephoto/:id ~ Update Profile Photo
router
  .route("/updateprofilephoto/:id")
  .put(upload, ctrlAdminController.updateProfilePhotoAdmin);

// ~ GET /api/ctrl/admins ~ Get All Admins
router.route("/").get(ctrlAdminController.getAllAdmins);

// ~ DELETE /api/ctrl/admin/:id ~ Delete Admin
router.route("/:id").delete(ctrlAdminController.deleteAdmin);

export default router;
