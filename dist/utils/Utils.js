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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPushNotification = exports.decodeToken = exports.encodeJwt = exports.checkTextValidation = void 0;
const admin = __importStar(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const serviceAccount = require("../../keys/petmily-dab67-firebase-adminsdk-rorl7-151d8b8daf.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
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
exports.sendPushNotification = (message, token, data, title) => {
    const notification = {
        data,
        token,
        notification: {
            title: title || "",
            body: message,
        },
    };
    admin
        .messaging()
        .send(notification)
        .then((response) => {
        console.log("Successfully sent message", response);
    })
        .catch((err) => {
        console.log("Error sending message: ", err);
    });
};
