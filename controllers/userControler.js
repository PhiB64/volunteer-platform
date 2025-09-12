import { UserService } from "../services/userService.js";

export class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async register(req, res) {
    try {
      const user = await this.userService.register(req.body);
      res.status(201).json({ message: "Utilisateur créé", user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const result = await this.userService.login(req.body);
      const { token, user } = result;

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // true en prod
          sameSite: "Strict",
          maxAge: 24 * 60 * 60 * 1000, // 1 jour
        })
        .status(200)
        .json({ message: "Connexion réussie", user });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }

  logout(req, res) {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      })
      .status(200)
      .json({ message: "Déconnexion réussie" });
  }
}
