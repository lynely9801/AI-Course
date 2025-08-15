const express = require('express');
const router = express.Router();
const { users } = require('../models/user');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth');

// Lấy danh sách user (chỉ admin)
router.get('/', authenticateToken, authorizeRoles('admin'), (req, res) => {
  res.json(users.map(u => ({ id: u.id, username: u.username, role: u.role })));
});

module.exports = router;

// Sửa user (chỉ admin)
router.put('/:id', authenticateToken, authorizeRoles('admin'), (req, res) => {
  const id = parseInt(req.params.id);
  const { username, password, role } = req.body;
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'Không tìm thấy user' });
  if (username) user.username = username;
  if (password) user.password = password;
  if (role) user.role = role;
  res.json({ message: 'Đã cập nhật user', user: { id: user.id, username: user.username, role: user.role } });
});

// Xóa user (chỉ admin)
router.delete('/:id', authenticateToken, authorizeRoles('admin'), (req, res) => {
  const id = parseInt(req.params.id);
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Không tìm thấy user' });
  users.splice(idx, 1);
  res.json({ message: 'Đã xóa user' });
});

// Thêm user mới (chỉ admin)
router.post('/', authenticateToken, authorizeRoles('admin'), (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ error: 'Thiếu thông tin' });
  }
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'Username đã tồn tại' });
  }
  const id = users.length ? users[users.length - 1].id + 1 : 1;
  const newUser = { id, username, password, role };
  users.push(newUser);
  res.status(201).json({ message: 'Tạo user thành công', user: { id, username, role } });
});
