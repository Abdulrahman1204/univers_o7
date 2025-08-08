import {
  BadRequestError,
  NotFoundError,
} from "../../../middlewares/handleErrors";
import { IStudent } from "../../../models/users/students/dtos";
import {
  student,
  validateUpdateStudent,
  validateUpdateStudentByAdmins,
} from "../../../models/users/students/Student.model";
import bcrypt from "bcryptjs";
import { ICloudinaryFile } from "../../../utils/types";

class CtrlStudentService {
  // ~ Get => /api/ctrl/student/:id ~ Get Profile Student
  static async getProfileStudent(id: string) {
    const existingHaveStudent = await student
      .findById(id)
      .select("-password -createdAt -updatedAt -__v");

    if (!existingHaveStudent) {
      throw new BadRequestError("المستخدم غير موجود");
    }

    return existingHaveStudent;
  }

  // ~ Put => /api/ctrl/student/updateaccount/:id ~ Update Student
  static async updateProfileStudent(studentData: IStudent, id: string) {
    const { error } = validateUpdateStudent(studentData);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const existingHaveStudent = await student.findById(id);
    if (!existingHaveStudent) {
      throw new BadRequestError("المستخدم غير موجود");
    }

    const updatedStudent = await student.findByIdAndUpdate(
      id,
      {
        $set: {
          userName: studentData.userName,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      throw new Error("فشل تحديث معلومات المستخدم");
    }

    return { message: "تم التحديث بنجاح" };
  }

  // ~ Put => /api/ctrl/student/updateaccountbysuperadmin/:id ~ Update Student
  static async updateProfileStudentBySuperAdmin(
    studentData: IStudent,
    id: string
  ) {
    const { error } = validateUpdateStudentByAdmins(studentData);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const existingHaveStudent = await student.findById(id);
    if (!existingHaveStudent) {
      throw new BadRequestError("المستخدم غير موجود");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(studentData.password, salt);

    const updatedStudent = await student.findByIdAndUpdate(
      id,
      {
        $set: {
          userName: studentData.userName,
          age: studentData.age,
          phoneNumber: studentData.phoneNumber,
          password: hashedPassword && existingHaveStudent.password,
          gender: studentData.gender,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      throw new BadRequestError("فشل تحديث معلومات المستخدم");
    }

    return { message: "تم التحديث بنجاح" };
  }

  // ~ Put => /api/ctrl/student/updateprofilephoto/:id ~ Update Profile Photp Student
  static async updateProfilePhotoStudent(file: ICloudinaryFile, id: string) {
    const existingHaveStudent = await student.findById(id);
    if (!existingHaveStudent) {
      throw new BadRequestError("المستخدم غير موجود");
    }

    if (!file) {
      throw new BadRequestError("صورة الملف الشخصي مطلوبة");
    }

    const updatedStudent = await student.findByIdAndUpdate(
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

    if (!updatedStudent) {
      throw new Error("فشل تحديث صورة الملف الشخصي");
    }

    return {
      message: "تم تحديث صورة الملف الشخصي بنجاح",
    };
  }

  // ~ Get => /api/ctrl/students ~ Get All Students
  static async getAllStudents() {
    const students = await student
      .find()
      .select("-password -createdAt -updatedAt -__v");
    if (!students) {
      throw new NotFoundError("لا يوجد مستخدمين");
    }

    return students;
  }

  // ~ Delete => /api/ctrl/student/:id ~ Delete Student
  static async deleteStudent(id: string) {
    const existingHaveStudent = await student.findById(id);
    if (!existingHaveStudent) {
      throw new BadRequestError("المستخدم غير موجود");
    }

    const deleteStudent = await student.findByIdAndDelete(id);

    if (!deleteStudent) {
      throw new BadRequestError("فشل حذف المستخدم");
    }

    return { message: "تم حذف الحساب بنجاح" };
  }
}

export { CtrlStudentService };
