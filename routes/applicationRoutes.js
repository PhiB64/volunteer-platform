import express from "express";
import applicationController from "../controllers/applicationController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";
import { validate } from "../middlewares/validate.js";
import { createApplicationSchema } from "../validators/applicationValidator.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  authorizeRole("Bénévoles"),
  validate(createApplicationSchema),
  (req, res) => applicationController.apply(req, res)
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRole("Associations"),
  (req, res) => applicationController.updateStatus(req, res)
);
router.get(
  "/mission/:missionId",
  authenticateToken,
  authorizeRole("Associations"),
  (req, res) => applicationController.getPending(req, res)
);

export default router;
