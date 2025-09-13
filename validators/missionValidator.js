import Joi from "joi";

export const createMissionSchema = Joi.object({
  title: Joi.string().min(5).max(255).required().messages({
    "string.empty": "Le titre est requis",
    "string.min": "Le titre doit contenir au moins 5 caractères",
    "string.max": "Le titre ne peut pas dépasser 255 caractères",
  }),

  description: Joi.string().min(10).required().messages({
    "string.empty": "La description est requise",
    "string.min": "La description doit contenir au moins 10 caractères",
  }),

  date: Joi.date().greater("now").required().messages({
    "date.base": "La date doit être valide",
    "date.greater": "La date doit être dans le futur",
  }),

  association_id: Joi.number().integer().positive().required().messages({
    "number.base": "L'ID de l'association doit être un nombre",
    "number.positive": "L'ID de l'association doit être positif",
  }),
});
