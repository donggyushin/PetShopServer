import {
  createNewUser,
  findUserByPhone,
  findUserByUserId,
} from "../../../controllers/users/user";

import express from "express";

const router = express.Router();

router.get("/phone", findUserByPhone);
router.get("/userId", findUserByUserId);

router.post("", createNewUser);

export default router;
