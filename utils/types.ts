import { Request } from "express";

/**
 * إرسال بريد إلكتروني بسيط
 * @param to البريد المستلم
 * @param subject عنوان الرسالة
 * @param text النص العادي للرسالة
 */
export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

/**
 * انشاء token
 */
export interface JWTPayload {
  userName: string;
  id: string;
  role: string;
}

/**
 * من اجل التحقق
 */
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}


export interface ICloudinaryFile extends Express.Multer.File {
  path: string;
}
