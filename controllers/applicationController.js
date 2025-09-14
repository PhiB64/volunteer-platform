import applicationService from "../services/applicationService.js";

export class ApplicationController {
  constructor(applicationService) {
    this.service = applicationService;
  }

  async apply(req, res) {
    try {
      const { mission_id } = req.body;
      const volunteer_id = req.user.id;

      if (!mission_id || !volunteer_id) {
        return res.status(400).json({ error: "Champs requis manquants" });
      }

      const alreadyApplied = await this.service.hasAlreadyApplied(
        mission_id,
        volunteer_id
      );
      if (alreadyApplied) {
        return res.status(409).json({ error: "Déjà candidat à cette mission" });
      }

      const application = await this.service.apply({
        mission_id,
        volunteer_id,
      });
      res.status(201).json(application);
    } catch (error) {
      if (error.message === "Mission introuvable") {
        return res.status(404).json({ error: "Mission introuvable" });
      }
      if (error.message === "Bénévole introuvable ou rôle invalide") {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "Association introuvable ou rôle invalide") {
        return res.status(404).json({ error: error.message });
      }

      console.error("Erreur candidature :", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["Acceptée", "Refusée"].includes(status)) {
        return res.status(400).json({ error: "Statut invalide" });
      }

      const updated = await this.service.updateApplicationStatus(id, status);
      res.status(200).json(updated);
    } catch (error) {
      if (error.message === "Candidature introuvable") {
        return res.status(404).json({ error: "Candidature introuvable" });
      }
      if (error.message === "Mission associée introuvable") {
        return res.status(404).json({ error: "Mission associée introuvable" });
      }
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  async getPending(req, res) {
    try {
      const { missionId } = req.params;
      const applications = await this.service.getPendingApplications(missionId);

      if (applications.length === 0) {
        return res
          .status(404)
          .json({ error: "Aucune candidature en attente pour cette mission" });
      }

      res.status(200).json(applications);
    } catch (error) {
      if (error.message === "Mission introuvable") {
        return res.status(404).json({ error: "Mission introuvable" });
      }
      console.error("Erreur récupération candidatures :", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
}
export default new ApplicationController(applicationService);
