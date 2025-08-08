import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthenticatedRequest, ICloudinaryFile } from "../../../utils/types";
import { CtrlAdminService } from "../../../services/users/admins/Admin.service";
import { ForbiddenError, NotFoundError } from "../../../middlewares/handleErrors";

class CtrlAdminController {
  // ~ Get => /api/ctrl/admin/:id ~ Get Profile Admin
  getProfileAdmin = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (!user) {
        throw new NotFoundError('Error: Token Not Found')
      }

      const adminProfile = await CtrlAdminService.getProfileAdmin(user?.id);
      res.status(200).json(adminProfile);
    }
  );

  // ~ Put => /api/ctrl/admin/updateaccount/:id ~ Update Admin
  updateProfileAdmin = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (user?.id !== req.params.id) {
        throw new ForbiddenError("غير مصرح لك");
      }

      const result = await CtrlAdminService.updateProfileAdmin(
        req.body,
        user?.id
      );
      res.status(200).json({ message: result.message });
    }
  );

  // ~ Put => /api/ctrl/admin/updateaccountbysuperadmin/:id ~ Update Admin
  updateProfileAdminBySuperAdmin = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (user?.role !== "superAdmin") {
        throw new ForbiddenError("غير مصرح لك");
      }

      const result = await CtrlAdminService.updateProfileAdminBySuperAdmin(
        req.body,
        user?.id
      );
      res.status(200).json({ message: result.message });
    }
  );

  // ~ Put => /api/ctrl/admin/updateprofilephoto/:id ~ Update Profile Photo Admin
  updateProfilePhotoAdmin = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (user?.id !== req.params.id) {
        throw new ForbiddenError("غير مصرح لك");
      }

      const result = await CtrlAdminService.updateProfilePhotoAdmin(
        req.file as ICloudinaryFile,
        user?.id
      );
      res.status(200).json({ message: result.message });
    }
  );

  // ~ Get => /api/ctrl/admins ~ Get All Admins
  getAllAdmins = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (user?.role !== "superAdmin") {
        throw new ForbiddenError("غير مصرح لك");
      }

      const admins = await CtrlAdminService.getAllAdmins();
      res.status(200).json(admins);
    }
  );

  // ~ Delete => /api/ctrl/admin/:id ~ Delete Admin
  deleteAdmin = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (user?.role !== "superAdmin" && user?.id !== req.params.id) {
        throw new ForbiddenError("غير مصرح لك");
      }

      const result = await CtrlAdminService.deleteAdmin(user?.id);
      res.status(200).json({ message: result.message });
    }
  );
}

export const ctrlAdminController = new CtrlAdminController();
