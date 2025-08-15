// Model mẫu cho sản phẩm marketplace
class MarketplaceItem {
  constructor(id, name, sku, price, brand, stock, description) {
    this.id = id;
    this.name = name;
    this.sku = sku;
    this.price = price;
    this.brand = brand;
    this.stock = stock;
    this.description = description;
  }
}

// Dữ liệu mẫu (giả lập database)
const marketplace = [
  new MarketplaceItem(1, 'Lọc gió động cơ', 'MP001', 250000, 'Toyota', 100, 'Phù hợp nhiều dòng xe'),
  new MarketplaceItem(2, 'Bugi', 'MP002', 120000, 'Honda', 200, 'Bugi chính hãng Honda')
];

module.exports = { MarketplaceItem, marketplace };
