import {
  createNewUser,
  findUserByPhone,
  findUserByUserId,
  loginUser,
} from "../../../controllers/users/user";

import express from "express";
import { setUserFcmToken } from "../../../controllers/users/setUserFcmToken";

const router = express.Router();

router.get("/phone", findUserByPhone);
router.get("/userId", findUserByUserId);

router.put("/fcm", setUserFcmToken);

router.post("/login", loginUser);
router.post("", createNewUser);

export default router;
