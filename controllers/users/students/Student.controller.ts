import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ICloudinaryFile } from "../../../utils/types";
import { CtrlStudentService } from "../../../services/users/students/Student.service";

class CtrlStudentController {
  // ~ Get => /api/ctrl/student/:id ~ Get Profile Student
  getProfileStudent = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const studentProfile = await CtrlStudentService.getProfileStudent(
        req.params.id
      );
      res.status(200).json(studentProfile);
    }
  );

  // ~ Put => /api/ctrl/student/updateaccount/:id ~ Update Student
  updateProfileStudent = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
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
      const students = await CtrlStudentService.getAllStudents();
      res.status(200).json(students);
    }
  );

  // ~ Delete => /api/ctrl/student/:id ~ Delete Student
  deleteStudent = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await CtrlStudentService.deleteStudent(req.params.id);
      res.status(200).json({ message: result.message });
    }
  );
}

export const ctrlStudentController = new CtrlStudentController();