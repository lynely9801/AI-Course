import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';

const EkycDemo = () => {
  const [result, setResult] = useState(null);

  const handleVerify = () => {
    setResult('pending');
    setTimeout(() => {
      setResult(Math.random() > 0.2 ? 'pass' : 'fail');
    }, 2000);
  };

  return (
    <Card className="mb-3 fintech-card">
      <Card.Body>
        <Card.Title>eKYC – Định danh điện tử</Card.Title>
        <Card.Text>Chụp CMND/CCCD (giả lập), quét khuôn mặt (simulated), tự động điền thông tin nhận diện.</Card.Text>
        <Button variant="info" onClick={handleVerify} disabled={result === 'pending'}>
          {result === 'pending' ? 'Đang xác minh...' : 'Bắt đầu xác minh'}
        </Button>
        {result === 'pass' && <Alert variant="success" className="mt-3">Xác minh thành công!</Alert>}
        {result === 'fail' && <Alert variant="danger" className="mt-3">Xác minh thất bại!</Alert>}
      </Card.Body>
    </Card>
  );
};

export default EkycDemo;
