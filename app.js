import express from "express";
import cookieParser from "cookie-parser";
import missionRouter from "./routes/missionRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/missions", missionRouter);
app.use("/applications", applicationRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
