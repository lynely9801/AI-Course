const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/auth');

// Đăng ký
router.post('/register', authController.register);
// Đăng nhập
router.post('/login', authController.login);
// Lấy thông tin user hiện tại
router.get('/me', authenticateToken, authController.me);

module.exports = router;
