import { BadRequestError } from "../../../middlewares/handleErrors";
import { ITeacher } from "../../../models/users/teachers/dtos";
import {
  teacher,
  validateCreateTeacher,
  validateLoginTeacher,
} from "../../../models/users/teachers/Teacher.model";
import { generateJWT } from "../../../utils/generateToken";
import { ICloudinaryFile } from "../../../utils/types";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";

class AuthTeacherService {
  // ~ Post => /api/auth/teacher/register ~ Create New Teacher
  static async createNewTeacher(teacherData: ITeacher, file: ICloudinaryFile) {
    const { error } = validateCreateTeacher(teacherData);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const existingHaveTeacher = await teacher.findOne({
      phoneNumber: teacherData.phoneNumber,
    });
    if (existingHaveTeacher) {
      throw new BadRequestError("رقم الهاتف موجود مسبقاٌ");
    }

    let profilePhotoUrl =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

    if (file) {
      profilePhotoUrl = file.path;
    }

    await teacher.create({
      profilePhoto: profilePhotoUrl,
      userName: teacherData.userName,
      age: teacherData.age,
      phoneNumber: teacherData.phoneNumber,
      password: teacherData.password,
      gender: teacherData.gender,
    });

    return { message: "تم إنشاء الحساب بنجاح" };
  }

  // ~ Post => /api/auth/teacher/login ~ login Teacher
  static async loginTeacher(teacherLogin: ITeacher) {
    const { error } = validateLoginTeacher(teacherLogin);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const existingHaveTeacher = await teacher.findOne({
      phoneNumber: teacherLogin.phoneNumber,
    });
    if (!existingHaveTeacher) {
      throw new BadRequestError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    const isPasswordValid = await bcrypt.compare(
      teacherLogin.password,
      existingHaveTeacher.password
    );
    if (!isPasswordValid) {
      throw new BadRequestError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    const token = generateJWT({
      userName: existingHaveTeacher.userName,
      id: (existingHaveTeacher._id as Types.ObjectId).toString(),
      role: "admin",
    });

    return { token, message: "تم تسجيل الدخول بنجاح" };
  }
}

export { AuthTeacherService };
