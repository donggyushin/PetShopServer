import express from "express";
import { getMyPetList } from "../../../controllers/pets/PetList";
import { getPetList } from "../../../controllers/pets/pet";
import { postNewPet } from "../../../controllers/pets/PostPet";

const router = express.Router();

router.post("", postNewPet);

router.get("/mypets", getMyPetList);
router.get("/list", getPetList);

export default router;
