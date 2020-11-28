import * as admin from "firebase-admin";

import { INotification } from "../models/NotificationModel";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const serviceAccount = require("../../keys/petmily-dab67-firebase-adminsdk-rorl7-151d8b8daf.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

dotenv.config();

export const checkTextValidation = (regex: RegExp, text: string) => {
  return regex.test(text);
};

export type JwtType = {
  id: string;
};

export const encodeJwt = (text: string): string => {
  const key = process.env.JSON_WEB_TOKEN_KEY || "";
  const keyType: JwtType = {
    id: text,
  };
  const token = jwt.sign(keyType, key);
  return token;
};

export const decodeToken = (token: string): string => {
  const key = process.env.JSON_WEB_TOKEN_KEY || "";
  const decodedToken = jwt.verify(token, key) as JwtType;
  return decodedToken.id;
};

export const sendPushNotification = (
  message: string,
  token: string,
  data: { [key: string]: string } | undefined,
  title?: string
) => {
  const notification = {
    data,
    token,
    notification: {
      title: title || "",
      body: message,
    },
  };
  admin
    .messaging()
    .send(notification)
    .then((response) => {
      console.log("Successfully sent message", response);
    })
    .catch((err) => {
      console.log("Error sending message: ", err);
    });
};

export const sendPushNotificationWithMessage = (
  notification: INotification,
  day7Message: string,
  day1Message: string,
  todayMessage: string
) => {
  const today = new Date();
  const firstNotified = notification.firstNotified;
  const dayPeried = notification.dayPeriod;

  const greaterDay = today > firstNotified ? today : firstNotified;
  const smallerDay = today > firstNotified ? firstNotified : today;

  const diff = greaterDay.getTime() - smallerDay.getTime();
  const dayDiff = diff / (1000 * 60 * 60 * 24);

  const leftDayUntilNotification = dayDiff / dayPeried;

  if (leftDayUntilNotification < 1) {
    const leftDayUntilNotification = dayDiff % dayPeried;
    if (leftDayUntilNotification === 7) {
      sendPushNotification(day7Message, notification.userFcmToken!, {});
    } else if (leftDayUntilNotification === 1) {
      sendPushNotification(day1Message, notification.userFcmToken!, {});
    } else if (leftDayUntilNotification === 0) {
      sendPushNotification(todayMessage, notification.userFcmToken!, {});
    }
  }
};
