"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./mongoose");
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const env_1 = __importDefault(require("./env"));
dotenv_1.default.config();
let PORT = process.env.DEV_PORT;
switch (env_1.default) {
    case "production ":
        PORT = process.env.PRODUCTION_PORT;
        break;
    case "test":
        PORT = process.env.TEST_PORT;
        break;
}
app_1.default.listen(PORT, () => console.log(`⚡️ [PetShopServer]: Server is running at http://localhost:${PORT}`));
