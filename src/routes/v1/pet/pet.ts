import UpdatePetProfile from "../../../controllers/pets/UpdatePetProfile";
import { deletePetPhoto } from "../../../controllers/pets/DeletePetPhoto";
import express from "express";
import { getMyPetList } from "../../../controllers/pets/PetList";
import { getPetList } from "../../../controllers/pets/pet";
import { postNewPet } from "../../../controllers/pets/PostPet";
import { postPetPhotos } from "../../../controllers/pets/PostPetPhotos";

const router = express.Router();

router.delete("/photo", deletePetPhoto);

router.post("/photos", postPetPhotos);
router.post("", postNewPet);

router.get("/mypets", getMyPetList);
router.get("/list", getPetList);

router.put("", UpdatePetProfile);

export default router;
