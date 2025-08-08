import mongoose, { Schema, Model } from "mongoose";
import joi from "joi";
import { IClass } from "./dtos";
import bcrypt from "bcrypt";
// Class Schema
const ClassSchema: Schema<IClass> = new Schema(
  {
    className: {
      type: String,
      required: [true, "اسم الصف مطلوب"],
      trim: true,
      minLength: [2, "يجب ان يكون اسم الصف على الاقل حرفان"],
      maxLength: [100, "الاسم الصف يجب ألا يتجاوز 100 حرف"],
    },
  },
  {
    timestamps: true,
  }
);

// Class Model
const Class: Model<IClass> = mongoose.model<IClass>("Class", ClassSchema);

// validation Schemas
const validateClassCreate = (obj: any): joi.ValidationResult => {
  const schema = joi.object({
    className: joi.string().trim().min(2).max(100).required().messages({
      "string.empty": "الاسم الصف مطلوب",
      "string.max": "الاسم الصف يجب ألا يتجاوز 100 حرف",
      "any.required": "الاسم الصف مطلوب",
    }),
  });

  return schema.validate(obj);
};

const validateClassUpdate = (obj: any): joi.ValidationResult => {
  const schema = joi.object({
    className: joi.string().trim().min(2).max(100).messages({
      "string.empty": "الاسم الصف مطلوب",
      "string.max": "الاسم الصف يجب ألا يتجاوز 100 حرف",
    }),
  });

  return schema.validate(obj);
};

export { Class, validateClassCreate, validateClassUpdate };
