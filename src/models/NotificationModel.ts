import mongoose, { Document, Schema } from "mongoose";

export interface INotification extends Document, NotificationType {}

export type MiteNotificationKindType = "eat" | "cover";

export type NotificationName =
  | "birth"
  | "mite-eating"
  | "mite-cover"
  | "helminthic"
  | "Dirofilaria-immitis";

// 생일
// 먹는 진드기약
// 바르는 진드기약
// 기생충약
// 심장사상충 약

export type NotificationType = {
  petIdentifier: string;
  userFcmToken?: string;
  name: NotificationName;
  dayPeriod: number;
  isOn: boolean;
  createdAt: Date;
  updatedAt: Date;
  firstNotified: Date;
  type?: MiteNotificationKindType;
  petName: string;
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
  type: {
    type: String,
  },
  petName: {
    type: String,
  },
});

export default mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);
