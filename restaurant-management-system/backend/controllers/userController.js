// backend/controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// LOGIN de usuario
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: '❌ Usuario no encontrado' });
    }

    // 2. Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: '❌ Contraseña incorrecta' });
    }

    // 3. Devolver info básica
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });

  } catch (error) {
    res.status(500).json({ message: '❌ Error al iniciar sesión', error });
  }
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


// Buscar usuario por email

exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar usuario', error });
  }
};
// Buscar todos los usuarios

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // excluye contraseña
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

// Buscar todos el rol

exports.getUsersByRole = async (req, res) => {
  const { role } = req.params;

  try {
    const users = await User.find({ role }).select('-password');
    
    if (!users.length) {
      return res.status(404).json({ message: `No se encontraron usuarios con el rol ${role}` });
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar usuarios por rol', error });
  }
};

