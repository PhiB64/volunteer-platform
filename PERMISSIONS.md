# Documentation des Permissions Utilisateurs

Ce document décrit les rôles disponibles dans l'application et les permissions associées à chaque route de l'API.

---

## Rôles Utilisateurs

| Rôle            | Description                                                             |
| --------------- | ----------------------------------------------------------------------- |
| **Bénévole**    | Peut consulter les missions, postuler, voir ses candidatures            |
| **Association** | Peut créer et gérer des missions, consulter et traiter les candidatures |

---

## Routes et Permissions

### Missions

| Méthode | Route           | Bénévole | Association | Notes                          |
| ------- | --------------- | -------- | ----------- | ------------------------------ |
| GET     | `/missions`     | ✅       | ✅          | Liste des missions disponibles |
| POST    | `/missions`     | ❌       | ✅          | Création de mission            |
| PUT     | `/missions/:id` | ❌       | ✅          | Modification d’une mission     |
| DELETE  | `/missions/:id` | ❌       | ✅          | Suppression d’une mission      |

---

### Applications (Candidatures)

| Méthode | Route                              | Bénévole | Association | Notes                                             |
| ------- | ---------------------------------- | -------- | ----------- | ------------------------------------------------- |
| POST    | `/applications`                    | ✅       | ❌          | Postuler à une mission                            |
| PUT     | `/applications/:id`                | ❌       | ✅          | Accepter ou refuser une candidature               |
| GET     | `/applications/mission/:missionId` | ❌       | ✅          | Voir les candidatures en attente pour une mission |
| GET     | `/applications`                    | ❌       | ✅          | Voir toutes les candidatures                      |

---

### Utilisateurs

| Méthode | Route             | Bénévole | Association | Notes                                          |
| ------- | ----------------- | -------- | ----------- | ---------------------------------------------- |
| POST    | `/users/register` | ✅       | ✅          | Création de compte                             |
| POST    | `/users/login`    | ✅       | ✅          | Connexion                                      |
| GET     | `/users`          | ❌       | ❌          | Route réservée à des usages internes ou futurs |

---

## Middlewares utilisés

- `authenticateToken` : vérifie que l’utilisateur est connecté via un token JWT
- `authorizeRole(role)` : vérifie que l’utilisateur a le rôle requis pour accéder à la route

---

## Notes complémentaires

- Les rôles sont stockés dans la base de données et vérifiés à chaque requête protégée
- Les cookies sont utilisés pour stocker le token JWT côté client
- Les erreurs de permission renvoient un code HTTP `403 Forbidden` et le message d'erreur `Accès interdit : rôle insuffisant`
- Les erreurs d’authentification renvoient un code HTTP `401 Unauthorized` et le message d'erreur `Token manquant`
  ou un code HTTP `403 Forbidden` et le message d'erreur `Token invalide ou expiré`

---
