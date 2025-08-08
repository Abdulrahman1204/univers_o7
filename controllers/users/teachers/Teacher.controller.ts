import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthenticatedRequest, ICloudinaryFile } from "../../../utils/types";
import { CtrlTeacherService } from "../../../services/users/teachers/Teacher.service";
import {
  ForbiddenError,
  NotFoundError,
} from "../../../middlewares/handleErrors";

class CtrlTeacherController {
  // ~ Get => /api/ctrl/teacher/:id ~ Get Profile Teacher
  getProfileTeacher = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (!user) {
        throw new NotFoundError("Error: Token Not Found");
      }

      const teacherProfile = await CtrlTeacherService.getProfileTeacher(
        user?.id
      );
      res.status(200).json(teacherProfile);
    }
  );

  // ~ Put => /api/ctrl/teacher/updateaccount/:id ~ Update Teacher
  updateProfileTeacher = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (user?.id !== req.params.id) {
        throw new ForbiddenError("غير مصرح لك");
      }

      const result = await CtrlTeacherService.updateProfileTeacher(
        req.body,
        user?.id
      );
      res.status(200).json({ message: result.message });
    }
  );

  // ~ Put => /api/ctrl/teacher/updateaccountbysuperadmin/:id ~ Update Teacher
  updateProfileTeacherBySuperAdmin = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (user?.role !== "superAdmin") {
        throw new ForbiddenError("غير مصرح لك");
      }

      const result = await CtrlTeacherService.updateProfileTeacherBySuperAdmin(
        req.body,
        user?.id
      );
      res.status(200).json({ message: result.message });
    }
  );

  // ~ Put => /api/ctrl/teacher/updateprofilephoto/:id ~ Update Profile Photo Teacher
  updateProfilePhotoTeacher = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (user?.id !== req.params.id) {
        throw new ForbiddenError("غير مصرح لك");
      }

      const result = await CtrlTeacherService.updateProfilePhotoTeacher(
        req.file as ICloudinaryFile,
        user?.id
      );
      res.status(200).json({ message: result.message });
    }
  );

  // ~ Get => /api/ctrl/teachers ~ Get All Teachers
  getAllTeachers = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (user?.role !== "superAdmin") {
        throw new ForbiddenError("غير مصرح لك");
      }

      const teachers = await CtrlTeacherService.getAllTeachers();
      res.status(200).json(teachers);
    }
  );

  // ~ Delete => /api/ctrl/teacher/:id ~ Delete Teacher
  deleteTeacher = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (user?.role !== "superAdmin" && user?.id !== req.params.id) {
        throw new ForbiddenError("غير مصرح لك");
      }

      const result = await CtrlTeacherService.deleteTeacher(user?.id);
      res.status(200).json({ message: result.message });
    }
  );
}

export const ctrlTeacherController = new CtrlTeacherController();
