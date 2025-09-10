import { pool } from "../config/db.js";

async function seed() {
  const conn = await pool.getConnection();

  try {
    // Création des tables
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255)
      );
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) UNIQUE
      );
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS user_roles (
        user_id INT,
        role_id INT,
        PRIMARY KEY (user_id, role_id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (role_id) REFERENCES roles(id)
      );
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS missions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255),
        description TEXT,
        date DATE,
        association_id INT,
        FOREIGN KEY (association_id) REFERENCES users(id)
      );
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id INT PRIMARY KEY AUTO_INCREMENT,
        mission_id INT,
        volunteer_id INT,
        status ENUM('En attente', 'Acceptée', 'Refusée') DEFAULT 'En attente',
        FOREIGN KEY (mission_id) REFERENCES missions(id),
        FOREIGN KEY (volunteer_id) REFERENCES users(id)
      );
    `);

    // Insertion des rôlesnode
    await conn.query(
      `INSERT IGNORE INTO roles (name) VALUES ('Bénévole'), ('Association')`
    );

    // Insertion des utilisateurs
    await conn.query(`
      INSERT INTO users (name, email, password)
      VALUES 
        ('Alice', 'alice@volunteer.com', 'hashed_pw1'),
        ('Bob', 'bob@volunteer.com', 'hashed_pw2'),
        ('Solidarité 33', 'contact@solidarite33.org', 'hashed_pw3');
    `);

    // Attribution des rôles
    await conn.query(`
      INSERT INTO user_roles (user_id, role_id)
      VALUES 
        (1, 1),
        (2, 1),
        (3, 2);
    `);

    // Insertion des missions
    await conn.query(`
      INSERT INTO missions (title, description, date, association_id)
      VALUES 
        ('Collecte alimentaire', 'Aide à la distribution de colis', '2025-09-15', 3),
        ('Nettoyage de plage', 'Sensibilisation et ramassage des déchets', '2025-09-20', 3);
    `);

    // Insertion des candidatures
    await conn.query(`
      INSERT INTO applications (mission_id, volunteer_id, status)
      VALUES 
        (1, 1, 'En attente'),
        (1, 2, 'Acceptée'),
        (2, 1, 'Refusée');
    `);

    console.log("Base initialisée avec succès !");
  } catch (err) {
    console.error("Erreur lors de l'initialisation :", err);
  } finally {
    conn.release();
  }
}

seed();
