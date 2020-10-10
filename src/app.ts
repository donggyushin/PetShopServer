import ApiIndexRouter from "./routes";
import express from "express";

const app = express();

app.use(express.json())
app.use("/api", ApiIndexRouter);

export default app;
