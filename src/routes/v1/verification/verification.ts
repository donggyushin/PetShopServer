import { postVerification, verifyVerification } from "../../../controllers/verifications/verification";

import express from "express";

const router = express.Router();

router.post("", postVerification);
router.delete("", verifyVerification)

export default router;
