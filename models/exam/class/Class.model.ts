import mongoose, { Schema, Model } from "mongoose";
import joi from "joi";
import { IClass } from "./dtos";
import bcrypt from "bcrypt";
import { Subject } from "../subject/Subject.model";
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
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.id;
        return ret;
      },
    },
  }
);

// Subjects
ClassSchema.virtual("subjects", {
  ref: "Subject",
  foreignField: "class",
  localField: "_id",
});

// delete subject that connect with class
ClassSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Subject.deleteMany({ class: doc._id });
  }
});

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
