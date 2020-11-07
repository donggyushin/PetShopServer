"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const env_1 = __importDefault(require("./env"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
let DB_HOST = process.env.DEV_DB_CLOUD_MONGO_DB || "";
switch (env_1.default) {
    case "production ":
        DB_HOST = process.env.PRODUCTION_DB_CLOUD_MONGO_DB || "";
        break;
    case "test":
        DB_HOST = process.env.TEST_DB_CLOUD_MONGO_DB || "";
        break;
}
mongoose_1.default.connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "🆘 connection error: "));
db.once("open", () => console.log(`✅ DB connection success with ${DB_HOST}`));
