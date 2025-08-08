import { Document, Types } from "mongoose";

// Teacher Interface
export interface ITeacher extends Document {
  profilePhoto: string;
  userName: string;
  age: number;
  phoneNumber: string;
  password: string;
  gender: "male" | "female";
  questions: Types.ObjectId[];
  subject: Types.ObjectId;
}
