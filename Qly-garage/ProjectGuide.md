# Hướng dẫn sử dụng hệ thống Quản lý Garage & Nhà phân phối phụ tùng ô tô

## 1. Khởi động dự án

### Backend
```bash
cd backend
npm install
node index.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Truy cập giao diện tại: http://localhost:5173

---

## 2. Đăng nhập & phân quyền
- Đăng nhập bằng tài khoản mẫu (admin: admin/admin123, staff: staff1/staff123, ...)
- Chỉ admin mới truy cập được module quản lý người dùng.
- Các module khác phân quyền theo vai trò (xem/sửa/xóa/thêm).

---

## 3. Chức năng chính

### 3.1. Quản lý khách hàng
- Thêm/sửa/xóa khách hàng.
- Tìm kiếm, lọc theo tên, số điện thoại.

### 3.2. Quản lý kho (Inventory)
- Thêm/sửa/xóa sản phẩm kho.
- Xem tồn kho, cập nhật số lượng.

### 3.3. Quản lý đơn hàng
- Thêm/sửa/xóa đơn hàng.
- Nhập sản phẩm, số lượng, tổng tiền, trạng thái.

### 3.4. Marketplace
- Thêm/sửa/xóa sản phẩm marketplace.
- Quản lý SKU, giá, tồn kho, mô tả.

### 3.5. Báo cáo
- Thêm/sửa/xóa báo cáo.
- Xem danh sách, lọc theo loại/ngày.

### 3.6. Quản lý người dùng
- Chỉ admin được thêm/sửa/xóa user.
- Phân quyền: admin, manager, staff, customer.

---

## 4. Giao diện sử dụng
- Sidebar chuyển nhanh giữa các module.
- Các bảng dữ liệu hỗ trợ CRUD trực tiếp (thêm/sửa/xóa inline).
- Thông báo lỗi/thành công hiển thị rõ ràng.

---

## 5. Lưu ý
- Dữ liệu demo lưu trong bộ nhớ (chạy lại server sẽ mất dữ liệu).
- Để triển khai thực tế cần kết nối database, bảo mật JWT, phân quyền nâng cao.

---

## 6. Liên hệ & mở rộng
- Có thể mở rộng thêm module, tích hợp API, xuất file, phân quyền chi tiết, ...
- Liên hệ nhóm phát triển để được hỗ trợ thêm.
