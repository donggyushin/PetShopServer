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
exports.postVerification = exports.verifyVerification = void 0;
const http_status_codes_1 = require("http-status-codes");
const VerificationModel_1 = __importDefault(require("../../models/VerificationModel"));
const random_1 = __importDefault(require("random"));
const twilio_1 = require("../../utils/twilio/twilio");
exports.verifyVerification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, verificationCode } = req.query;
    if (!phoneNumber) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: '핸드폰 번호를 입력해주세요'
        });
    }
    const phoneRegExp = /^\d{3}\d{3,4}\d{4}$/;
    if (!phoneRegExp.test(phoneNumber)) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: '잘못된 핸드폰 번호 형식입니다'
        });
    }
    try {
        const verifications = yield VerificationModel_1.default.find({
            phoneNumber
        }).sort({ createdAt: -1 });
        const verification = verifications[0];
        const now = new Date();
        const expireDate = verification.createdAt;
        expireDate.setSeconds(expireDate.getSeconds() + 180);
        if (expireDate < now) {
            return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
                ok: false,
                error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
                message: '인증코드의 유효기간이 만료되었습니다. 인증코드를 다시 발급받아주세요'
            });
        }
        if (verification.verificationCode !== verificationCode) {
            return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
                ok: false,
                error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
                message: '인증 코드의 값이 다릅니다.'
            });
        }
        yield VerificationModel_1.default.deleteMany({
            phoneNumber
        });
        return res.json({
            ok: true
        });
    }
    catch (err) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            ok: false,
            error: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            message: '서버 내부 에러가 발생하였습니다.'
        });
    }
});
exports.postVerification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber } = req.body;
    if (phoneNumber === undefined) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: '핸드폰 번호를 입력해주세요'
        });
    }
    const phoneRegExp = /^\d{3}\d{3,4}\d{4}$/;
    if (!phoneRegExp.test(phoneNumber)) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY),
            message: '잘못된 핸드폰 번호 형식입니다'
        });
    }
    const verificationCode = random_1.default.int(100000, 999999);
    const verification = new VerificationModel_1.default({
        phoneNumber: phoneNumber,
        verificationCode: verificationCode.toString(),
        createdAt: new Date(),
        updatedAt: new Date()
    });
    try {
        yield verification.save();
        // TODO: 전달받은 핸드폰 번호로 문자메시지 보내기
        yield twilio_1.sendSMS(`보안코드는 ${verificationCode} 입니다. \n-멍샵`, `+82${phoneNumber.substring(1)}`);
        return res.json({
            ok: true,
            verification
        });
    }
    catch (err) {
        console.error(err.message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            ok: false,
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR),
            message: '서버 내부 에러가 발생하였습니다.'
        });
    }
});
