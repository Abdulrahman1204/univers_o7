import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthenticatedRequest, ICloudinaryFile } from "../../../utils/types";
import { CtrlStudentService } from "../../../services/users/students/Student.service";
import {
  ForbiddenError,
  NotFoundError,
} from "../../../middlewares/handleErrors";

class CtrlStudentController {
  // ~ Get => /api/ctrl/student/:id ~ Get Profile Student
  getProfileStudent = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (!user) {
        throw new NotFoundError("Error: Token Not Found");
      }

      const studentProfile = await CtrlStudentService.getProfileStudent(
        user?.id
      );
      res.status(200).json(studentProfile);
    }
  );

  // ~ Put => /api/ctrl/student/updateaccount/:id ~ Update Student
  updateProfileStudent = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (user?.id !== req.params.id) {
        throw new ForbiddenError("غير مصرح لك");
      }

      const result = await CtrlStudentService.updateProfileStudent(
        req.body,
        user?.id
      );
      res.status(200).json({ message: result.message });
    }
  );

  // ~ Put => /api/ctrl/student/updateaccountbysuperadmin/:id ~ Update Student
  updateProfileStudentBySuperAdmin = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (user?.role !== "superAdmin") {
        throw new ForbiddenError("غير مصرح لك");
      }

      const result = await CtrlStudentService.updateProfileStudentBySuperAdmin(
        req.body,
        user?.id
      );
      res.status(200).json({ message: result.message });
    }
  );

  // ~ Put => /api/ctrl/student/updateprofilephoto/:id ~ Update Profile Photo Student
  updateProfilePhotoStudent = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (user?.id !== req.params.id) {
        throw new ForbiddenError("غير مصرح لك");
      }

      const result = await CtrlStudentService.updateProfilePhotoStudent(
        req.file as ICloudinaryFile,
        user?.id
      );
      res.status(200).json({ message: result.message });
    }
  );

  // ~ Get => /api/ctrl/students ~ Get All Students
  getAllStudents = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (user?.role !== "superAdmin") {
        throw new ForbiddenError("غير مصرح لك");
      }

      const students = await CtrlStudentService.getAllStudents();
      res.status(200).json(students);
    }
  );

  // ~ Delete => /api/ctrl/student/:id ~ Delete Student
  deleteStudent = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (user?.role !== "superAdmin" && user?.id !== req.params.id) {
        throw new ForbiddenError("غير مصرح لك");
      }

      const result = await CtrlStudentService.deleteStudent(user?.id);
      res.status(200).json({ message: result.message });
    }
  );
}

export const ctrlStudentController = new CtrlStudentController();
