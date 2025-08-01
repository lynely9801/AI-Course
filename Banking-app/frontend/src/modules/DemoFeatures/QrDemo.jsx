import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import * as QRCode from 'qrcode.react';

const QrDemo = () => {
  const [showScan, setShowScan] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const qrValue = 'fintech-demo-payment-123456';

  const handleScan = () => {
    setShowScan(true);
    setTimeout(() => {
      setScanResult('Giao dịch thành công!');
    }, 2000);
  };

  return (
    <Card className="mb-3 fintech-card">
      <Card.Body>
        <Card.Title>QR Payment</Card.Title>
        <Card.Text>Hiển thị QR tĩnh cho người khác quét hoặc quét QR để thanh toán.</Card.Text>
        <div className="mb-2"><QRCode.default value={qrValue} size={128} /></div>
        <Button variant="dark" onClick={handleScan} disabled={showScan}>Quét QR để thanh toán</Button>
        {scanResult && <Alert variant="success" className="mt-3">{scanResult}</Alert>}
      </Card.Body>
    </Card>
  );
};

export default QrDemo;
