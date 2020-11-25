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
exports.findUserByPhone = exports.findUserByUserId = exports.createNewUser = exports.loginUser = void 0;
const Regex = __importStar(require("../../constants/Constants"));
const Util = __importStar(require("../../utils/Utils"));
const http_status_codes_1 = require("http-status-codes");
const UserModel_1 = __importDefault(require("../../models/UserModel"));
exports.loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, password } = req.body;
    if (!userId || !password) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: "아이디와 패스워드를 입력해주세요",
        });
    }
    try {
        const users = yield UserModel_1.default.find({
            userId,
        });
        if (users.length == 0) {
            return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
                ok: false,
                error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
                message: "해당 아이디로 존재하는 유저가 없습니다. 아이디를 다시 확인해봐주세요.",
            });
        }
        // TODO : token을 생성해준다
        if (users[0].userId === userId && users[0].password === password) {
            return res.json({
                ok: true,
                token: Util.encodeJwt(users[0]._id),
            });
        }
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: "비밀번호가 일치하지 않습니다",
        });
    }
    catch (err) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR),
            message: "서버 내부에서 에러가 발생하였습니다.",
        });
    }
});
exports.createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, password, nickname, phoneNumber, birth, gender, profileImage, } = req.body;
    if (!userId || !password || !nickname || !phoneNumber) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: "아이디, 비밀번호, 닉네임, 핸드폰번호를 모두 입력해주세요",
        });
    }
    if (!Util.checkTextValidation(Regex.userIdRegex, userId)) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: "유저 아이디가 적절하지 못한 포맷입니다",
        });
    }
    if (!Util.checkTextValidation(Regex.nicknameRegex, nickname)) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: "닉네임이 적절하지 못한 포맷입니다",
        });
    }
    if (!Util.checkTextValidation(Regex.passwordRegex, password)) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: "비밀번호가 적절하지 못한 포맷입니다",
        });
    }
    const existingUSers = yield UserModel_1.default.find({
        userId,
    });
    if (existingUSers.length !== 0) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: "이미 존재하는 회원입니다. 다른 아이디를 입력해주세요.",
        });
    }
    const userProperty = {
        userId,
        password,
        nickname,
        phoneNumber,
        createdAt: new Date(),
        updatedAt: new Date(),
        birth,
        gender,
        profileImage,
    };
    const newUser = new UserModel_1.default(userProperty);
    try {
        yield newUser.save();
        return res.json({
            ok: true,
        });
    }
    catch (err) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR),
            message: "같은 핸드폰 번호로는 회원가입 할 수 없습니다",
        });
    }
});
exports.findUserByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    if (!userId) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: "유저 아이디를 입력하세요",
        });
    }
    try {
        const user = yield UserModel_1.default.findOne({
            userId,
        });
        return res.json({
            ok: true,
            user,
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
exports.findUserByPhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber } = req.query;
    if (!phoneNumber) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: "핸드폰 번호를 입력해주세요",
        });
    }
    const phoneRegExp = /^\d{3}\d{3,4}\d{4}$/;
    if (!phoneRegExp.test(phoneNumber)) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: "잘못된 핸드폰 번호 형식입니다",
        });
    }
    try {
        const users = yield UserModel_1.default.find({
            phoneNumber,
        }).sort({ createdAt: -1 });
        if (users.length === 0) {
            return res.json({
                ok: true,
                user: null,
            });
        }
        const user = users[0];
        return res.json({
            ok: true,
            user,
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
