"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../../controllers/users/user");
const express_1 = __importDefault(require("express"));
const setUserFcmToken_1 = require("../../../controllers/users/setUserFcmToken");
const router = express_1.default.Router();
router.get("/phone", user_1.findUserByPhone);
router.get("/userId", user_1.findUserByUserId);
router.put("/fcm", setUserFcmToken_1.setUserFcmToken);
router.post("/login", user_1.loginUser);
router.post("", user_1.createNewUser);
exports.default = router;
