# Fintech Banking Demo Web App

## Mục tiêu
Ứng dụng trình bày & demo các tính năng thanh toán và dịch vụ ngân hàng hiện đại:
- Thanh toán không chạm (NFC)
- Gửi tiết kiệm trực tuyến
- Định danh điện tử (eKYC)
- Phát hành thẻ Visa ảo
- Tích hợp ví điện tử, QR, thanh toán quốc tế

## Module chính
- Welcome & Đăng nhập (fake/mock)
- Dashboard người dùng
- Demo công nghệ: NFC, eKYC, Visa ảo, Tiết kiệm, QR Payment
- Notification
- Trang Quản trị ẩn
- Landing Page

## Công nghệ đề xuất
- Frontend: React (Vite, PWA-ready)
- Backend mock: ExpressJS
- Auth giả lập: Email OTP hoặc Google One-tap
- NFC: Web NFC API
- KYC: Fake camera capture + AI mock response
- QR Payment: qrcode.react

## Yêu cầu phi chức năng
- Chạy mượt trên mobile web (Chrome/Safari)
- Offline mode demo được
- Giao diện fintech (tím, xanh đậm, đen)
- UX giống app ngân hàng thật

## Packaging & Deployment
- Đóng gói thành web app public
- Chế độ reset nhanh dữ liệu
- Landing page giới thiệu app

## Hướng dẫn khởi tạo frontend
```sh
cd frontend
npm create vite@latest . -- --template react
npm install
```

## Hướng dẫn khởi tạo backend mock
```sh
cd ../backend
npm init -y
npm install express cors
```

## Tiếp tục phát triển
- Tạo các module theo mô tả
- Tích hợp các tính năng mock
- Tùy chỉnh giao diện fintech
