import mongoose, { Document, Schema } from "mongoose";

interface IVerification extends Document {
  phoneNumber: String;
  verificationCode: String;
  createdAt: Date;
  updatedAt: Date;
}

const VerificationSchema: Schema = new Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  verificationCode: {
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

export default mongoose.model<IVerification>(
  "Verification",
  VerificationSchema
);
