const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Lấy danh sách báo cáo
router.get('/', reportController.getAllReports);
// Lấy chi tiết báo cáo
router.get('/:id', reportController.getReportById);
// Thêm báo cáo mới
router.post('/', reportController.createReport);
// Cập nhật báo cáo
router.put('/:id', reportController.updateReport);
// Xóa báo cáo
router.delete('/:id', reportController.deleteReport);

module.exports = router;
