import React, { useState } from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';

const NfcDemo = () => {
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleTap = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <Card className="mb-3 fintech-card">
      <Card.Body>
        <Card.Title>NFC Tap-to-Pay</Card.Title>
        <Card.Text>Giả lập chức năng chạm điện thoại để thanh toán POS.</Card.Text>
        <Button variant="primary" onClick={handleTap} disabled={processing || success}>
          {processing ? <Spinner animation="border" size="sm" /> : success ? 'Thanh toán thành công!' : 'Chạm để thanh toán'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default NfcDemo;
