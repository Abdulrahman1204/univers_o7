import jwt from "jsonwebtoken";
import { JWTPayload } from "./types";

export function generateJWT(user: JWTPayload): string {
  const privateKey = process.env.JWT_SECRET_KEY as string;

  if (!privateKey) {
    throw new Error("JWT_SECRET_KEY is not defined in environment variables");
  }

  return jwt.sign(user, privateKey, {
    expiresIn: "30d",
    algorithm: "HS256",
  });
}
