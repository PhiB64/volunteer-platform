import { pool } from "../config/db.js";

export class MissionRepository {
  async create({ title, description, date, association_id }) {
    const conn = await pool.getConnection();
    try {
      const result = await conn.query(
        `INSERT INTO missions (title, description, date, association_id)
         VALUES (?, ?, ?, ?)`,
        [title, description, date, association_id]
      );
      return {
        id: Number(result.insertId),
        title,
        description,
        date,
        association_id,
      };
    } finally {
      conn.release();
    }
  }
}
