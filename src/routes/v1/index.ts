import dailyInfo from "./dailyInfo/dailyInfo";
import express from "express";
import notification from "./notification/notification";
import pet from "./pet/pet";
import user from "./user/user";
import verification from "./verification/verification";
const ApiV1Router = express.Router();

ApiV1Router.use("/verification", verification);
ApiV1Router.use("/user", user);
ApiV1Router.use("/pet", pet);
ApiV1Router.use("/notification", notification);
ApiV1Router.use("/dailyInfo", dailyInfo);

export default ApiV1Router;
