# Hệ thống Quản lý Garage & Nhà phân phối phụ tùng ô tô


## Cấu trúc dự án
- `frontend/`: React + Vite (giao diện người dùng)
  - Các trang: Quản lý khách hàng, kho, đơn hàng, marketplace, báo cáo, người dùng.
  - CRUD trực tiếp trên bảng, xác nhận khi xóa, sửa inline.
  - Xử lý đăng nhập, phân quyền, thông báo lỗi/thành công.
  - Các function chính:
    - `src/services/*Service.js`: Gọi API cho từng module (fetch, create, update, delete)
    - `src/pages/*Page.jsx`: Hiển thị bảng dữ liệu, form thêm, sửa/xóa inline.
    - `src/routes/PrivateRoute.jsx`: Bảo vệ route, kiểm tra token.

- `backend/`: Node.js + Express (API server)
  - Cấu trúc module: routes, controllers, models, middlewares.
  - Lưu dữ liệu demo trong RAM (models/*.js).
  - Xử lý xác thực JWT, phân quyền theo vai trò.
  - Các function chính:
    - `routes/*.js`: Định nghĩa endpoint RESTful cho từng module (GET, POST, PUT, DELETE)
    - `controllers/*.js`: Xử lý logic CRUD, xác thực, trả về dữ liệu.
    - `middlewares/auth.js`: Xác thực JWT, kiểm tra quyền truy cập.
    - `models/*.js`: Lưu trữ dữ liệu mẫu (user, customer, inventory, order, marketplace, report).


---

## Khởi động dự án

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
node index.js
```


---

## Chức năng backend (API server)

- Quản lý khách hàng: `/api/customers` (GET, POST, PUT, DELETE)
- Quản lý kho: `/api/inventory` (GET, POST, PUT, DELETE)
- Quản lý đơn hàng: `/api/orders` (GET, POST, PUT, DELETE)
- Marketplace: `/api/marketplace` (GET, POST, PUT, DELETE)
- Báo cáo: `/api/reports` (GET, POST, PUT, DELETE)
- Quản lý người dùng: `/api/users` (GET, POST, PUT, DELETE, chỉ admin)
- Đăng nhập/đăng ký: `/api/auth/login`, `/api/auth/register`
- Xác thực JWT, phân quyền theo vai trò (admin, manager, staff, customer)

## Chức năng frontend (giao diện)

- Đăng nhập, lưu token, bảo vệ route.
- Sidebar chuyển nhanh giữa các module.
- Quản lý khách hàng: thêm/sửa/xóa, tìm kiếm, lọc.
- Quản lý kho: thêm/sửa/xóa sản phẩm, cập nhật tồn kho.
- Quản lý đơn hàng: thêm/sửa/xóa, nhập sản phẩm, tổng tiền, trạng thái.
- Marketplace: thêm/sửa/xóa sản phẩm, quản lý SKU, giá, tồn kho.
- Báo cáo: thêm/sửa/xóa, lọc theo loại/ngày.
- Quản lý người dùng: chỉ admin được thêm/sửa/xóa user, phân quyền.
- Thông báo lỗi/thành công rõ ràng, xác nhận khi xóa.

---

## Mở rộng
- Có thể tích hợp database, xuất file, phân quyền chi tiết, thêm module mới dễ dàng.
