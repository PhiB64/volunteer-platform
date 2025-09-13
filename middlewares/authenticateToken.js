import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Authentification requise. Veuillez vous connecter." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({
          error: "Authentification invalide. Merci de vous reconnecter.",
        });
    }
    req.user = user;
    next();
  });
}
