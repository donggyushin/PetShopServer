"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v1_1 = __importDefault(require("./v1"));
const express_1 = __importDefault(require("express"));
const ApiIndexRouter = express_1.default.Router();
ApiIndexRouter.use("/v1", v1_1.default);
exports.default = ApiIndexRouter;