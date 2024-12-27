import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";

configDotenv();
const app = express();

app.use(
  cors()
);
app.use(express.urlencoded({ extended: true, limit: "500mb" }));
app.use(express.json({ limit: "500mb" }));
app.use(cookieParser());
app.use(express.static("public"));

//routes-:
import UserRoute from "./routes/User.routes.js";
import VideoRoute from "./routes/Video.routes.js";

app.use("/api/user", UserRoute);
app.use("/api/video", VideoRoute);

export default app;
