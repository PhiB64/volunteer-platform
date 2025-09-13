import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Le nom est requis",
    "string.min": "Le nom doit contenir au moins 2 caractères",
    "string.max": "Le nom ne peut pas dépasser 100 caractères",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "L'email est requis",
    "string.email": "L'email doit être valide",
  }),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[0-9]).{6,}$"))
    .required()
    .messages({
      "string.empty": "Le mot de passe est requis",
      "string.min": "Le mot de passe doit contenir au moins 6 caractères",
    }),
  role: Joi.string().valid("Bénévoles", "Associations").required().messages({
    "any.only": "Le rôle doit être 'Bénévoles' ou 'Associations'",
    "string.empty": "Le rôle est requis",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "L'email est requis",
    "string.email": "L'email doit être valide",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Le mot de passe est requis",
    "string.min": "Le mot de passe doit contenir au moins 6 caractères",
  }),
});
