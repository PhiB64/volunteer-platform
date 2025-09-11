import express from "express";
import { MissionController } from "../controllers/missionController.js";

const router = express.Router();
const controller = new MissionController();

router.post("/missions", (req, res) => controller.createMission(req, res));
router.get("/missions", (req, res) => controller.getAllMissions(req, res));
router.put("/missions/:id", (req, res) => controller.updateMission(req, res));
router.delete("/missions/:id", (req, res) =>
  controller.deleteMission(req, res)
);

export default router;
