const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Obtener token del header
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ msg: 'Token no proporcionado' });

  const token = authHeader.split(' ')[1]; // formato: "Bearer token"

  if (!token) return res.status(401).json({ msg: 'Token inválido' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // ahora tienes accesso a req.user.id en la ruta
    next();
  } catch (err) {
    return res.status(403).json({ msg: 'Token no válido' });
  }
};

module.exports = auth;
