import { pool } from "../config/db.js";

export class ApplicationRepository {
  async create({ mission_id, volunteer_id }) {
    const conn = await pool.getConnection();
    try {
      const result = await conn.query(
        `INSERT INTO applications (mission_id, volunteer_id)
         VALUES (?, ?)`,
        [mission_id, volunteer_id]
      );
      return {
        id: Number(result.insertId),
        mission_id,
        volunteer_id,
        status: "En attente",
      };
    } finally {
      conn.release();
    }
  }

  async updateStatus(id, status) {
    const conn = await pool.getConnection();
    try {
      await conn.query(`UPDATE applications SET status = ? WHERE id = ?`, [
        status,
        id,
      ]);
      return { id, status };
    } finally {
      conn.release();
    }
  }

  async findByMissionId(missionId) {
    const conn = await pool.getConnection();
    try {
      const result = await conn.query(
        `SELECT * FROM applications WHERE mission_id = ? `,
        [missionId]
      );
      return result;
    } finally {
      conn.release();
    }
  }

  async findById(id) {
    const conn = await pool.getConnection();
    try {
      const result = await conn.query(
        `SELECT * FROM applications WHERE id = ?`,
        [id]
      );
      return result[0];
    } finally {
      conn.release();
    }
  }
}
