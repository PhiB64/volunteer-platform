import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "Token manquant" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token invalide ou expiré" });
    }
    req.user = user;
    next();
  });
}
