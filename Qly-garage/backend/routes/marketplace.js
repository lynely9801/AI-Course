const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplaceController');

// Lấy danh sách sản phẩm marketplace
router.get('/', marketplaceController.getAllMarketplace);
// Lấy chi tiết sản phẩm marketplace
router.get('/:id', marketplaceController.getMarketplaceById);
// Thêm sản phẩm mới vào marketplace
router.post('/', marketplaceController.createMarketplace);
// Cập nhật sản phẩm marketplace
router.put('/:id', marketplaceController.updateMarketplace);
// Xóa sản phẩm khỏi marketplace
router.delete('/:id', marketplaceController.deleteMarketplace);

module.exports = router;
