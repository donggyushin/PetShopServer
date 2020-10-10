import dotenv from "dotenv";
import environment from "./env";
import mongoose from "mongoose";

dotenv.config();

let DB_HOST = process.env.DEV_DB || "";

switch (environment) {
  case "production ":
    DB_HOST = process.env.PRODUCTION_DB || "";
    break;
  case "test":
    DB_HOST = process.env.TEST_DB || "";
    break;
}

mongoose.connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "🆘 connection error: "));
db.once("open", () => console.log(`✅ DB connection success with ${DB_HOST}`));
