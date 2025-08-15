const jwt = require('jsonwebtoken');
const { User, users } = require('../models/user');
const SECRET = 'secret-key-demo'; // Nên lưu vào biến môi trường thực tế

// Đăng ký
exports.register = (req, res) => {
  const { username, password, role } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'Username đã tồn tại' });
  }
  const id = users.length ? users[users.length - 1].id + 1 : 1;
  const newUser = new User(id, username, password, role || 'customer');
  users.push(newUser);
  res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
};

// Đăng nhập
exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Sai thông tin đăng nhập' });
  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
};

// Lấy thông tin user hiện tại
exports.me = (req, res) => {
  res.json(req.user);
};
