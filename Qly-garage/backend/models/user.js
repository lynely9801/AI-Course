// Model mẫu cho user và role
const roles = ['admin', 'manager', 'staff', 'customer'];

class User {
  constructor(id, username, password, role) {
    this.id = id;
    this.username = username;
    this.password = password; // Lưu ý: demo, chưa mã hóa!
    this.role = role;
  }
}

// Dữ liệu mẫu (giả lập database)
const users = [
  new User(1, 'admin', 'admin123', 'admin'),
  new User(2, 'staff1', 'staff123', 'staff'),
  new User(3, 'customer1', 'cust123', 'customer')
];

module.exports = { User, users, roles };
