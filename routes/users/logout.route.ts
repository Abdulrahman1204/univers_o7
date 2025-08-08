import { Router } from "express";
import { authLogoutController } from "../../controllers/users/logout.controller";

const router = Router();

// ~ Get => /api/auth/logout ~ Sign Out
router.route("/logout").get(authLogoutController.logout);

export default router;
