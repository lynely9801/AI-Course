const { Customer, customers } = require('../models/customer');

// Lấy danh sách khách hàng
exports.getAllCustomers = (req, res) => {
  res.json(customers);
};

// Lấy chi tiết khách hàng
exports.getCustomerById = (req, res) => {
  const customer = customers.find(c => c.id === parseInt(req.params.id));
  if (!customer) return res.status(404).json({ error: 'Không tìm thấy khách hàng' });
  res.json(customer);
};

// Thêm khách hàng mới
exports.createCustomer = (req, res) => {
  const { name, phone, email, address } = req.body;
  const id = customers.length ? customers[customers.length - 1].id + 1 : 1;
  const newCustomer = new Customer(id, name, phone, email, address);
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
};

// Cập nhật khách hàng
exports.updateCustomer = (req, res) => {
  const customer = customers.find(c => c.id === parseInt(req.params.id));
  if (!customer) return res.status(404).json({ error: 'Không tìm thấy khách hàng' });
  const { name, phone, email, address } = req.body;
  customer.name = name || customer.name;
  customer.phone = phone || customer.phone;
  customer.email = email || customer.email;
  customer.address = address || customer.address;
  res.json(customer);
};

// Xóa khách hàng
exports.deleteCustomer = (req, res) => {
  const index = customers.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Không tìm thấy khách hàng' });
  const deleted = customers.splice(index, 1);
  res.json(deleted[0]);
};
