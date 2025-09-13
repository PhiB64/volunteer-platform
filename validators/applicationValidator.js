import Joi from "joi";

export const createApplicationSchema = Joi.object({
  mission_id: Joi.number().integer().positive().required().messages({
    "number.base": "L'ID de la mission doit être un nombre",
    "number.integer": "L'ID de la mission doit être un entier",
    "number.positive": "L'ID de la mission doit être positif",
    "any.required": "L'ID de la mission est requis",
  }),

  volunteer_id: Joi.number().integer().positive().required().messages({
    "number.base": "L'ID du bénévole doit être un nombre",
    "number.integer": "L'ID du bénévole doit être un entier",
    "number.positive": "L'ID du bénévole doit être positif",
    "any.required": "L'ID du bénévole est requis",
  }),

  status: Joi.string()
    .valid("En attente", "Acceptée", "Refusée")
    .default("En attente")
    .messages({
      "any.only": "Le statut doit être 'En attente', 'Acceptée' ou 'Refusée'",
    }),
});
