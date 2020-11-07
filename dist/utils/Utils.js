"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.encodeJwt = exports.checkTextValidation = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
exports.checkTextValidation = (regex, text) => {
    return regex.test(text);
};
exports.encodeJwt = (text) => {
    const key = process.env.JSON_WEB_TOKEN_KEY || "";
    const keyType = {
        id: text,
    };
    const token = jsonwebtoken_1.default.sign(keyType, key);
    return token;
};
exports.decodeToken = (token) => {
    const key = process.env.JSON_WEB_TOKEN_KEY || "";
    const decodedToken = jsonwebtoken_1.default.verify(token, key);
    return decodedToken.id;
};
