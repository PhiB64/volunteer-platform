import express from "express";
import { MissionController } from "../controllers/missionController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";
import { validate } from "../middlewares/validate.js";
import { createMissionSchema } from "../validators/missionValidator.js";

const router = express.Router();
const controller = new MissionController();

router.post(
  "/",
  authenticateToken,
  authorizeRole("Associations"),
  validate(createMissionSchema),
  (req, res) => controller.createMission(req, res)
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRole("Associations"),
  (req, res) => controller.updateMission(req, res)
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole("Associations"),
  (req, res) => controller.deleteMission(req, res)
);
router.get("/", authenticateToken, authorizeRole("Bénévoles"), (req, res) =>
  controller.getAllMissions(req, res)
);

export default router;
