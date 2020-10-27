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
exports.findUserByPhone = exports.findUserByUserId = exports.createNewUser = exports.loginUser = void 0;
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
        if (users[0].userId === userId && users[0].password === password) {
            return res.json({
                ok: true,
                token: "token",
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
    const { userId, password, nickname, phoneNumber } = req.body;
    if (!userId || !password || !nickname || !phoneNumber) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: "아이디, 비밀번호, 닉네임, 핸드폰번호를 모두 입력해주세요",
        });
    }
    if (!Util.shared.checkTextValidation(Regex.shared.userIdRegex, userId)) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: "유저 아이디가 적절하지 못한 포맷입니다",
        });
    }
    if (!Util.shared.checkTextValidation(Regex.shared.passwordRegex, password)) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: "비밀번호가 적절하지 못한 포맷입니다",
        });
    }
    if (!Util.shared.checkTextValidation(Regex.shared.nicknameRegex, nickname)) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: "닉네임이 적절하지 못한 포맷입니다",
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
            message: "서버 내부 에러가 발생하였습니다. ",
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
