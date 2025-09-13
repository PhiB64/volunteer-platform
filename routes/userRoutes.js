import express from "express";
import { UserController } from "../controllers/userControler.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validators/userValidator.js";

const router = express.Router();
const controller = new UserController();

router.post("/register", validate(registerSchema), (req, res) =>
  controller.register(req, res)
);
router.post("/login", validate(loginSchema), (req, res) =>
  controller.login(req, res)
);
router.post("/logout", authenticateToken, (req, res) =>
  controller.logout(req, res)
);

router.get("/", (req, res) => controller.getAllUsers(req, res));
router.get("/:id", (req, res) => controller.getUserById(req, res));
router.delete("/:id", (req, res) => controller.deleteUser(req, res));

export default router;
