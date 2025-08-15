// Model mẫu cho đơn hàng
class Order {
  constructor(id, customerId, items, total, status, createdAt) {
    this.id = id;
    this.customerId = customerId;
    this.items = items; // [{ inventoryId, quantity, price }]
    this.total = total;
    this.status = status; // e.g. 'pending', 'completed', 'cancelled'
    this.createdAt = createdAt;
  }
}

// Dữ liệu mẫu (giả lập database)
const orders = [
  new Order(1, 1, [
    { inventoryId: 1, quantity: 2, price: 200000 },
    { inventoryId: 2, quantity: 1, price: 350000 }
  ], 750000, 'completed', new Date()),
  new Order(2, 2, [
    { inventoryId: 2, quantity: 3, price: 350000 }
  ], 1050000, 'pending', new Date())
];

module.exports = { Order, orders };
