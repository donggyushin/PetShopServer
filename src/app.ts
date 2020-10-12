import ApiIndexRouter from "./routes";
import cors from 'cors'
import express from "express";

const app = express();

app.use(express.json())
app.use(cors())
app.use("/api", ApiIndexRouter);

export default app;
