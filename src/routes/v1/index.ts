import express from "express";
import user from "./user/user";
import verification from "./verification/verification";
const ApiV1Router = express.Router();

ApiV1Router.use("/verification", verification);
ApiV1Router.use("/user", user);

export default ApiV1Router;
