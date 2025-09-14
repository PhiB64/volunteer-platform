import express from "express";
import missionController from "../controllers/missionController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";
import { validate } from "../middlewares/validate.js";
import { createMissionSchema } from "../validators/missionValidator.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  authorizeRole("Associations"),
  validate(createMissionSchema),
  (req, res) => missionController.createMission(req, res)
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRole("Associations"),
  (req, res) => missionController.updateMission(req, res)
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole("Associations"),
  (req, res) => missionController.deleteMission(req, res)
);
router.get("/", authenticateToken, authorizeRole("Bénévoles"), (req, res) =>
  missionController.getAllMissions(req, res)
);

export default router;
