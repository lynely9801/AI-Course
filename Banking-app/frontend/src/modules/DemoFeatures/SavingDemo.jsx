import React, { useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';

const SavingDemo = () => {
  const [showResult, setShowResult] = useState(false);
  const [form, setForm] = useState({ amount: '', term: '3', interest: '5.5' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <Card className="mb-3 fintech-card">
      <Card.Body>
        <Card.Title>Gửi tiết kiệm online</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Số tiền gửi</Form.Label>
            <Form.Control name="amount" type="number" value={form.amount} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Kỳ hạn (tháng)</Form.Label>
            <Form.Select name="term" value={form.term} onChange={handleChange}>
              <option value="3">3 tháng</option>
              <option value="6">6 tháng</option>
              <option value="12">12 tháng</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Lãi suất (%)</Form.Label>
            <Form.Control name="interest" type="number" value={form.interest} onChange={handleChange} required />
          </Form.Group>
          <Button type="submit" variant="success">Gửi tiết kiệm</Button>
        </Form>
        {showResult && <Alert variant="success" className="mt-3">Gửi tiết kiệm thành công!</Alert>}
      </Card.Body>
    </Card>
  );
};

export default SavingDemo;
