import express from "express";
import pet from "./pet/pet";
import user from "./user/user";
import verification from "./verification/verification";
const ApiV1Router = express.Router();

ApiV1Router.use("/verification", verification);
ApiV1Router.use("/user", user);
ApiV1Router.use("/pet", pet);

export default ApiV1Router;
