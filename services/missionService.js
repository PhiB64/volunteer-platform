import missionRepository from "../repositories/missionRepository.js";
import userRepository from "../repositories/userRepository.js";

export class MissionService {
  constructor(missionRepository, userRepository) {
    this.missionRepository = missionRepository;
    this.userRepository = userRepository;
  }

  async createMission(data) {
    const { association_id } = data;

    const association = await this.userRepository.findById(association_id);
    if (!association || association.role !== "Associations") {
      throw new Error("Association introuvable ou rôle invalide");
    }

    return await this.missionRepository.create(data);
  }

  async getAllMissions() {
    return await this.missionRepository.findAll();
  }

  async updateMission(id, data) {
    const mission = await this.missionRepository.findById(id);
    if (!mission) {
      throw new Error("Mission introuvable");
    }

    return await this.missionRepository.update(id, data);
  }

  async deleteMission(id) {
    const mission = await this.missionRepository.findById(id);
    if (!mission) {
      throw new Error("Mission introuvable");
    }

    return await this.missionRepository.delete(id);
  }
}
export default new MissionService(missionRepository, userRepository);
