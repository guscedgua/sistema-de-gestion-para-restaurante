const express = require('express');
const {
  registerUser,
  loginUser,
  getUserByEmail,
  getAllUsers,
  getUsersByRole // 👈 nuevo
} = require('../controllers/userController');

const { protect,adminOnly  } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/role/:role', protect, getUsersByRole);

router.get('/', protect, adminOnly, getAllUsers);


router.get('/profile', protect, (req, res) => {
  res.json({
    message: '✅ Acceso autorizado',
    user: req.user,
  });
});

// ✅ NUEVA RUTA para buscar usuario por email
router.get('/find/:email', protect, getUserByEmail);

module.exports = router;
