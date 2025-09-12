import express from "express";
import { ApplicationController } from "../controllers/applicationController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";

const router = express.Router();
const controller = new ApplicationController();

router.post("/", authenticateToken, authorizeRole("volunteer"), (req, res) =>
  controller.apply(req, res)
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRole("association"),
  (req, res) => controller.updateStatus(req, res)
);
router.get(
  "/mission/:missionId",
  authenticateToken,
  authorizeRole("association"),
  (req, res) => controller.getPending(req, res)
);

export default router;
