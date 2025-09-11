import { MissionService } from "../services/missionService.js";

export class MissionController {
  constructor() {
    this.missionService = new MissionService();
  }

  async createMission(req, res) {
    try {
      const { title, description, date, association_id } = req.body;

      if (!title || !description || !date || !association_id) {
        return res.status(400).json({ error: "Champs requis manquants" });
      }

      const mission = await this.missionService.createMission({
        title,
        description,
        date,
        association_id,
      });

      res.status(201).json(mission);
    } catch (error) {
      console.error("Erreur lors de la création de la mission :", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
}
