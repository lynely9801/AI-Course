// Model mẫu cho sản phẩm kho
class InventoryItem {
  constructor(id, name, sku, quantity, price, location) {
    this.id = id;
    this.name = name;
    this.sku = sku;
    this.quantity = quantity;
    this.price = price;
    this.location = location;
  }
}

// Dữ liệu mẫu (giả lập database)
const inventory = [
  new InventoryItem(1, 'Lọc dầu', 'SKU001', 50, 200000, 'Hà Nội'),
  new InventoryItem(2, 'Má phanh', 'SKU002', 30, 350000, 'Hồ Chí Minh')
];

module.exports = { InventoryItem, inventory };
