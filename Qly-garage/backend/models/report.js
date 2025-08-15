// Model mẫu cho báo cáo
class Report {
  constructor(id, title, content, createdBy, createdAt) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
  }
}

// Dữ liệu mẫu (giả lập database)
const reports = [
  new Report(1, 'Báo cáo doanh thu tháng 7', 'Doanh thu tăng 20% so với tháng trước.', 'admin', new Date()),
  new Report(2, 'Báo cáo tồn kho', 'Tồn kho phụ tùng giảm nhẹ.', 'manager', new Date())
];

module.exports = { Report, reports };
