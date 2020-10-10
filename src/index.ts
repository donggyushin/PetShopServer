import "./mongoose";

import dotenv from "dotenv";
import environment from "./env";
import express from "express";
dotenv.config();

const app = express();
let PORT = process.env.DEV_PORT;

switch (environment) {
  case "production ":
    PORT = process.env.PRODUCTION_PORT;
    break;
  case "test":
    PORT = process.env.TEST_PORT;
    break;
}

app.listen(PORT, () =>
  console.log(
    `⚡️ [PetShopServer]: Server is running at http://localhost:${PORT}`
  )
);
