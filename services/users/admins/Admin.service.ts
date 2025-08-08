import {
  BadRequestError,
  NotFoundError,
} from "../../../middlewares/handleErrors";
import { IAdmin } from "../../../models/users/admins/dtos";
import {
  admin,
  validateUpdateAdmin,
  validateUpdateBySuperAdmin
} from "../../../models/users/admins/Admin.model";
import bcrypt from "bcryptjs";
import { ICloudinaryFile } from "../../../utils/types";

class CtrlAdminService {
  // ~ Get => /api/ctrl/admin/:id ~ Get Profile Admin
  static async getProfileAdmin(id: string) {
    const existingHaveAdmin = await admin
      .findById(id)
      .select("-password -createdAt -updatedAt -__v");
    if (!existingHaveAdmin) {
      throw new BadRequestError("المستخدم غير موجود");
    }

    return existingHaveAdmin;
  }

  // ~ Put => /api/ctrl/admin/updateaccount/:id ~ Update Admin
  static async updateProfileAdmin(adminData: IAdmin, id: string) {
    const { error } = validateUpdateAdmin(adminData);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const existingHaveAdmin = await admin.findById(id);
    if (!existingHaveAdmin) {
      throw new BadRequestError("المستخدم غير موجود");
    }

    const updatedAdmin = await admin.findByIdAndUpdate(
      id,
      {
        $set: {
          userName: adminData.userName,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedAdmin) {
      throw new Error("فشل تحديث معلومات المستخدم");
    }

    return { message: "تم التحديث بنجاح" };
  }

  // ~ Put => /api/ctrl/admin/updateaccountbysuperadmin/:id ~ Update Admin
  static async updateProfileAdminBySuperAdmin(adminData: IAdmin, id: string) {
    const { error } = validateUpdateBySuperAdmin(adminData);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const existingHaveAdmin = await admin.findById(id);
    if (!existingHaveAdmin) {
      throw new BadRequestError("المستخدم غير موجود");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    const updatedAdmin = await admin.findByIdAndUpdate(
      id,
      {
        $set: {
          userName: adminData.userName,
          age: adminData.age,
          phoneNumber: adminData.phoneNumber,
          password: hashedPassword && existingHaveAdmin.password,
          gender: adminData.gender,
          role: adminData.role,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedAdmin) {
      throw new BadRequestError("فشل تحديث معلومات المستخدم");
    }

    return { message: "تم التحديث بنجاح" };
  }

  // ~ Put => /api/ctrl/admin/updateprofilephoto/:id ~ Update Profile Photp Admin
  static async updateProfilePhotoAdmin(file: ICloudinaryFile, id: string) {
    const existingHaveAdmin = await admin.findById(id);
    if (!existingHaveAdmin) {
      throw new BadRequestError("المستخدم غير موجود");
    }

    if (!file) {
      throw new BadRequestError("صورة الملف الشخصي مطلوبة");
    }

    const updatedAdmin = await admin.findByIdAndUpdate(
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

    if (!updatedAdmin) {
      throw new Error("فشل تحديث صورة الملف الشخصي");
    }

    return {
      message: "تم تحديث صورة الملف الشخصي بنجاح",
    };
  }

  // ~ Get => /api/ctrl/admins ~ Get All Admins
  static async getAllAdmins() {
    const admins = await admin
      .find()
      .select("-password -createdAt -updatedAt -__v");
    if (!admins) {
      throw new NotFoundError("لا يوجد مستخدمين");
    }

    return admins;
  }

  // ~ Delete => /api/ctrl/admin/:id ~ Delete Admin
  static async deleteAdmin(id: string) {
    const existingHaveAdmin = await admin.findById(id);
    if (!existingHaveAdmin) {
      throw new BadRequestError("المستخدم غير موجود");
    }

    const deleteAdmin = await admin.findByIdAndDelete(id);

    if (!deleteAdmin) {
      throw new BadRequestError("فشل حذف المستخدم");
    }

    return { message: "تم حذف الحساب بنجاح" };
  }
}

export { CtrlAdminService };
