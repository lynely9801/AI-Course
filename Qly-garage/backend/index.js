const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Backend API is running!');
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/customers', require('./routes/customer'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/orders', require('./routes/order'));
app.use('/api/marketplace', require('./routes/marketplace'));
app.use('/api/reports', require('./routes/report'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
