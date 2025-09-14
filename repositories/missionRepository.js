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

  async findAll() {
    const conn = await pool.getConnection();
    try {
      const missions = await conn.query(`SELECT * FROM missions`);
      return missions;
    } finally {
      conn.release();
    }
  }

  async findById(id) {
    const conn = await pool.getConnection();
    try {
      const result = await conn.query(`SELECT * FROM missions WHERE id = ?`, [
        id,
      ]);
      return result[0];
    } finally {
      conn.release();
    }
  }

  async update(id, { title, description, date }) {
    const conn = await pool.getConnection();
    try {
      await conn.query(
        `UPDATE missions SET title = ?, description = ?, date = ? WHERE id = ?`,
        [title, description, date, id]
      );
      return { id, title, description, date };
    } finally {
      conn.release();
    }
  }

  async delete(id) {
    const conn = await pool.getConnection();
    try {
      await conn.query(`DELETE FROM missions WHERE id = ?`, [id]);
      return { message: `Mission ${id} supprimée` };
    } finally {
      conn.release();
    }
  }
}
export default new MissionRepository();
