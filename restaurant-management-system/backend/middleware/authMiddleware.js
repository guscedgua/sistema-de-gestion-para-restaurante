const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  // Leer el token del header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      return res.status(401).json({ message: '❌ Token inválido o expirado' });
    }
  } else {
    return res.status(401).json({ message: '❌ No hay token, acceso denegado' });
  }
  
};
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'Administrador') {
    next(); // el usuario es admin → continua
  } else {
    res.status(403).json({ message: '⛔ Acceso restringido solo a administradores' });
  }
};

module.exports = { protect, adminOnly };
