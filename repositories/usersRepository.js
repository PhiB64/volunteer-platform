import { pool } from "../config/db.js";

export class UsersRepository {
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

  async findByRole(roleName) {
    const conn = await pool.getConnection();
    try {
      const result = await conn.query(
        `SELECT u.*
         FROM users u
         JOIN user_roles ur ON u.id = ur.user_id
         JOIN roles r ON ur.role_id = r.id
         WHERE r.name = ?`,
        [roleName]
      );
      return result;
    } finally {
      conn.release();
    }
  }

  async exists(id) {
    const user = await this.findById(id);
    return !!user;
  }
}
