import createOrUpdateNotification from "../../../controllers/notifications/createOrUpdateNotification";
import express from "express";
import { getNotificationList } from "../../../controllers/notifications/getNotificationList";

const router = express.Router();

router.get("/list/:petId", getNotificationList);

router.post("/createOrUpdate", createOrUpdateNotification);

export default router;
