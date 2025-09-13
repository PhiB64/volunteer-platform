import { pool } from "../config/db.js";

async function seed() {
  const conn = await pool.getConnection();

  try {
    // Suppression des tables dans l'ordre inverse des dépendances
    await conn.query(`DROP TABLE IF EXISTS applications`);
    await conn.query(`DROP TABLE IF EXISTS missions`);
    await conn.query(`DROP TABLE IF EXISTS user_roles`);
    await conn.query(`DROP TABLE IF EXISTS roles`);
    await conn.query(`DROP TABLE IF EXISTS users`);

    // Recréation des tables
    await conn.query(`
      CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255)
      );
    `);

    await conn.query(`
      CREATE TABLE roles (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) UNIQUE
      );
    `);

    await conn.query(`
      CREATE TABLE user_roles (
        user_id INT,
        role_id INT,
        PRIMARY KEY (user_id, role_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
      );
    `);

    await conn.query(`
      CREATE TABLE missions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255),
        description TEXT,
        date DATE,
        association_id INT,
        FOREIGN KEY (association_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    await conn.query(`
      CREATE TABLE applications (
        id INT PRIMARY KEY AUTO_INCREMENT,
        mission_id INT,
        volunteer_id INT,
        status ENUM('En attente', 'Acceptée', 'Refusée') DEFAULT 'En attente',
        FOREIGN KEY (mission_id) REFERENCES missions(id) ON DELETE CASCADE,
        FOREIGN KEY (volunteer_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Insertion des rôles
    await conn.query(`
      INSERT INTO roles (name) VALUES ('Bénévoles'), ('Associations');
    `);

    // Insertion des utilisateurs
    await conn.query(`
      INSERT INTO users (name, email, password)
      VALUES 
        ('Alice', 'alice@volunteer.com', 'hashed_pw1'),
        ('Bob', 'bob@volunteer.com', 'hashed_pw2'),
        ('Solidarité 33', 'contact@solidarite33.org', 'hashed_pw3'),
        ('Claire', 'claire@volunteer.com', 'hashed_pw4'),
        ('Jean', 'jean@volunteer.com', 'hashed_pw5'),
        ('Aide Humanitaire 64', 'contact@ah64.org', 'hashed_pw6'),
        ('Entraide Sud-Ouest', 'contact@entraide-so.org', 'hashed_pw7');
    `);

    // Attribution des rôles
    await conn.query(`
      INSERT INTO user_roles (user_id, role_id)
      VALUES 
        (1, 1),
        (2, 1),
        (3, 2),
        (4, 1),
        (5, 1),
        (6, 2),
        (7, 2);
    `);

    // Insertion des missions
    await conn.query(`
      INSERT INTO missions (title, description, date, association_id)
      VALUES 
        ('Collecte alimentaire', 'Aide à la distribution de colis', '2025-09-15', 3),
        ('Nettoyage de plage', 'Sensibilisation et ramassage des déchets', '2025-09-20', 3),
        ('Distribution de vêtements', 'Tri et distribution pour les sans-abris', '2025-09-25', 6),
        ('Atelier numérique', 'Aide aux démarches en ligne pour seniors', '2025-09-30', 7),
        ('Collecte de jouets', 'Organisation d’une collecte pour Noël', '2025-10-05', 6);
    `);

    // Insertion des candidatures (apllications)
    await conn.query(`
      INSERT INTO applications (mission_id, volunteer_id, status)
      VALUES 
        (1, 1, 'En attente'),
        (1, 2, 'Acceptée'),
        (2, 1, 'Refusée'),
        (3, 4, 'En attente'),  
        (4, 5, 'Acceptée'),    
        (5, 1, 'En attente'),  
        (5, 2, 'Refusée'),     
        (2, 4, 'Acceptée');    


    `);

    console.log("Base réinitialisée et peuplée avec succès !");
  } catch (err) {
    console.error("Erreur lors de l'initialisation :", err);
  } finally {
    conn.release();
  }
}

seed();
