import express from "express";
import { MissionController } from "../controllers/missionController.js";

const router = express.Router();
const missionController = new MissionController();

router.post("/missions", (req, res) =>
  missionController.createMission(req, res)
);

export default router;
