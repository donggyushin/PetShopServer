"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verification_1 = __importDefault(require("./verification/verification"));
const ApiV1Router = express_1.default.Router();
ApiV1Router.use("/verification", verification_1.default);
exports.default = ApiV1Router;
