import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import { CORS_ORIGIN } from "./config/config.js";

const app = express();

const corsOptions = {
    origin: CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send(`Welcome to the Blog App`);
});

app.use("/api/v1/users", userRouter);

export default app;