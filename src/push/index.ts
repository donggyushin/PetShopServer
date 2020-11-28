import * as Utils from "../utils/Utils";
import * as admin from "firebase-admin";

import NotificationModel from "../models/NotificationModel";

const serviceAccount = require("../../keys/petmily-dab67-firebase-adminsdk-rorl7-151d8b8daf.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const myPhoneFcmToken =
  "cniM_irIFUqGo_i1nB3ksa:APA91bEyjo0zSVIkDOFmPMXvHNGuI2nEnZRS4ukR0ldnoUANN2vD3jJvNOFQvRG_TCBp2yKV3QnppmO6YzAcxDrMWZPaKpxey7QipDMSKlOxXcx-flnuBpTj1iAw8ieBjivLspZtJcRO";

// ㅎㅏ루에 한번씩 동작하는 함수
export const dailyPushNotification = async () => {
  // Do something....
  try {
    const notifications = await NotificationModel.find();
    notifications.map((notification) => {
      if (notification.userFcmToken) {
        switch (notification.name) {
          case "Dirofilaria-immitis":
            Utils.sendPushNotificationWithMessage(
              notification,
              `일주일 후면 ${notification.petName} 심장사상충 약 먹는 날이에요!`,
              `내일이면 ${notification.petName} 심장사상충 약 먹는 날이에요!`,
              `오늘은 ${notification.petName} 심장사상충 약 먹는 날이에요!`
            );

            break;
          case "birth":
            Utils.sendPushNotificationWithMessage(
              notification,
              `일주일 후면 ${notification.petName} 생일이에요🎉`,
              `내일이면 ${notification.petName} 생일이에요🎉`,
              `오늘은 ${notification.petName} 생일이에요🎉`
            );
            break;
          case "helminthic":
            Utils.sendPushNotificationWithMessage(
              notification,
              `일주일 후면 ${notification.petName} 기생충약 먹는 날이에요!`,
              `내일이면 ${notification.petName} 기생충약 먹는 날이에요!`,
              `오늘은 ${notification.petName} 기생충약 먹는 날이에요!`
            );
            break;
          case "mite-eating":
            if (notification.type === "cover") {
              Utils.sendPushNotificationWithMessage(
                notification,
                `일주일 후면 ${notification.petName} 진드기약 바르는 날이에요!`,
                `내일이면 ${notification.petName} 진드기약 바르는 날이에요!`,
                `오늘은 ${notification.petName} 진드기약 바르는 날이에요!`
              );
            } else {
              Utils.sendPushNotificationWithMessage(
                notification,
                `일주일 후면 ${notification.petName} 진드기약 먹는 날이에요!`,
                `내일이면 ${notification.petName} 진드기약 먹는 날이에요!`,
                `오늘은 ${notification.petName} 진드기약 먹는 날이에요!`
              );
            }

            break;
          default:
            break;
        }
      }
    });
  } catch (err) {
    console.log(err.message);
  }

  setTimeout(() => {
    dailyPushNotification();
  }, 1000 * 60 * 60 * 24);
};

export default admin;
