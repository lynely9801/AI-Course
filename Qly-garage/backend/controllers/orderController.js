const { Order, orders } = require('../models/order');

// Lấy danh sách đơn hàng
exports.getAllOrders = (req, res) => {
  res.json(orders);
};

// Lấy chi tiết đơn hàng
exports.getOrderById = (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
  res.json(order);
};

// Thêm đơn hàng mới
exports.createOrder = (req, res) => {
  const { customerId, items, total, status } = req.body;
  const id = orders.length ? orders[orders.length - 1].id + 1 : 1;
  const createdAt = new Date();
  const newOrder = new Order(id, customerId, items, total, status || 'pending', createdAt);
  orders.push(newOrder);
  res.status(201).json(newOrder);
};

// Cập nhật đơn hàng
exports.updateOrder = (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
  const { customerId, items, total, status } = req.body;
  order.customerId = customerId || order.customerId;
  order.items = items || order.items;
  order.total = total !== undefined ? total : order.total;
  order.status = status || order.status;
  res.json(order);
};

// Xóa đơn hàng
exports.deleteOrder = (req, res) => {
  const index = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
  const deleted = orders.splice(index, 1);
  res.json(deleted[0]);
};
