import React, { useState } from 'react';
import { Card, Button, Badge, Toast, ToastContainer } from 'react-bootstrap';

const mockUser = {
  name: 'Nguyễn Văn Demo',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  balance: 12500000,
  card: {
    type: 'Visa ảo',
    status: 'Hoạt động',
    number: '1234 5678 9012 3456',
    expiry: '08/28',
  },
  transactions: [
    { id: 1, type: 'Nạp tiền', amount: 5000000, date: '01/07/2025', status: 'Thành công' },
    { id: 2, type: 'Thanh toán QR', amount: -150000, date: '02/07/2025', status: 'Thành công' },
    { id: 3, type: 'Gửi tiết kiệm', amount: -3000000, date: '03/07/2025', status: 'Thành công' },
    { id: 4, type: 'NFC Tap-to-Pay', amount: -200000, date: '04/07/2025', status: 'Thành công' },
  ],
};

const shortcutActions = {
  NFC: 'Mô phỏng thanh toán NFC thành công!',
  'Tiết kiệm': 'Gửi tiết kiệm thành công!',
  eKYC: 'Định danh điện tử thành công!',
  Visa: 'Phát hành thẻ Visa ảo thành công!',
  QR: 'Thanh toán QR thành công!',
};

const Dashboard = () => {
  const [toast, setToast] = useState({ show: false, message: '' });
  const handleShortcut = (key) => {
    setToast({ show: true, message: shortcutActions[key] });
    setTimeout(() => setToast({ show: false, message: '' }), 2000);
  };
  return (
    <div className="fintech-bg" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', color: '#fff', fontFamily: 'Inter, Arial, sans-serif' }}>
      <div className="container py-3" style={{ maxWidth: 420 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <img src={mockUser.avatar} alt="avatar" style={{ width: 64, height: 64, borderRadius: '50%', marginRight: 16, border: '3px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 22, letterSpacing: 0.5 }}>{mockUser.name}</div>
          <div style={{ color: '#e0e0e0', fontSize: 13 }}>Xin chào, chúc bạn một ngày tốt lành!</div>
        </div>
      </div>
      {/* Số dư & Card */}
      <Card className="mb-4 fintech-card" style={{ background: 'linear-gradient(120deg, #8f5fe8 0%, #2575fc 100%)', borderRadius: 24, boxShadow: '0 6px 32px rgba(0,0,0,0.18)', border: 'none' }}>
        <Card.Body style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div>
              <div style={{ color: '#f3f3f3', fontSize: 14 }}>Số dư tài khoản</div>
              <div style={{ fontWeight: 700, fontSize: 32, color: '#fff', letterSpacing: 1 }}>{mockUser.balance.toLocaleString()}₫</div>
            </div>
            <div>
              <Badge bg="light" style={{ color: '#6a11cb', fontSize: 15, fontWeight: 600, padding: '6px 12px', borderRadius: 12 }}>{mockUser.card.type}</Badge>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, color: '#e0e0e0' }}>
            <div>{mockUser.card.number} <span style={{ opacity: 0.7 }}>| HSD: {mockUser.card.expiry}</span></div>
            <Badge bg={mockUser.card.status === 'Hoạt động' ? 'success' : 'secondary'} style={{ fontSize: 12 }}>{mockUser.card.status}</Badge>
          </div>
        </Card.Body>
      </Card>
      {/* Shortcut */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
        <Button variant="light" style={{ color: '#6a11cb', borderRadius: 18, fontWeight: 600, minWidth: 64, boxShadow: '0 2px 8px rgba(106,17,203,0.08)' }} onClick={() => handleShortcut('NFC')}>NFC</Button>
        <Button variant="light" style={{ color: '#2575fc', borderRadius: 18, fontWeight: 600, minWidth: 64, boxShadow: '0 2px 8px rgba(37,117,252,0.08)' }} onClick={() => handleShortcut('Tiết kiệm')}>Tiết kiệm</Button>
        <Button variant="light" style={{ color: '#00c6fb', borderRadius: 18, fontWeight: 600, minWidth: 64, boxShadow: '0 2px 8px rgba(0,198,251,0.08)' }} onClick={() => handleShortcut('eKYC')}>eKYC</Button>
        <Button variant="light" style={{ color: '#ffb347', borderRadius: 18, fontWeight: 600, minWidth: 64, boxShadow: '0 2px 8px rgba(255,179,71,0.08)' }} onClick={() => handleShortcut('Visa')}>Visa</Button>
        <Button variant="light" style={{ color: '#333', borderRadius: 18, fontWeight: 600, minWidth: 64, boxShadow: '0 2px 8px rgba(51,51,51,0.08)' }} onClick={() => handleShortcut('QR')}>QR</Button>
      </div>
      {/* Lịch sử giao dịch */}
      <Card className="mb-2 fintech-card" style={{ background: 'rgba(30,30,60,0.55)', borderRadius: 18, border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }}>
        <Card.Body style={{ padding: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, color: '#fff' }}>Lịch sử giao dịch</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {mockUser.transactions.map(tx => (
              <div key={tx.id} style={{
                display: 'flex', alignItems: 'center', background: 'linear-gradient(90deg, rgba(106,17,203,0.12) 0%, rgba(37,117,252,0.10) 100%)',
                borderRadius: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: '10px 14px', minHeight: 54
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: 15 }}>{tx.type}</div>
                  <div style={{ fontSize: 12, color: '#e0e0e0' }}>{tx.date}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className={tx.amount < 0 ? 'text-danger' : 'text-success'} style={{ fontWeight: 700, fontSize: 15 }}>
                    {tx.amount < 0 ? '-' : '+'}{Math.abs(tx.amount).toLocaleString()}₫
                  </div>
                  <Badge bg={tx.status === 'Thành công' ? 'success' : 'secondary'} style={{ fontSize: 11 }}>{tx.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
      {/* Toast Notification */}
      <ToastContainer position="bottom-center" className="mb-4">
        <Toast show={toast.show} bg="info" onClose={() => setToast({ show: false, message: '' })} delay={2000} autohide style={{ minWidth: 220, textAlign: 'center', fontWeight: 500 }}>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
      {/* Footer */}
      <div className="text-center mt-4" style={{ opacity: 0.7, fontSize: 13, color: '#e0e0e0' }}>
        © 2025 Fintech Demo. Giao diện tham khảo SmartBank.
      </div>
    </div>
  </div>
  );
};

export default Dashboard;
