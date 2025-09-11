import { MissionRepository } from "../repositories/missionRepository.js";

export class MissionService {
  constructor() {
    this.missionRepository = new MissionRepository();
  }

  async createMission(data) {
    return await this.missionRepository.create(data);
  }

  async getAllMissions() {
    return await this.missionRepository.findAll();
  }

  async updateMission(id, data) {
    return await this.missionRepository.update(id, data);
  }

  async deleteMission(id) {
    return await this.missionRepository.delete(id);
  }
}
