const { InventoryItem, inventory } = require('../models/inventory');

// Lấy danh sách sản phẩm kho
exports.getAllInventory = (req, res) => {
  res.json(inventory);
};

// Lấy chi tiết sản phẩm kho
exports.getInventoryById = (req, res) => {
  const item = inventory.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
  res.json(item);
};

// Thêm sản phẩm mới vào kho
exports.createInventory = (req, res) => {
  const { name, sku, quantity, price, location } = req.body;
  const id = inventory.length ? inventory[inventory.length - 1].id + 1 : 1;
  const newItem = new InventoryItem(id, name, sku, quantity, price, location);
  inventory.push(newItem);
  res.status(201).json(newItem);
};

// Cập nhật sản phẩm kho
exports.updateInventory = (req, res) => {
  const item = inventory.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
  const { name, sku, quantity, price, location } = req.body;
  item.name = name || item.name;
  item.sku = sku || item.sku;
  item.quantity = quantity !== undefined ? quantity : item.quantity;
  item.price = price !== undefined ? price : item.price;
  item.location = location || item.location;
  res.json(item);
};

// Xóa sản phẩm khỏi kho
exports.deleteInventory = (req, res) => {
  const index = inventory.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
  const deleted = inventory.splice(index, 1);
  res.json(deleted[0]);
};
