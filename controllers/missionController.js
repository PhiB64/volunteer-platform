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
      if (error.message === "Association introuvable ou rôle invalide") {
        return res.status(404).json({ error: error.message });
      }
      console.error("Erreur création mission :", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  async getAllMissions(req, res) {
    try {
      const missions = await this.missionService.getAllMissions();
      res.status(200).json(missions);
    } catch (error) {
      console.error("Erreur récupération missions :", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  async updateMission(req, res) {
    try {
      const { id } = req.params;
      const { title, description, date } = req.body;

      if (!title || !description || !date) {
        return res.status(400).json({ error: "Champs requis manquants" });
      }

      const updated = await this.missionService.updateMission(id, {
        title,
        description,
        date,
      });

      res.status(200).json(updated);
    } catch (error) {
      if (error.message === "Mission introuvable") {
        return res.status(404).json({ error: "Mission introuvable" });
      }

      console.error("Erreur mise à jour mission :", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  async deleteMission(req, res) {
    try {
      const { id } = req.params;
      const result = await this.missionService.deleteMission(id);
      res.status(200).json(result);
    } catch (error) {
      if (error.message === "Mission introuvable") {
        return res.status(404).json({ error: "Mission introuvable" });
      }
      console.error("Erreur suppression mission :", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
}
