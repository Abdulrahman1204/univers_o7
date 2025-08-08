import {Document} from 'mongoose'

// Admin Interface
export interface IAdmin extends Document {
    profilePhoto: string,
    userName: string;
    age: number;
    phoneNumber: string;
    password: string;
    gender: "male" | "female";
    role: "admin" | "superAdmin" | "sales";
}