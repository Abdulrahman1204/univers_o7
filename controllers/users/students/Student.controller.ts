import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthenticatedRequest, ICloudinaryFile } from "../../../utils/types";
import { CtrlStudentService } from "../../../services/users/students/Student.service";
import { ForbiddenError } from "../../../middlewares/handleErrors";

class CtrlStudentController {
  // ~ Get => /api/ctrl/student/:id ~ Get Profile Student
  getProfileStudent = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (user?.id !== req.params.id) {
        throw new ForbiddenError("غير مصرح لك بتقييد الحساب");
      }

      const studentProfile = await CtrlStudentService.getProfileStudent(
        req.params.id
      );
      res.status(200).json(studentProfile);
    }
  );

  // ~ Put => /api/ctrl/student/updateaccount/:id ~ Update Student
  updateProfileStudent = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (user?.id !== req.params.id) {
        throw new ForbiddenError("غير مصرح لك بتقييد الحساب");
      }

      const result = await CtrlStudentService.updateProfileStudent(
        req.body,
        req.params.id
      );
      res.status(200).json({ message: result.message });
    }
  );

  // ~ Put => /api/ctrl/student/updateaccountbysuperadmin/:id ~ Update Student
  updateProfileStudentBySuperAdmin = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (user?.role !== "superAdmin") {
        throw new ForbiddenError("غير مصرح لك بتقييد الحساب");
      }

      const result = await CtrlStudentService.updateProfileStudentBySuperAdmin(
        req.body,
        req.params.id
      );
      res.status(200).json({ message: result.message });
    }
  );

  // ~ Put => /api/ctrl/student/updateprofilephoto/:id ~ Update Profile Photo Student
  updateProfilePhotoStudent = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (user?.id !== req.params.id) {
        throw new ForbiddenError("غير مصرح لك بتقييد الحساب");
      }

      const result = await CtrlStudentService.updateProfilePhotoStudent(
        req.file as ICloudinaryFile,
        req.params.id
      );
      res.status(200).json({ message: result.message });
    }
  );

  // ~ Get => /api/ctrl/students ~ Get All Students
  getAllStudents = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      if (user?.role !== "superAdmin") {
        throw new ForbiddenError("غير مصرح لك بتقييد الحساب");
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
        throw new ForbiddenError("غير مصرح لك بتقييد الحساب");
      }

      const result = await CtrlStudentService.deleteStudent(req.params.id);
      res.status(200).json({ message: result.message });
    }
  );
}

export const ctrlStudentController = new CtrlStudentController();
