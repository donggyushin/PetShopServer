import express from "express";
import { findUserByPhone } from "../../../controllers/users/user";

const router = express.Router();

router.get("/phone", findUserByPhone);

export default router;
