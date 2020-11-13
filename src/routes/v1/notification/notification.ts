import express from "express";
import { getNotificationList } from "../../../controllers/notifications/getNotificationList";

const router = express.Router();

router.get("/list", getNotificationList);

export default router;
