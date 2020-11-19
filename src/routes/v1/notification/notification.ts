import createOrUpdateNotification from "../../../controllers/notifications/createOrUpdateNotification";
import express from "express";
import findNotificationByPetIdAndNotificationName from "../../../controllers/notifications/findNotificationByPetIdAndNotificationName";
import { getNotificationList } from "../../../controllers/notifications/getNotificationList";
import turnOffNotification from "../../../controllers/notifications/turnOffNotification";

const router = express.Router();

router.get("/list/:petId", getNotificationList);
router.get(
  "/:petId/:notificationName",
  findNotificationByPetIdAndNotificationName
);

router.put("/turnOff", turnOffNotification);

router.post("/createOrUpdate", createOrUpdateNotification);

export default router;
