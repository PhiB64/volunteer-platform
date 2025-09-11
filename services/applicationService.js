import { ApplicationRepository } from "../repositories/applicationRepository.js";
import { MissionRepository } from "../repositories/missionRepository.js";
import { UsersRepository } from "../repositories/usersRepository.js";

export class ApplicationService {
  constructor() {
    this.repository = new ApplicationRepository();
    this.missionRepository = new MissionRepository();
    this.usersRepository = new UsersRepository();
  }

  async apply(data) {
    const { mission_id, volunteer_id } = data;

    const mission = await this.missionRepository.findById(mission_id);
    if (!mission) {
      throw new Error("Mission introuvable");
    }

    const volunteer = await this.usersRepository.findById(volunteer_id);
    if (!volunteer || volunteer.role !== "volunteer") {
      throw new Error("Bénévole introuvable ou rôle invalide");
    }

    const association = await this.usersRepository.findById(
      mission.association_id
    );
    if (!association || association.role !== "association") {
      throw new Error("Association introuvable ou rôle invalide");
    }

    return await this.repository.create(data);
  }

  async updateApplicationStatus(id, status) {
    const application = await this.repository.findById(id);
    if (!application) {
      throw new Error("Candidature introuvable");
    }

    const mission = await this.missionRepository.findById(
      application.mission_id
    );
    if (!mission) {
      throw new Error("Mission associée introuvable");
    }

    return await this.repository.updateStatus(id, status);
  }

  async getPendingApplications(missionId) {
    const mission = await this.missionRepository.findById(missionId);
    if (!mission) {
      throw new Error("Mission introuvable");
    }

    const applications = await this.repository.findByMissionId(missionId);
    return applications;
  }
}
