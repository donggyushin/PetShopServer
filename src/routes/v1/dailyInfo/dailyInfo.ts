import express from "express";
import { getDailyInfos } from "../../../controllers/dailyInfos/getDailyInfo";

const router = express.Router();

router.get("/random", getDailyInfos);

export default router;
