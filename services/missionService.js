import { MissionRepository } from "../repositories/missionRepository.js";

export class MissionService {
  constructor() {
    this.missionRepository = new MissionRepository();
  }

  async createMission(missionData) {
    return await this.missionRepository.create(missionData);
  }
}
