import { BadRequestError } from "../../../middlewares/handleErrors";
import { IStudent } from "../../../models/users/students/dtos";
import {
  student,
  validateCreateStudent,
  validateLoginStudent,
} from "../../../models/users/students/Student.model";
import { generateJWT } from "../../../utils/generateToken";
import { ICloudinaryFile } from "../../../utils/types";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";

class AuthStudentService {
  // ~ Post => /api/auth/student/register ~ Create New Student
  static async createNewStudent(studentData: IStudent, file: ICloudinaryFile) {
    const { error } = validateCreateStudent(studentData);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const existingHaveStudent = await student.findOne({
      phoneNumber: studentData.phoneNumber,
    });
    if (existingHaveStudent) {
      throw new BadRequestError("رقم الهاتف موجود مسبقاٌ");
    }

    let profilePhotoUrl =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

    if (file) {
      profilePhotoUrl = file.path;
    }

    const newUser = await student.create({
      profilePhoto: profilePhotoUrl,
      userName: studentData.userName,
      age: studentData.age,
      phoneNumber: studentData.phoneNumber,
      password: studentData.password,
      gender: studentData.gender,
    });

    const token = generateJWT({
      userName: newUser.userName,
      id: (newUser._id as Types.ObjectId).toString(),
      role: "student",
    });

    return { token, message: "تم إنشاء الحساب بنجاح" };
  }

  // ~ Post => /api/auth/student/login ~ login Student
  static async loginStudent(studentLogin: IStudent) {
    const { error } = validateLoginStudent(studentLogin);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const existingHaveStudent = await student.findOne({
      phoneNumber: studentLogin.phoneNumber,
    });
    if (!existingHaveStudent) {
      throw new BadRequestError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    const isPasswordValid = await bcrypt.compare(
      studentLogin.password,
      existingHaveStudent.password
    );
    if (!isPasswordValid) {
      throw new BadRequestError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    console.log({isPasswordValid: isPasswordValid})


    const token = generateJWT({
      userName: existingHaveStudent.userName,
      id: (existingHaveStudent._id as Types.ObjectId).toString(),
      role: "student",
    });

    return { token, message: "تم تسجيل الدخول بنجاح" };
  }
}

export { AuthStudentService };
