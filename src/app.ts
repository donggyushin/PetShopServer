import ApiIndexRouter from "./routes";
import express from "express";

const app = express();

app.use("/api", ApiIndexRouter);

export default app;
