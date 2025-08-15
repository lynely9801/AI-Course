// Model mẫu cho khách hàng
class Customer {
  constructor(id, name, phone, email, address) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.address = address;
  }
}

// Dữ liệu mẫu (giả lập database)
const customers = [
  new Customer(1, 'Nguyễn Văn A', '0901234567', 'a@example.com', 'Hà Nội'),
  new Customer(2, 'Trần Thị B', '0912345678', 'b@example.com', 'Hồ Chí Minh')
];

module.exports = { Customer, customers };
