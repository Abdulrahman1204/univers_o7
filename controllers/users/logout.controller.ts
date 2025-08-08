import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

class AuthLogoutController {
  // ~ Get => /api/auth/logout ~ Sign Out
  logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    res.clearCookie("jwtToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
    });

    res.status(200).json({
      message: "Successfully logged out",
    });
  });
}

export const authLogoutController = new AuthLogoutController();
