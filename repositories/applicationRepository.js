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
      const rows = await conn.query(
        `
      SELECT 
        m.id AS mission_id,
        a.id AS application_id,
        a.status,
        a.created_at,       
        m.title AS mission_title,
        m.date AS mission_date,
        u.name AS volunteer_name,
        u.email AS volunteer_email
      FROM applications a
      JOIN missions m ON a.mission_id = m.id
      JOIN users u ON a.volunteer_id = u.id
      WHERE a.mission_id = ? AND a.status = 'En attente'
      ORDER BY a.created_at ASC
      `,
        [missionId]
      );
      return rows;
    } finally {
      conn.release();
    }
  }

  async findById(id) {
    const conn = await pool.getConnection();
    try {
      const rows = await conn.query(`SELECT * FROM applications WHERE id = ?`, [
        id,
      ]);
      return rows.length > 0 ? rows[0] : null;
    } finally {
      conn.release();
    }
  }

  async findByMissionAndVolunteer(missionId, volunteerId) {
    const conn = await pool.getConnection();
    try {
      const rows = await conn.query(
        `SELECT * FROM applications WHERE mission_id = ? AND volunteer_id = ?`,
        [missionId, volunteerId]
      );
      return rows.length > 0 ? rows[0] : null;
    } finally {
      conn.release();
    }
  }
}
