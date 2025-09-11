import { MissionRepository } from "../repositories/missionRepository.js";
import { UsersRepository } from "../repositories/usersRepository.js";

export class MissionService {
  constructor() {
    this.missionRepository = new MissionRepository();
    this.usersRepository = new UsersRepository();
  }

  async createMission(data) {
    const { association_id } = data;

    const association = await this.usersRepository.findById(association_id);
    if (!association || association.role !== "association") {
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
