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
exports.getMyPetList = void 0;
const http_status_codes_1 = require("http-status-codes");
const PetModel_1 = __importDefault(require("../../models/PetModel"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const Utils_1 = require("../../utils/Utils");
exports.getMyPetList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: "로그인 인증이 제대로 이루어지고 있지 않습니다.",
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
                message: "로그인 인증이 제대로 이루어지고 있지 않습니다.",
            });
        }
        const petlist = yield PetModel_1.default.find({
            userIdentifier: user._id,
        });
        return res.json({
            ok: true,
            petlist,
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
