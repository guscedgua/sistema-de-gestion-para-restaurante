// backend/controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generar token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Registrar usuario
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) return res.status(400).json({ message: 'Usuario ya registrado' });

  const user = await User.create({ name, email, password, role });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id)
  });
};

// Login de usuario
exports.authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(401).json({ message: 'Correo o contraseña inválidos' });
  }
};
