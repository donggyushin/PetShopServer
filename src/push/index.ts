import * as admin from "firebase-admin";

const serviceAccount = require("../../keys/petmily-dab67-firebase-adminsdk-rorl7-151d8b8daf.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const myPhoneFcmToken =
  "cniM_irIFUqGo_i1nB3ksa:APA91bEyjo0zSVIkDOFmPMXvHNGuI2nEnZRS4ukR0ldnoUANN2vD3jJvNOFQvRG_TCBp2yKV3QnppmO6YzAcxDrMWZPaKpxey7QipDMSKlOxXcx-flnuBpTj1iAw8ieBjivLspZtJcRO";

const sendPushNotification = (
  message: string,
  token: string,
  data: { [key: string]: string } | undefined,
  title?: string
) => {
  const notification = {
    data,
    token,
    notification: {
      title: "test",
      body: "asd",
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

// ㅎㅏ루에 한번씩 동작하는 함수
const testFunction = () => {
  setTimeout(() => {
    console.log("test");
    testFunction();
  }, 1000 * 60 * 60 * 24);
};

sendPushNotification("test", myPhoneFcmToken, { test: "test" });

export default admin;
