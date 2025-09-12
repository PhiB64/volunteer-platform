import express from "express";
import { UserController } from "../controllers/userControler.js";

const router = express.Router();
const controller = new UserController();

router.post("/register", (req, res) => controller.register(req, res));
router.post("/login", (req, res) => controller.login(req, res));
router.post("/logout", (req, res) => controller.logout(req, res));
router.get("/", (req, res) => controller.getAllUsers(req, res));
router.get("/:id", (req, res) => controller.getUserById(req, res));

export default router;
