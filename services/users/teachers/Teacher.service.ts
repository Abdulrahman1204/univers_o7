import {
  BadRequestError,
  NotFoundError,
} from "../../../middlewares/handleErrors";
import { ITeacher } from "../../../models/users/teachers/dtos";
import {
  teacher,
  validateUpdateTeacher,
  validateUpdateTeacherByAdmins,
} from "../../../models/users/teachers/Teacher.model";
import bcrypt from "bcryptjs";
import { ICloudinaryFile } from "../../../utils/types";

class CtrlTeacherService {
  // ~ Get => /api/ctrl/teacher/:id ~ Get Profile Teacher
  static async getProfileTeacher(id: string) {
    const existingHaveTeacher = await teacher
      .findById(id)
      .select("-password -createdAt -updatedAt -__v");
    if (!existingHaveTeacher) {
      throw new BadRequestError("المستخدم غير موجود");
    }

    return existingHaveTeacher;
  }

  // ~ Put => /api/ctrl/teacher/updateaccount/:id ~ Update Teacher
  static async updateProfileTeacher(teacherData: ITeacher, id: string) {
    const { error } = validateUpdateTeacher(teacherData);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const existingHaveTeacher = await teacher.findById(id);
    if (!existingHaveTeacher) {
      throw new BadRequestError("المستخدم غير موجود");
    }

    const updatedTeacher = await teacher.findByIdAndUpdate(
      id,
      {
        $set: {
          userName: teacherData.userName,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedTeacher) {
      throw new Error("فشل تحديث معلومات المستخدم");
    }

    return { message: "تم التحديث بنجاح" };
  }

  // ~ Put => /api/ctrl/teacher/updateaccountbysuperadmin/:id ~ Update Teacher
  static async updateProfileTeacherBySuperAdmin(
    teacherData: ITeacher,
    id: string
  ) {
    const { error } = validateUpdateTeacherByAdmins(teacherData);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const existingHaveTeacher = await teacher.findById(id);
    if (!existingHaveTeacher) {
      throw new BadRequestError("المستخدم غير موجود");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(teacherData.password, salt);

    const updatedTeacher = await teacher.findByIdAndUpdate(
      id,
      {
        $set: {
          userName: teacherData.userName,
          age: teacherData.age,
          phoneNumber: teacherData.phoneNumber,
          password: hashedPassword && existingHaveTeacher.password,
          gender: teacherData.gender,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedTeacher) {
      throw new BadRequestError("فشل تحديث معلومات المستخدم");
    }

    return { message: "تم التحديث بنجاح" };
  }

  // ~ Put => /api/ctrl/teacher/updateprofilephoto/:id ~ Update Profile Photp Teacher
  static async updateProfilePhotoTeacher(file: ICloudinaryFile, id: string) {
    const existingHaveTeacher = await teacher.findById(id);
    if (!existingHaveTeacher) {
      throw new BadRequestError("المستخدم غير موجود");
    }

    if (!file) {
      throw new BadRequestError("صورة الملف الشخصي مطلوبة");
    }

    const updatedTeacher = await teacher.findByIdAndUpdate(
      id,
      {
        $set: {
          profilePhoto: file.path,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTeacher) {
      throw new Error("فشل تحديث صورة الملف الشخصي");
    }

    return {
      message: "تم تحديث صورة الملف الشخصي بنجاح",
    };
  }

  // ~ Get => /api/ctrl/teachers ~ Get All Teachers
  static async getAllTeachers() {
    const teachers = await teacher
      .find()
      .select("-password -createdAt -updatedAt -__v");
    if (!teachers) {
      throw new NotFoundError("لا يوجد مستخدمين");
    }

    return teachers;
  }

  // ~ Delete => /api/ctrl/teacher/:id ~ Delete Teacher
  static async deleteTeacher(id: string) {
    const existingHaveTeacher = await teacher.findById(id);
    if (!existingHaveTeacher) {
      throw new BadRequestError("المستخدم غير موجود");
    }

    const deleteTeacher = await teacher.findByIdAndDelete(id);

    if (!deleteTeacher) {
      throw new BadRequestError("فشل حذف المستخدم");
    }

    return { message: "تم حذف الحساب بنجاح" };
  }
}

export { CtrlTeacherService };
