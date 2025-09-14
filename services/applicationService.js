import applicationRepository from "../repositories/applicationRepository.js";
import missionRepository from "../repositories/missionRepository.js";
import userRepository from "../repositories/userRepository.js";

export class ApplicationService {
  constructor(applicationRepository, missionRepository, userRepository) {
    this.repository = applicationRepository;
    this.missionRepository = missionRepository;
    this.userRepository = userRepository;
  }

  async apply(data) {
    const { mission_id, volunteer_id } = data;

    const mission = await this.missionRepository.findById(mission_id);
    if (!mission) {
      throw new Error("Mission introuvable");
    }

    const volunteer = await this.userRepository.findById(volunteer_id);
    if (!volunteer || volunteer.role !== "Bénévoles") {
      throw new Error("Bénévole introuvable ou rôle invalide");
    }

    const association = await this.userRepository.findById(
      mission.association_id
    );
    if (!association || association.role !== "Associations") {
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

  async hasAlreadyApplied(missionId, volunteerId) {
    const existing = await this.repository.findByMissionAndVolunteer(
      missionId,
      volunteerId
    );
    return !!existing;
  }
}
export default new ApplicationService(
  applicationRepository,
  missionRepository,
  userRepository
);
