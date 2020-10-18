import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  userId: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  profileImage: string;
}

export interface UserType {
  userId: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  profileImage: string;
}

const UserSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: {
    type: String,
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
});

export default mongoose.model<IUser>("User", UserSchema);
