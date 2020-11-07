import mongoose, { Document, Schema } from "mongoose";

export type Gender = "male" | "female";

interface IUser extends Document, UserType {}

export interface UserType {
  userId: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  profileImage?: string;
  phoneNumber: string;
  nickname: string;
  birth?: string;
  gender?: Gender;
  fcmToken?: string;
}

const UserSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  nickname: {
    type: String,
    required: true,
  },
  birth: {
    type: String,
  },
  gender: {
    type: String,
  },
  fcmToken: {
    type: String,
  },
});

export default mongoose.model<IUser>("User", UserSchema);
