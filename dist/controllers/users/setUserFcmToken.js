"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.setUserFcmToken = void 0;
const Utils = __importStar(require("../../utils/Utils"));
const http_status_codes_1 = require("http-status-codes");
const UserModel_1 = __importDefault(require("../../models/UserModel"));
exports.setUserFcmToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fcmToken } = req.body;
    const { authorization } = req.headers;
    if (!fcmToken || !authorization) {
        res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: "hearder 혹은 token이 없습니다.",
        });
    }
    const validToken = authorization.split(" ")[1];
    const userId = Utils.decodeToken(validToken);
    try {
        const user = yield UserModel_1.default.findById(userId);
        if (user === null) {
            return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
                ok: false,
                error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
                message: "해당 token을 사용하는 유저가 존재하지 않습니다.",
            });
        }
        yield UserModel_1.default.updateOne({
            _id: user._id,
        }, {
            fcmToken,
        });
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
