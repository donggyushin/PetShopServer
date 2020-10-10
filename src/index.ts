import "./mongoose";

import app from "./app";
import dotenv from "dotenv";
import environment from "./env";

dotenv.config();

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
