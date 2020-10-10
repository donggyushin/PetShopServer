import express from "express";
import verification from "./verification/verification";
const ApiV1Router = express.Router();

ApiV1Router.use("/verification", verification);

export default ApiV1Router;
