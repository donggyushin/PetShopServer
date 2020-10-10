import ApiV1Router from "./v1";
import express from "express";

const ApiIndexRouter = express.Router();

ApiIndexRouter.use("/v1", ApiV1Router);

export default ApiIndexRouter;
