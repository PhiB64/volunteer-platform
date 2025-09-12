import express from "express";
import { MissionController } from "../controllers/missionController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";

const router = express.Router();
const controller = new MissionController();

router.post("/", authenticateToken, authorizeRole("Association"), (req, res) =>
  controller.createMission(req, res)
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRole("Association"),
  (req, res) => controller.updateMission(req, res)
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole("Association"),
  (req, res) => controller.deleteMission(req, res)
);
router.get("/", authenticateToken, (req, res) =>
  controller.getAllMissions(req, res)
);

export default router;
