import mongoose, { Document, Schema } from "mongoose";

export interface INotification extends Document, NotificationType {}

export type NotificationName =
  | "birth"
  | "mite-eating"
  | "mite-cover"
  | "helminthic"
  | "Dirofilaria-immitis";

export type NotificationType = {
  petIdentifier: string;
  userFcmToken?: string;
  name: NotificationName;
  dayPeriod: number;
  isOn: boolean;
  createdAt: Date;
  updatedAt: Date;
  firstNotified: Date;
};

const NotificationSchema: Schema = new Schema({
  petIdentifier: {
    type: String,
    required: true,
  },
  userFcmToken: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  dayPeriod: {
    type: Number,
  },
  isOn: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  firstNotified: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);
