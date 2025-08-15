const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Lấy danh sách sản phẩm kho
router.get('/', inventoryController.getAllInventory);
// Lấy chi tiết sản phẩm kho
router.get('/:id', inventoryController.getInventoryById);
// Thêm sản phẩm mới vào kho
router.post('/', inventoryController.createInventory);
// Cập nhật sản phẩm kho
router.put('/:id', inventoryController.updateInventory);
// Xóa sản phẩm khỏi kho
router.delete('/:id', inventoryController.deleteInventory);

module.exports = router;
