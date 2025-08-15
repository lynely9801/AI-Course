const { MarketplaceItem, marketplace } = require('../models/marketplace');

// Lấy danh sách sản phẩm marketplace
exports.getAllMarketplace = (req, res) => {
  res.json(marketplace);
};

// Lấy chi tiết sản phẩm marketplace
exports.getMarketplaceById = (req, res) => {
  const item = marketplace.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
  res.json(item);
};

// Thêm sản phẩm mới vào marketplace
exports.createMarketplace = (req, res) => {
  const { name, sku, price, brand, stock, description } = req.body;
  const id = marketplace.length ? marketplace[marketplace.length - 1].id + 1 : 1;
  const newItem = new MarketplaceItem(id, name, sku, price, brand, stock, description);
  marketplace.push(newItem);
  res.status(201).json(newItem);
};

// Cập nhật sản phẩm marketplace
exports.updateMarketplace = (req, res) => {
  const item = marketplace.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
  const { name, sku, price, brand, stock, description } = req.body;
  item.name = name || item.name;
  item.sku = sku || item.sku;
  item.price = price !== undefined ? price : item.price;
  item.brand = brand || item.brand;
  item.stock = stock !== undefined ? stock : item.stock;
  item.description = description || item.description;
  res.json(item);
};

// Xóa sản phẩm khỏi marketplace
exports.deleteMarketplace = (req, res) => {
  const index = marketplace.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
  const deleted = marketplace.splice(index, 1);
  res.json(deleted[0]);
};
