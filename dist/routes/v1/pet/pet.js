"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PetList_1 = require("../../../controllers/pets/PetList");
const pet_1 = require("../../../controllers/pets/pet");
const PostPet_1 = require("../../../controllers/pets/PostPet");
const router = express_1.default.Router();
router.post("", PostPet_1.postNewPet);
router.get("/mypets", PetList_1.getMyPetList);
router.get("/list", pet_1.getPetList);
exports.default = router;
