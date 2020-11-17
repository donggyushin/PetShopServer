import createOrUpdateNotification from "../../../controllers/notifications/createOrUpdateNotification";
import express from "express";
import findNotificationByPetIdAndNotificationName from "../../../controllers/notifications/findNotificationByPetIdAndNotificationName";
import { getNotificationList } from "../../../controllers/notifications/getNotificationList";

const router = express.Router();

router.get("/list/:petId", getNotificationList);
router.get(
  "/:petId/:notificationName",
  findNotificationByPetIdAndNotificationName
);

router.post("/createOrUpdate", createOrUpdateNotification);

export default router;
