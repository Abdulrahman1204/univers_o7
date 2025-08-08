import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthAdminService } from "../../../services/users/admins/Auth.service";
import { ICloudinaryFile } from "../../../utils/types";

class AuthAdminController {
  // ~ Post => /api/auth/admin/register ~ Create New Admin
  createNewAdmin = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await AuthAdminService.createNewAdmin(
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

  // ~ Post => /api/auth/admin/login ~ login Admin
  loginAdmin = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await AuthAdminService.loginAdmin(req.body);

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

export const authAdminController = new AuthAdminController();
