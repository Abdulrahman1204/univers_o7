import mongoose, { Schema, Model } from "mongoose";
import joi, { ObjectSchema } from "joi";
import { ISubject } from "./dtos";

// Subject Schema
const SubjectSchema: Schema<ISubject> = new Schema(
  {
    subjectName: {
      type: String,
      required: [true, "اسم المادة مطلوبة"],
      trim: true,
      minLength: [2, "يجب ان تكون اسم المادة على الاقل حرفان"],
      maxLength: [100, "الاسم المادة يجب ألا تتجاوز 100 حرف"],
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: [true, "الصف مطلوب"],
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

// Units
SubjectSchema.virtual("units", {
  ref: "Unit",
  foreignField: "subject",
  localField: "_id",
});

// Subject Model
const Subject: Model<ISubject> = mongoose.model<ISubject>(
  "Subject",
  SubjectSchema
);

// validation Schemas
const validateSubjectCreate = (obj: any): joi.ValidationResult => {
  const schema: ObjectSchema = joi.object({
    subjectName: joi.string().trim().min(2).max(100).required().messages({
      "string.empty": "الاسم المادة مطلوبة",
      "string.max": "الاسم المادة يجب ألا تتجاوز 100 حرف",
      "any.required": "الاسم المادة مطلوبة",
    }),
    class: joi.string().required().messages({
      "string.empty": "الصف مطلوب",
      "any.required": "الصف مطلوب",
    }),
  });

  return schema.validate(obj);
};

const validateSubjectUpdate = (obj: any): joi.ValidationResult => {
  const schema: ObjectSchema = joi.object({
    subjectName: joi.string().trim().min(2).max(100),
    class: joi.string(),
  });

  return schema.validate(obj);
};

export { Subject, validateSubjectCreate, validateSubjectUpdate };
