import { pool } from "../config/db.js";

export class UserRepository {
  async findById(id) {
    const conn = await pool.getConnection();
    try {
      const result = await conn.query(
        `SELECT u.*, r.name AS role
         FROM users u
         JOIN user_roles ur ON u.id = ur.user_id
         JOIN roles r ON ur.role_id = r.id
         WHERE u.id = ?`,
        [id]
      );
      return result[0];
    } finally {
      conn.release();
    }
  }

  async findByEmail(email) {
    const conn = await pool.getConnection();
    try {
      const result = await conn.query(
        `SELECT u.*, r.name AS role
         FROM users u
         JOIN user_roles ur ON u.id = ur.user_id
         JOIN roles r ON ur.role_id = r.id
         WHERE u.email = ?`,
        [email]
      );
      return result[0];
    } finally {
      conn.release();
    }
  }

  async createUser({ name, email, password }) {
    const conn = await pool.getConnection();
    try {
      const result = await conn.query(
        `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
        [name, email, password]
      );
      return { id: Number(result.insertId), name, email };
    } finally {
      conn.release();
    }
  }

  async assignRole(userId, roleName) {
    const conn = await pool.getConnection();
    try {
      const roleResult = await conn.query(
        `SELECT id FROM roles WHERE name = ?`,
        [roleName]
      );
      if (roleResult.length === 0) {
        throw new Error("Rôle introuvable");
      }
      const roleId = roleResult[0].id;
      await conn.query(
        `INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)`,
        [userId, roleId]
      );
    } finally {
      conn.release();
    }
  }
}
