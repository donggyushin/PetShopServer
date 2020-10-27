import {
  createNewUser,
  findUserByPhone,
  findUserByUserId,
  loginUser,
} from "../../../controllers/users/user";

import express from "express";

const router = express.Router();

router.get("/phone", findUserByPhone);
router.get("/userId", findUserByUserId);

router.post("/login", loginUser);
router.post("", createNewUser);

export default router;
