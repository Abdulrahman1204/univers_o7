import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthenticatedRequest, ICloudinaryFile } from "../../../utils/types";
import { AuthTeacherService } from "../../../services/users/teachers/Auth.service";
import { ForbiddenError } from "../../../middlewares/handleErrors";

class AuthTeacherController {
  // ~ Post => /api/auth/teacher/register ~ Create New Teacher
  createNewTeacher = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await AuthTeacherService.createNewTeacher(
        req.body,
        req.file as ICloudinaryFile
      );

      res.status(201).json({ message: result.message });
    }
  );

  // ~ Post => /api/auth/teacher/login ~ login Teacher
  loginTeacher = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await AuthTeacherService.loginTeacher(req.body);

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

export const authTeacherController = new AuthTeacherController();
