import express from "express";
import { postVerification } from "../../../controllers/verifications/verification";

const router = express.Router();

router.post("", postVerification);

export default router;
