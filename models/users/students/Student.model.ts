import mongoose, { Schema, Model } from "mongoose";
import joi from "joi";
import { IStudent } from "./dtos";
import bcrypt from "bcrypt";

// Student Schema
const studentSchema = new Schema(
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
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    purchasedCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    purchasedUnits: [
      {
        type: Schema.Types.ObjectId,
        ref: "Unit",
      },
    ],
    purchasedLanguages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Level",
      },
    ],
    exams: [
      {
        subjectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
        },
        mark: {
          type: Number,
          min: 0,
          max: 100,
        },
        numberOfQuestions: {
          type: Number,
          required: true,
        },
        units: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Unit",
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Password encryption
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

// Student Model
const student: Model<IStudent> = mongoose.model<IStudent>(
  "Student",
  studentSchema
);

// Student Indexes
studentSchema.index({ createdAt: -1 });

// validation Create
const validateCreateStudent = (obj: IStudent): joi.ValidationResult => {
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
  });

  return schema.validate(obj);
};

// validation Login
const validateLoginStudent = (obj: IStudent): joi.ValidationResult => {
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

// validation Update By admin & superAdmin
const validateUpdateStudentByAdmins = (obj: IStudent): joi.ValidationResult => {
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
  });

  return schema.validate(obj);
};

// validation Update
const validateUpdateStudent = (obj: IStudent): joi.ValidationResult => {
  const schema = joi.object({
    userName: joi.string().trim().max(100).required().messages({
      "string.empty": "الاسم الكامل مطلوب",
      "string.max": "الاسم الكامل يجب ألا يتجاوز 100 حرف",
      "any.required": "الاسم الكامل مطلوب",
    }),
  });

  return schema.validate(obj);
};

// validation Update Profile Photo
const validateUpdateProfilePhotoStudent = (
  obj: IStudent
): joi.ValidationResult => {
  const schema = joi.object({
    profilePhoto: joi.string().required().uri().messages({
      "string.uri": "رابط الصورة غير صالح",
    }),
  });

  return schema.validate(obj);
};

// validation Update Password
const validateUpdatePasswordStudent = (obj: IStudent): joi.ValidationResult => {
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
  student,
  validateCreateStudent,
  validateUpdatePasswordStudent,
  validateUpdateProfilePhotoStudent,
  validateUpdateStudent,
  validateUpdateStudentByAdmins,
  validateLoginStudent,
};
