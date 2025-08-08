import { Document, Types } from "mongoose";

// Student Interface
export interface IStudent extends Document {
  profilePhoto: string;
  userName: string;
  age: number;
  phoneNumber: string;
  password: string;
  gender: "male" | "female";
  questions: Types.ObjectId[];
  exams: Types.ObjectId[];
  purchasedUnits: Types.ObjectId[];
  purchasedCourses: Types.ObjectId[];
  purchasedLanguages: Types.ObjectId[];
}
