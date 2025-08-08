import mongoose, { Schema, Model } from "mongoose";
import joi from "joi";
import { IAdmin } from "./dtos";
import bcrypt from "bcrypt";

// Admin Schema
const adminSchema = new Schema(
  {
    profilePhoto: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      required: true,
    },
    userName: {
      type: String,
      required: [true, "الاسم الكامل مطلوب"],
      trim: true,
      maxlength: [100, "الاسم الكامل يجب ألا يتجاوز 100 حرف"],
    },
    phoneNumber: {
      type: String,
      required: [true, "رقم الهاتف مطلوب"],
      trim: true,
      validate: {
        validator: (v) => /^09[0-9]{8}$/.test(v),
        message: (props) =>
          `${props.value} ليس رقم هاتف صالح! يجب أن يبدأ بـ 09 ويتكون من 10 أرقام.`,
      },
    },
    age: {
      type: Number,
      required: [true, "العمر مطلوب"],
      min: [17, "العمر يجب ان يكون اكبر من 17"],
    },
    password: {
      type: String,
      required: [true, "كلمة السر مطلوبة"],
      trim: true,
      minLength: 8,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "يجب ان يكون ذكر او انثى",
      },
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "superAdmin", "sales"],
        message: "يجب ان يكون يا مسؤول او بائع",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Password encryption
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

// Admin Model
const admin: Model<IAdmin> = mongoose.model<IAdmin>("Admin", adminSchema);

// Student Indexes
adminSchema.index({ createdAt: -1 });

// validation Create
const validateCreateAdmin = (obj: IAdmin): joi.ValidationResult => {
  const schema = joi.object({
    profilePhoto: joi.string().uri().messages({
      "string.uri": "رابط الصورة غير صالح",
    }),
    userName: joi.string().trim().max(100).required().messages({
      "string.empty": "الاسم الكامل مطلوب",
      "string.max": "الاسم الكامل يجب ألا يتجاوز 100 حرف",
      "any.required": "الاسم الكامل مطلوب",
    }),
    phoneNumber: joi
      .string()
      .trim()
      .pattern(/^09[0-9]{8}$/)
      .required()
      .messages({
        "string.pattern.base":
          "رقم الهاتف يجب أن يبدأ بـ 09 ويتكون من 10 أرقام",
        "string.empty": "رقم الهاتف مطلوب",
        "any.required": "رقم الهاتف مطلوب",
      }),
    age: joi.number().min(17).required().messages({
      "number.min": "العمر يجب ان يكون اكبر من 17",
      "number.base": "العمر يجب أن يكون رقماً",
      "any.required": "العمر مطلوب",
    }),
    password: joi.string().trim().min(8).required().messages({
      "string.min": "كلمة السر يجب أن تكون على الأقل 8 أحرف",
      "string.empty": "كلمة السر مطلوبة",
      "any.required": "كلمة السر مطلوبة",
    }),
    gender: joi.string().valid("male", "female").required().messages({
      "any.only": "يجب ان يكون ذكر او انثى",
      "string.empty": "الجنس مطلوب",
      "any.required": "الجنس مطلوب",
    }),
    role: joi
      .string()
      .valid("admin", "superAdmin", "sales")
      .required()
      .messages({
        "any.only": "يجب ان يكون يا مسؤول او بائع",
        "string.empty": "الدور مطلوب",
        "any.required": "الدور مطلوب",
      }),
  });

  return schema.validate(obj);
};

// validation Login
const validateLoginAdmin = (obj: IAdmin): joi.ValidationResult => {
  const schema = joi.object({
    phoneNumber: joi
      .string()
      .trim()
      .pattern(/^09[0-9]{8}$/)
      .required()
      .messages({
        "string.pattern.base":
          "رقم الهاتف يجب أن يبدأ بـ 09 ويتكون من 10 أرقام",
        "string.empty": "رقم الهاتف مطلوب",
        "any.required": "رقم الهاتف مطلوب",
      }),
    password: joi.string().trim().min(8).required().messages({
      "string.min": "كلمة السر يجب أن تكون على الأقل 8 أحرف",
      "string.empty": "كلمة السر مطلوبة",
      "any.required": "كلمة السر مطلوبة",
    }),
  });

  return schema.validate(obj);
};

// validation Update By superAdmin
const validateUpdateBySuperAdmin = (obj: IAdmin): joi.ValidationResult => {
  const schema = joi.object({
    userName: joi.string().trim().max(100).required().messages({
      "string.empty": "الاسم الكامل مطلوب",
      "string.max": "الاسم الكامل يجب ألا يتجاوز 100 حرف",
      "any.required": "الاسم الكامل مطلوب",
    }),
    phoneNumber: joi
      .string()
      .trim()
      .pattern(/^09[0-9]{8}$/)
      .required()
      .messages({
        "string.pattern.base":
          "رقم الهاتف يجب أن يبدأ بـ 09 ويتكون من 10 أرقام",
        "string.empty": "رقم الهاتف مطلوب",
        "any.required": "رقم الهاتف مطلوب",
      }),
    age: joi.number().min(17).required().messages({
      "number.min": "العمر يجب ان يكون اكبر من 17",
      "number.base": "العمر يجب أن يكون رقماً",
      "any.required": "العمر مطلوب",
    }),
    password: joi.string().trim().min(8).required().messages({
      "string.min": "كلمة السر يجب أن تكون على الأقل 8 أحرف",
      "string.empty": "كلمة السر مطلوبة",
      "any.required": "كلمة السر مطلوبة",
    }),
    gender: joi.string().valid("male", "female").required().messages({
      "any.only": "يجب ان يكون ذكر او انثى",
      "string.empty": "الجنس مطلوب",
      "any.required": "الجنس مطلوب",
    }),
    role: joi
      .string()
      .valid("admin", "superAdmin", "sales")
      .required()
      .messages({
        "any.only": "يجب ان يكون يا مسؤول او بائع",
        "string.empty": "الدور مطلوب",
        "any.required": "الدور مطلوب",
      }),
  });

  return schema.validate(obj);
};

// validation Update
const validateUpdateAdmin = (obj: IAdmin): joi.ValidationResult => {
  const schema = joi.object({
    userName: joi.string().trim().max(100).messages({
      "string.empty": "الاسم الكامل مطلوب",
      "string.max": "الاسم الكامل يجب ألا يتجاوز 100 حرف",
      "any.required": "الاسم الكامل مطلوب",
    }),
  });

  return schema.validate(obj);
};

// validation Update Profile Photo
const validateUpdateProfilePhotoAdmin = (obj: IAdmin): joi.ValidationResult => {
  const schema = joi.object({
    profilePhoto: joi.string().required().uri().messages({
      "string.uri": "رابط الصورة غير صالح",
    }),
  });

  return schema.validate(obj);
};

// validation Update Password
const validateUpdatePasswordAdmin = (obj: IAdmin): joi.ValidationResult => {
  const schema = joi.object({
    password: joi.string().trim().min(8).required().messages({
      "string.min": "كلمة السر يجب أن تكون على الأقل 8 أحرف",
      "string.empty": "كلمة السر مطلوبة",
      "any.required": "كلمة السر مطلوبة",
    }),
  });

  return schema.validate(obj);
};

export {
  admin,
  validateCreateAdmin,
  validateUpdateAdmin,
  validateUpdateProfilePhotoAdmin,
  validateUpdateBySuperAdmin,
  validateUpdatePasswordAdmin,
  validateLoginAdmin,
};
