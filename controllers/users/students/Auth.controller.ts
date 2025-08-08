import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ICloudinaryFile } from "../../../utils/types";
import { AuthStudentService } from "../../../services/users/students/Auth.service";

class AuthStudentController {
  // ~ Post => /api/auth/student/register ~ Create New Student
  createNewStudent = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await AuthStudentService.createNewStudent(
        req.body,
        req.file as ICloudinaryFile
      );

      res.cookie("jwtToken", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 30 * 1000,
      });

      res.status(201).json({ message: result.message });
    }
  );

  // ~ Post => /api/auth/student/login ~ login Student
  loginStudent = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await AuthStudentService.loginStudent(req.body);

      res.cookie("jwtToken", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 30 * 1000,
      });

      res.status(201).json({ message: result.message });
    }
  );
}

export const authStudentController = new AuthStudentController();
