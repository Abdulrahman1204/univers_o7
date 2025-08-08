import { BadRequestError } from "../../../middlewares/handleErrors";
import { IAdmin } from "../../../models/users/admins/dtos";
import {
  admin,
  validateCreateAdmin,
  validateLoginAdmin,
} from "../../../models/users/admins/Admin.model";
import { generateJWT } from "../../../utils/generateToken";
import { ICloudinaryFile } from "../../../utils/types";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";

class AuthAdminService {
  // ~ Post => /api/auth/admin/register ~ Create New Admin
  static async createNewAdmin(adminData: IAdmin, file?: ICloudinaryFile) {
    const { error } = validateCreateAdmin(adminData);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const existingHaveAdmin = await admin.findOne({
      phoneNumber: adminData.phoneNumber,
    });
    if (existingHaveAdmin) {
      throw new BadRequestError("رقم الهاتف موجود مسبقاٌ");
    }

    let profilePhotoUrl =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

    if (file) {
      profilePhotoUrl = file.path;
    }

    const newUser = await admin.create({
      profilePhoto: profilePhotoUrl,
      userName: adminData.userName,
      age: adminData.age,
      phoneNumber: adminData.phoneNumber,
      password: adminData.password,
      gender: adminData.gender,
      role: adminData.role,
    });

    const token = generateJWT({
      userName: newUser.userName,
      id: (newUser._id as Types.ObjectId).toString(),
      role: "admin",
    });

    return { token, message: "تم إنشاء الحساب بنجاح" };
  }

  // ~ Post => /api/auth/admin/login ~ login Admin
  static async loginAdmin(adminLogin: IAdmin) {
    const { error } = validateLoginAdmin(adminLogin);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const existingHaveAdmin = await admin.findOne({
      phoneNumber: adminLogin.phoneNumber,
    });
    if (!existingHaveAdmin) {
      throw new BadRequestError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    const isPasswordValid = await bcrypt.compare(
      adminLogin.password,
      existingHaveAdmin.password
    );
    if (!isPasswordValid) {
      throw new BadRequestError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    const token = generateJWT({
      userName: existingHaveAdmin.userName,
      id: (existingHaveAdmin._id as Types.ObjectId).toString(),
      role: "admin",
    });

    return { token, message: "تم تسجيل الدخول بنجاح" };
  }
}

export { AuthAdminService };
