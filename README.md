# Volunteer Platform – CCP2

Plateforme web permettant aux bénévoles de postuler à des missions proposées par des associations. Les associations peuvent ensuite accepter ou refuser les candidatures.

## Fonctionnalités

- Inscription et connexion sécurisée (JWT)
- Rôles utilisateurs : Bénévoles et Associations
- Création de missions par les associations
- Candidature des bénévoles aux missions
- Acceptation ou refus des candidatures
- Filtrage des candidatures par statut
- Validation des données avec Joi
- Documentation API via Postman

Consultez la [documentation des permissions](./PERMISSIONS.md) pour comprendre les rôles et accès.

La documentation complète de l'API est disponible sur Postman :  
[Consulter la documentation](https://documenter.getpostman.com/view/46341307/2sB3Hooz3h)

---

## Technologies utilisées

- **Backend** : Node.js + Express
- **Base de données** : MariaDB (SQL)
- **Authentification** : JWT (JSON Web Tokens)
- **Sécurité** : Bcrypt pour le hash des mots de passe
- **Gestion des variables sensibles** : dotenv
- **Outils de développement** : Nodemon, Postman

---

## Justification du choix technologique – SQL avec MariaDB

Cette application gère des relations bien définies entre plusieurs entités :

- Des utilisateurs (bénévoles et associations)
- Des missions créées par les associations
- Des candidatures déposées par les bénévoles

Ces données sont **structurées**, **liées entre elles**, et doivent respecter des **contraintes d’intégrité** (ex : une candidature ne peut exister que si la mission et le bénévole existent). C’est exactement ce pour quoi une base **relationnelle** comme MariaDB est conçue.

### Avantages de MariaDB dans ce contexte

- Modélisation claire avec des tables, des clés primaires et étrangères
- Requêtes SQL puissantes pour filtrer, joindre et trier les données
- Contrôle des rôles et permissions via des relations (ex : `user_roles`)
- Facile à tester et à déployer en local ou avec Docker
- Open-source et léger, avec une large communauté

### Pourquoi MongoDB serait moins adapté ici

MongoDB est une base NoSQL orientée documents, très utile quand :

- Les données sont non structurées ou changent souvent
- Il n’y a pas de relations complexes entre les objets
- On gère des volumes massifs ou des flux en temps réel

Mais dans notre cas :

- Nous avons besoin de relations solides (missions ↔ utilisateurs ↔ candidatures)
- Nous voulons valider les données et éviter les incohérences
- Nous n'avons pas besoin de la flexibilité extrême d’un schéma libre

---

## Installation et lancement

### 1. Cloner le projet

```bash
git clone https://github.com/PhiB64/volunteer-platform.git
cd volunteer-platform
```
