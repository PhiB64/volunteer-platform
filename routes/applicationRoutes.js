import express from "express";
import { ApplicationController } from "../controllers/applicationController.js";

const router = express.Router();
const controller = new ApplicationController();

router.post("/applications", (req, res) => controller.apply(req, res));
router.put("/applications/:id", (req, res) =>
  controller.updateStatus(req, res)
);
router.get("/applications/mission/:missionId", (req, res) =>
  controller.getPending(req, res)
);

export default router;
