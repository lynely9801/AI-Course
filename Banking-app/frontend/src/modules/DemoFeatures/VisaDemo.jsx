import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';

function generateCard() {
  const random = () => Math.floor(1000 + Math.random() * 9000);
  return {
    number: `${random()} ${random()} ${random()} ${random()}`,
    cvv: Math.floor(100 + Math.random() * 900),
    expiry: `0${Math.floor(1 + Math.random() * 9)}/2${Math.floor(2 + Math.random() * 8)}`
  };
}

const VisaDemo = () => {
  const [card, setCard] = useState(null);

  const handleIssue = () => {
    setCard(generateCard());
  };

  return (
    <Card className="mb-3 fintech-card">
      <Card.Body>
        <Card.Title>Phát hành thẻ Visa ảo</Card.Title>
        <Card.Text>Chọn phát hành thẻ ảo mới (mock), tạo số thẻ, CVV, thời hạn thẻ (giả lập).</Card.Text>
        <Button variant="warning" onClick={handleIssue} disabled={!!card}>Phát hành thẻ ảo</Button>
        {card && (
          <Alert variant="info" className="mt-3">
            <div><strong>Số thẻ:</strong> {card.number}</div>
            <div><strong>CVV:</strong> {card.cvv}</div>
            <div><strong>Hạn thẻ:</strong> {card.expiry}</div>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default VisaDemo;
