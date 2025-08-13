import mongoose, { Schema, Model } from "mongoose";
import joi, { ObjectSchema } from "joi";
import { IUnit } from "./dtos";

// Unit Schema
const UnitSchema: Schema<IUnit> = new Schema(
  {
    unitName: {
      type: String,
      required: [true, "اسم الوحدة مطلوبة"],
      trim: true,
      minLength: [2, "يجب ان تكون الوحدة على الاقل حرفان"],
      maxLength: [100, "الوحدة يجب ألا تتجاوز 100 حرف"],
    },
    available: {
      type: Boolean,
      default: false,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: [true, "المادة مطلوب"],
    },
  },
  {
    timestamps: true,
  }
);

// Unit Model
const Unit: Model<IUnit> = mongoose.model<IUnit>("Unit", UnitSchema);

// validation Schemas
const validateUnitCreate = (obj: any): joi.ValidationResult => {
  const schema: ObjectSchema = joi.object({
    unitName: joi.string().trim().min(2).max(100).required().messages({
      "string.empty": "اسم الوحدة مطلوبة",
      "string.max": "الوحدة يجب ألا تتجاوز 100 حرف",
      "any.required": "الوحدة مطلوبة",
    }),
    available: joi.boolean(),
    subject: joi.string().required().messages({
      "string.empty": "المادة مطلوب",
      "any.required": "المادة مطلوب",
    }),
  });

  return schema.validate(obj);
};

const validateUnitUpdate = (obj: any): joi.ValidationResult => {
  const schema: ObjectSchema = joi.object({
    unitName: joi.string().trim().min(2).max(100),
    available: joi.boolean(),
    subject: joi.string(),
  });

  return schema.validate(obj);
};

export { Unit, validateUnitCreate, validateUnitUpdate };
