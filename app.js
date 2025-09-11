import express from "express";
import missionRouter from "./routes/missionRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/", missionRouter);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
