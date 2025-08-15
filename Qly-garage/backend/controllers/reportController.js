const { Report, reports } = require('../models/report');

// Lấy danh sách báo cáo
exports.getAllReports = (req, res) => {
  res.json(reports);
};

// Lấy chi tiết báo cáo
exports.getReportById = (req, res) => {
  const report = reports.find(r => r.id === parseInt(req.params.id));
  if (!report) return res.status(404).json({ error: 'Không tìm thấy báo cáo' });
  res.json(report);
};

// Thêm báo cáo mới
exports.createReport = (req, res) => {
  const { title, content, createdBy } = req.body;
  const id = reports.length ? reports[reports.length - 1].id + 1 : 1;
  const createdAt = new Date();
  const newReport = new Report(id, title, content, createdBy, createdAt);
  reports.push(newReport);
  res.status(201).json(newReport);
};

// Cập nhật báo cáo
exports.updateReport = (req, res) => {
  const report = reports.find(r => r.id === parseInt(req.params.id));
  if (!report) return res.status(404).json({ error: 'Không tìm thấy báo cáo' });
  const { title, content, createdBy } = req.body;
  report.title = title || report.title;
  report.content = content || report.content;
  report.createdBy = createdBy || report.createdBy;
  res.json(report);
};

// Xóa báo cáo
exports.deleteReport = (req, res) => {
  const index = reports.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Không tìm thấy báo cáo' });
  const deleted = reports.splice(index, 1);
  res.json(deleted[0]);
};
