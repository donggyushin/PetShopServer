"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNewPet = void 0;
const NotificationModel_1 = __importDefault(require("../../models/NotificationModel"));
const PetModel_1 = __importDefault(require("../../models/PetModel"));
const http_status_codes_1 = require("http-status-codes");
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const Utils_1 = require("../../utils/Utils");
exports.postNewPet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    const { personality, petSort, name, kind, photourl, gender, birth, } = req.body;
    if (!authorization) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: "로그인 인증이 제대로 이루어지고 있지 않습니다.",
        });
    }
    if (!name || !kind || !photourl || !gender || !birth) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: "반려동물의 이름, 품종, 사진, 성별, 생년월일은 필수 입력조건입니다",
        });
    }
    const validToken = authorization.split(" ")[1];
    const userId = Utils_1.decodeToken(validToken);
    try {
        const user = yield UserModel_1.default.findById(userId);
        if (user == null) {
            return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
                ok: false,
                error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
                message: "유효하지 않은 유저입니다",
            });
        }
        const convertedBirth = birth
            .replace("년", "-")
            .replace("월", "-")
            .replace("일", "")
            .replace(/ /g, "");
        console.log(convertedBirth);
        const birthDate = new Date(convertedBirth);
        const petProperties = {
            userIdentifier: user._id,
            petSort,
            name,
            kind,
            personality,
            photourl,
            gender,
            birth,
            birthDate,
        };
        const newPet = yield new PetModel_1.default(petProperties);
        yield newPet.save();
        const notificationIngredient = {
            petIdentifier: newPet._id,
            userFcmToken: user.fcmToken,
            name: "birth",
            isOn: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            firstNotified: birthDate,
            dayPeriod: 365,
        };
        const petBirthNotification = yield new NotificationModel_1.default(notificationIngredient);
        yield petBirthNotification.save();
        return res.json({
            ok: true,
        });
    }
    catch (err) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR),
            message: err.message,
        });
    }
});
