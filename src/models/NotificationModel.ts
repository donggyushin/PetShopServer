import mongoose, { Document, Schema } from "mongoose";

interface INotification extends Document, NotificationType {}

export type NotificationType = {
  petIdentifier: string;
  userFcmToken?: string;
  name: string;
  dayPeriod?: number;
  isOn: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastNotified: Date;
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
  lastNotified: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);
