import express from "express";
import userController from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validators/userValidator.js";

const router = express.Router();

router.post("/register", validate(registerSchema), (req, res) =>
  userController.register(req, res)
);
router.post("/login", validate(loginSchema), (req, res) =>
  userController.login(req, res)
);
router.post("/logout", authenticateToken, (req, res) =>
  userController.logout(req, res)
);

router.get("/", (req, res) => userController.getAllUsers(req, res));
router.get("/:id", (req, res) => userController.getUserById(req, res));
router.delete("/:id", (req, res) => userController.deleteUser(req, res));

export default router;
