import express from "express";
import { getPetList } from "../../../controllers/pets/pet";

const router = express.Router();

router.get("/list", getPetList);

export default router;
